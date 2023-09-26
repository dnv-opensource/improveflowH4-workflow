
import pandas as pd
from typing import Any
import os 
from dnv.sesam.sima_command import SimaCommand
from dnv.onecompute.flowmodel import ParallelWork
from dnv.oneworkflow import PythonCommand
from dnv.onecompute import FileSpecification
from dnv.oneworkflow.oneworkflowclient import OneWorkflowClient

class SimaSettings:
    def __init__(self, sima_exe_path: str, result_files_to_keep=[
        "*-sima.lis",
        "variable*.inp",
        "*.log",
        "results.tda",
        "results.txt",
        "sima_*.res",
        "sys-sima.dat",
        "sima_*.bin",
        "key_sima_*.txt",
        "sima.*"]):
        self.sima_exe_path = sima_exe_path
        self.result_files_to_keep = result_files_to_keep


class SimaTaskCreator:
    def __init__(self, sima_settings: SimaSettings, workflow_client: OneWorkflowClient):
        """
        A class for setting up a Sima analysis for local or cloud run. 
            Parameters:
                        sima_settings(SimaSettings) : contains basic information about path to Sima executable and which files to keep after a Sima run.
                        workflow_client(workflow_client) : is needed to provide information about relevant folders like common files, result files and workspace.
            
        """
        self.workspace = self.workspace = workflow_client.workspace_info
        self.common_files_folder = workflow_client.common_directory
        self.results_folder = workflow_client.results_directory
        self.sima_settings = sima_settings
        
    def get_commands_inputs(self,stask_file: str, case: dict[str, Any]) -> dict[str, dict[str, Any]]:
        commands = dict[str, Any]()
        commands["--consoleLog"] = ""
        commands["--log-level"] = "ALL"
        commands["--data"] = "."
        commands["--import"] = dict(file=FileSpecification(sharedfolder=True,
                                    directory=self.common_files_folder, filename=stask_file))
        commands["--run"] = dict(task="WorkflowTask",
                                workflow="ExampleWorkflow")

        return {"commands": commands, "inputs": case}




    def get_sima_work_unit(self, full_path_to_load_case_file: str, stask_file: str ,single_task: bool = False):
        """Returns a parallel processing unit based on input given in an Excel file.
        
        Parameters:
                        full_path_to_load_case_file(str) : first row in the Excel file should contain the name of the loadcase, the other rows contains the variables to use with their variations. The name of the columns must match what is used with Sima.
                        stask_file(str) : the stask file to be used. I should be located in the common files folder.
                        single_task(bool): if set to True, the unit will only contain the first task.

        """
        os.chdir(self.workspace.workspace_path)
        load_cases_parent_folder_name = self.workspace.load_cases_parent_directory

        parallel_work = ParallelWork()
        parallel_work.work_items.clear()

        # Open environmental input file
        df_cases = pd.read_excel(full_path_to_load_case_file, index_col=0)
        for loadcase_folder_name, case in df_cases.iterrows():
            load_case_folder = os.path.join(
                load_cases_parent_folder_name, loadcase_folder_name)
            result_folder_lc = os.path.join(
                self.workspace.results_directory, loadcase_folder_name)
            # Get SIMA commands and inputs 
            commands_inputs = self.get_commands_inputs(stask_file, case.to_dict())
            # Create SimaCommand instance
            sima_cmd = SimaCommand(self.sima_settings.sima_exe_path)
            sima_cmd.commands = commands_inputs["commands"]
            sima_cmd.input = commands_inputs["inputs"]
            sima_cmd.sima_result_files = self.sima_settings.result_files_to_keep
            sima_cmd.working_directory = load_case_folder

            # Add work item to ParallelWork instance
            parallel_work.add(sima_cmd, work_unit_id=loadcase_folder_name).output_directory(result_folder_lc,
                                                                                            include_files=self.sima_settings.result_files_to_keep)
            if single_task == True:
                break
        return parallel_work