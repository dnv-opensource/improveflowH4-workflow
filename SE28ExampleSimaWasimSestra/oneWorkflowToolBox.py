
from dnv.oneworkflow.oneworkflowclient import OneWorkflowClient
from dnv.onecompute import (
    Job,
    JobEventArgs,
    OneComputeClient,
    WorkItemEventArgs,
    WorkStatus,
)


"""Tests Workflow"""
import asyncio
import json
import os
from enum import Enum, unique
from typing import Any

from dnv.onecompute import (
    Environment,
    FileSpecification,
)
from dnv.onecompute.flowmodel import ParallelWork, WorkUnit
from dnv.oneworkflow.composite_executable_command import CompositeExecutableCommand
from dnv.oneworkflow.config import (
    ExecutionContextConfiguration,
    WorkerConfiguration,
    WorkflowRunnerConfiguration,
    WorkspaceConfiguration,
)
from dnv.oneworkflow.oneworkflowclient import OneWorkflowClient, OneWorkflowConfig


@unique
class Platform(Enum):
    Windows = 0
    Linux = 1


class WorkflowBuilder:
    """Workflow builder"""

    def __init__(
        self, workspaceConfig: WorkspaceConfiguration,  runnerConfig: WorkflowRunnerConfiguration, is_cloud_run: bool = True
    ):
        self.platform = Platform.Linux
        self.cloud_run = is_cloud_run
        self.workspace =  workspaceConfig
        
        self.worflow_runner = runnerConfig
        self.worker = WorkerConfiguration(
            command="ImproveFlowWorker",
            #service_name="DAImproveFlowWorkflowCoreWorkerLinux",
            service_name="OneWorkflowWorkerHost"
            #service_name="ImproveFlowWorkerLinux",
        )
        if self.cloud_run:
            self.worker.service_name = "ImproveFlowWorkerLinux"
        self.execution_context = ExecutionContextConfiguration(
            cloud_execution_context=self.cloud_run, environment=Environment.Testing
        )
        self.oneworkflow_conf = OneWorkflowConfig(
            execution_context_config=self.execution_context,
            workflow_runner_config=self.worflow_runner,
            worker_config=self.worker,
            workspace_config=self.workspace,
            job_status_polling_interval=2,
        )
        self.oneworkflow_client = OneWorkflowClient(self.oneworkflow_conf)

def job_status_changed_callback(client: OneWorkflowClient, job: Job):
    """Returns 'job_status_changed' callback"""

    async def job_status_changed(_: OneComputeClient, __: JobEventArgs):
        client.download_job_logs(job)

    return job_status_changed


def work_item_status_changed_callback(client: OneWorkflowClient):
    """Returns 'work_item_status_changed' callback"""

    async def work_item_status_changed(_: OneComputeClient, event: WorkItemEventArgs):
        print(
            f"The status of work item '{event.work_item_id}' is '{event.work_status.name}'"
        )
        if event.work_status in (WorkStatus.Completed, WorkStatus.Faulted):
            await client.download_result_files_async(
                event.job_id, event.work_item_id
            )
    return work_item_status_changed


async def job_progress_changed(_: OneComputeClient, event: JobEventArgs):
    """Handles 'job progress changed' notification"""
    print(
        f"The progress of the job is '{int(event.progress * 100)}%'. "
        f"The message is '{event.message}'"
    )


async def work_item_progress_changed(_: OneComputeClient, event: WorkItemEventArgs):
    """Handles 'work item progress changed' notification"""
    print(f"The work item {event.work_item_id} message is '{event.message}'")


async def run_workflow_async(job: Job, client: OneWorkflowClient):
    """Runs the workflow"""
    try:
        job_monitor = await client.submit_job_async(job)

        # 5. Register the job completion callback
        jsc = job_monitor.job_status_changed
        jsc += job_status_changed_callback(client, job)

        jpc = job_monitor.job_progress_changed
        jpc += job_progress_changed

        wisc = job_monitor.work_item_status_changed
        wisc += work_item_status_changed_callback(client)

        wipc = job_monitor.work_item_progress_changed
        wipc += work_item_progress_changed

        # 6. Wait for the job completion
        await job_monitor.await_job_termination_async()
    except Exception as ex:
        print(ex)