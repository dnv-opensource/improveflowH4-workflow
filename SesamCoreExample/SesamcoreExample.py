from pathlib import Path
import os
from dnv.oneworkflow.utils.workunit_extension import *
from dnv.oneworkflow.utils.starter import *
from dnv.onecompute.directory_client import FileOptions
from dnv.oneworkflow import  ParallelWork
from dnv.onecompute.flowmodel import WorkUnit
from dnv.sesam.sesam_core_command import *
from dnv.oneworkflow import PythonCommand, CompositeExecutableCommand
import shutil
import json
# local workspace, all results will be put here after local or cloud runs
# location of common files for all analysis, has to be below workspacePath and in the folder names CommonFiles
root_folder = os.path.dirname(os.path.abspath(__file__))
workspacePath = str(Path(root_folder, 'Workspace'))
workspaceId = "SesamCoreExample"

cloudRun = False
oneWorkflowTMPFolder = r'd:\oneworkflowTmp' #due to possible issues with long file paths we prefer to have this folder at the root
if not os.path.exists(oneWorkflowTMPFolder):
    try:
        print("Trying to create tmp folder for one workflow local execution")
        os.mkdir(oneWorkflowTMPFolder)
        print(oneWorkflowTMPFolder + " created!\n")
    except:
        print("did not manage to create tmp folder for local execution. Check that you have privileges to create it or try to manually create it from the coomand line.")
#If running locally the code below will also start the local workflow host.
workflow_client = one_workflow_client(workspace_id = workspaceId, cloud_run = cloudRun, workspace_path = workspacePath, local_workflow_runtime_temp_folder_path = oneWorkflowTMPFolder,
                                      local_workflow_runtime_temp_folders_cleanup=False,environment=Environment.Testing)
# we must delete existing results locally before generating new results
local__result_path = Path(workspacePath, workflow_client.results_directory)
print(local__result_path)
if os.path.isdir(local__result_path):
    shutil.rmtree(local__result_path) 
commands_info = []
for index in range(1,14): # iterating over two simple cases, they now will do the same analysis
    loadcase_folder_name = f"LoadCase{index}"
    print("Processing " + loadcase_folder_name)
    core_command = SesamCoreCommand(command = "fatigue",input_file_name= "Specimen1_input.json", options = "-hs")
    cmd_info = CommandInfo(commands=[core_command],load_case_foldername=loadcase_folder_name)
    commands_info.append(cmd_info)
    
asyncio.run(run_managed_commands_parallelly_async(
            client=workflow_client,
            commands_info=commands_info,
            files_to_download_from_blob_to_client=FileOptions(max_size="11124MB",patterns=["**/*.txt", "**/*.lis", "**/*.MLG",  "**/*.*"]),
            enable_common_files_copy_to_load_cases=True,
        ))
        