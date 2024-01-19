from pathlib import Path
import os
from dnv.oneworkflow.utils.workunit_extension import *
from dnv.oneworkflow.utils.starter import *
from SimaHelper import *
import json
root_folder = os.path.dirname(os.path.abspath(__file__))
oneWorkflowTMPFolder = r'd:\oneworkflowTmp' #due to possible issues with long file paths we prefer to have this folder at the root
if not os.path.exists(oneWorkflowTMPFolder):
    try:
        print("Trying to create tmp folder for one workflow local execution")
        os.mkdir(oneWorkflowTMPFolder)
        print(oneWorkflowTMPFolder + " created!\n")
    except:
        print("did not manage to create tmp folder for local execution. Check that you have privileges to create it or try to manually create it from the coomand line.")

# local workspace, all results will be put here after local or cloud runs
# location of common files for all analysis, has to be below workspacePath
print(root_folder)
workspacePath = str(Path(root_folder, 'Workspace'))
workspaceId = "SE28"
loadcase_file = f"{workspacePath}\\test_cases_light.xlsx"
wasim_input_file = "test_cases_wasim_input.xlsx"
stask_file = "SimaTemplateV2.stask"
cloudRun = False
notebook_root_folder = os.getcwd()

workflow_client = one_workflow_client(workspace_id = workspaceId, cloud_run = cloudRun, workspace_path = workspacePath, local_workflow_runtime_temp_folder_path = oneWorkflowTMPFolder,
                                      local_workflow_runtime_temp_folders_cleanup=False,environment=Environment.Testing)

"""Tests SIMA and Python commands"""
# Upload Input Files
workflow_client.upload_input_files()

#Sima path must be specified
sima_settings = SimaSettings(sima_exe_path=r'C:\Program Files\DNV\Sima V4.4-00')
sima_commands = SimaTaskCreator(sima_settings, workflow_client).get_sima_commands(loadcase_file, stask_file)



print("Running commands in parallel")
asyncio.run(run_managed_commands_parallelly_async(
            #log_job = True,
            client=workflow_client,
            commands_info=sima_commands,
            files_to_download_from_blob_to_client=FileOptions(max_size="11124MB",patterns=["**/*.log","**/*.txt", "**/*.lis", "**/*.MLG", "**/*.MLG","**/*.CSV"]),
            enable_common_files_copy_to_load_cases=True,
))