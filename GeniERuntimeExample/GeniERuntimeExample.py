
from dnv.oneworkflow.utils.workunit_extension import *
from dnv.oneworkflow.utils.starter import *
from pathlib import Path
import os
import pandas as pd
from dnv.sesam.genie_runtime_command import *
root_folder = os.path.dirname(os.path.abspath(__file__))
workspacePath = str(Path(root_folder, 'Workspace'))
workspaceId = "GeniERuntimeExample"

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
#parametrized values
df = pd.DataFrame({'AP':  ["0m", "0.5m", "1m"], 'FP': ["150m", "250m", "500m"]})
#for debugging only
#job_json = json.dumps(job, default=lambda o: o.encode(), indent=4)
#print(job_json)


commands_info = []
for index, row in df.iterrows():
            loadcase_folder_name = f"Model_{index + 1}"
            genieruntime_command = GeniERuntimeCommand()
            genieruntime_command.Parameters = {}
            genieruntime_command.TemplateInputFile = "ContainerHull_template.js"
            for key, value in row.items():
                genieruntime_command.Parameters[key] = value
           
            post_processing_command = PythonCommand(
                directory=workflow_client.common_directory,
                filename="postprocessing.py")
            cmd_info = CommandInfo(commands=[genieruntime_command, post_processing_command],load_case_foldername=loadcase_folder_name)
            commands_info.append(cmd_info)
            
print("Running commands in parallel")
asyncio.run(run_managed_commands_parallelly_async(
            client=workflow_client,
            commands_info=commands_info,
            files_to_download_from_blob_to_client=FileOptions(max_size="11124MB",patterns=["**/*.txt", "**/*.lis", "**/*.MLG", "**/*.MLG","**/*.CSV"]),
            enable_common_files_copy_to_load_cases=True,
))