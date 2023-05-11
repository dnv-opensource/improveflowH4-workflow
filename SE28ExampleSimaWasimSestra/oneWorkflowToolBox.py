
from dnv.oneworkflow.oneworkflowclient import OneWorkflowClient
import os
from dnv.onecompute import (
    Job,
    JobEventArgs,
    OneComputeClient,
    WorkItemEventArgs,
    WorkStatus,
)


"""Tests Workflow"""

from enum import Enum, unique
from typing import Any

from dnv.onecompute import (
    Environment,
 
)
from dnv.onecompute.directory_client import FileOptions
from dnv.oneworkflow.oneworkflowclient import OneWorkflowClient, OneWorkflowConfig
from dnv.oneworkflow.config import LogLevel, WorkspaceConfiguration
CLOUD_APP_ID = "DAImproveFlowWorkflowCoreWorkerLinux"
LOCAL_APP_ID = "OneWorkflowWorkerHost"


@unique
class Platform(Enum):
    Windows = 0
    Linux = 1



PLATFORM = Platform.Windows
default_service_path = os.path.join(os.environ["LOCALAPPDATA"],"OneCompute","LocalWorkflowHostExecutable","wc.exe")

def one_workflow_client(workspace_id: str, workspace_path: str, cloud_run: bool, tmp: str, debug: bool = False) -> OneWorkflowClient:
    """Returns an instance of the OneWorkflowClient"""

    workflow_client = OneWorkflowClient(
        
        temp_path = tmp,
        cloud_run=cloud_run,
        workspace_id=workspace_id,
        workspace_path=workspace_path,
        environment=Environment.Testing,
        application_id=LOCAL_APP_ID if not cloud_run else CLOUD_APP_ID,
        executable_name="" if not cloud_run else "ImproveFlowWorker",
        #local_worker_host_service_path=r'C:\Users\kblu\source\repos\WorkflowDP\src\dotnet\DNV.One.Workflow.Hosts.LocalWorkflowHost\bin\Debug\net6.0\wc.exe' if debug else default_service_path,
        local_worker_host_apps_path=r'C:\Users\kblu\source\repos\WorkflowDP\src\dotnet\DNV.One.Workflow.WorkerHosts.OneWorkflowWorkerHost.Local\bin\Debug\net6.0' if debug else "",
        debug_local_worker=debug,
        console_log_level=LogLevel.Warning,
    )
    print(workflow_client.one_workflow_config.workflow_runner_config.temp_folder_path)
    return workflow_client


def job_status_changed_callback(client: OneWorkflowClient, job: Job):
    """Returns 'job_status_changed' callback"""

    async def job_status_changed(_: OneComputeClient, __: JobEventArgs):
        client.download_job_logs(job)

    return job_status_changed


def work_item_status_changed_callback(client: OneWorkflowClient):
    """Returns the job status changed callback function"""

    async def work_item_status_changed(_: OneComputeClient, event: WorkItemEventArgs):
        print(
            f"The status of work item '{event.work_item_id}' is '{event.work_status.name}'"
        )
        if event.work_status in [
            WorkStatus.Completed,
            WorkStatus.Faulted,
            WorkStatus.Aborted,
        ]:
            client.download_job_logs(event.job_id, event.work_item_id)
            if event.work_status != WorkStatus.Aborted:
                await client.download_result_files_async(
                    event.job_id,
                    event.work_item_id,
                    FileOptions(
                        max_size_bytes=11124_000,
                        min_size_bytes=0,
                        #patterns=["**/*.txt", "**/*.tda"],
                        patterns=["**/*.*"],
                    ),
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