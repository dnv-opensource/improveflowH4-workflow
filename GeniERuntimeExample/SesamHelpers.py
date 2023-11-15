
import pandas as pd
from typing import Any
import os
from dnv.sesam.sima_command import SimaCommand
from dnv.onecompute.flowmodel import ParallelWork
from dnv.sesam.genie_runtime_command import *
from dnv.oneworkflow import PythonCommand, CompositeExecutableCommand
from dnv.onecompute import FileSpecification
from dnv.oneworkflow.oneworkflowclient import OneWorkflowClient
from dnv.onecompute.flowmodel import WorkUnit


class GeniERuntimeTaskCreator:
    def __init__(self, template_input_file: str, data_frame : pd.DataFrame, workflow_client: OneWorkflowClient):
        """
        A class for setting up a GeniERuntime analysis for local or cloud run including simple postprocessing using SifIO
            Parameters:
                        template_input_file(str) : template file to be used. 
                        data_frame(pd.DataFrame): Pandas dataframe containing values for the template file.
                        workflow_client(workflow_client) : is needed to provide information about relevant folders like common files, result files and workspace.
            
        """
        self.template_input_file = workflow_client.workspace_info
        self.common_files_folder = workflow_client.common_directory
        self.results_folder = workflow_client.results_directory
        self.data = data_frame
        
   

    def get_genieruntime_work_unit(self, cloud_run : bool, full_path_to_workspace: str):
        """Returns a parallel processing unit based on parameters given in templatefile.
        """
        parallel_work = ParallelWork()
        for index, row in self.data.iterrows():
            loadcase_folder_name = f"Model_{index + 1}"
            result_folder_lc = os.path.join(self.results_folder, loadcase_folder_name)
            genieruntime_command = GeniERuntimeCommand()
            genieruntime_command.Parameters = {}
            genieruntime_command.TemplateInputFile = "ContainerHull_template.js"
            for key, value in row.items():
                genieruntime_command.Parameters[key] = value
           
            python_copy_command = PythonCommand(
                directory=self.common_files_folder,
                filename="copyfiles.py")
            post_processing_command = PythonCommand(
                directory=self.common_files_folder,
                filename="postprocessing.py")
            cmd = CompositeExecutableCommand([python_copy_command, genieruntime_command, post_processing_command], result_folder_lc)

            work_unit = (
                WorkUnit(cmd, work_unit_id=loadcase_folder_name)
                .output_directory(result_folder_lc, include_files=["**/*.FEM","**/*.csv"])
            )
            parallel_work.WorkItems.append(work_unit)
        return parallel_work