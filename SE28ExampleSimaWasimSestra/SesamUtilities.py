import os
from dnv.sesam.wasim_command import WasimStruCommand,  WasimSetupCommand, WasimSolveCommand, WasimSnapShotsCommand
from dnv.sesam.sestra_command import SestraCommand
from dnv.oneworkflow import PythonCommand, CompositeExecutableCommand

class WasimAndSestraTaskCreator:
    def __init__(self, load_case_result_files_dir: str, common_file_path: str,
                 template_parameters: dict = {}, additional_template_parameters: dict = {}):
        """
        A class for setting up a Wasim and Sestra analysis, given template parameters.

        Returns:
            CompositeExecutableTask: An instance of the CompositeExecutableTask class containing all relevant Wasim tasks
            and a final Sestra task.
        """
        self.load_case_result_files_dir = load_case_result_files_dir
        self.common_file_path = common_file_path
        self.template_parameters = template_parameters
        self.additional_template_parameters = additional_template_parameters
    
    def GetTemplateParameterDictionary(self, data: dict):
        template_parameters = {}
        parameters = {'TimeStep': "dt1", 'MaxTime': "Tmax",  "mor_topsel": "topsel", "StartTime": "Tstart",
                    "EndTime": "Tlast", "Delta": "Delt", "FEMTop": "FEMtop", "Steps": "Nstep"}
        for key, value in data.items():
            template_parameters[parameters[key]] = str(value)
        template_parameters['Delt'] = template_parameters['dt1']
        template_parameters['Tmax'] = template_parameters['Tlast']
        return template_parameters
            
    def CreateTasks(self):
        templateParameters = self.GetTemplateParameterDictionary(self.template_parameters)
        templateParameters.update(self.additional_template_parameters)
        python_copy_command = PythonCommand(
            directory=self.common_file_path,
                filename="copyfiles.py",
                working_dir=self.load_case_result_files_dir)
        wasim_setup_cmd = WasimSetupCommand()
        wasim_setup_cmd.WorkingDirectory = self.load_case_result_files_dir
        wasim_setup_cmd.TemplateInputFile = "Wasim_Setup_template.inp"
        wasim_setup_cmd.Parameters = templateParameters
        wasim_solve_cmd = WasimSolveCommand()
        wasim_solve_cmd.WorkingDirectory = self.load_case_result_files_dir
        wasim_solve_cmd.Parameters = templateParameters
        wasim_solve_cmd.TemplateInputFile =  "Wasim_Solve_template.inp"
        wasim_snapshots_cmd = WasimSnapShotsCommand()
        wasim_snapshots_cmd.Parameters = templateParameters
        wasim_snapshots_cmd.TemplateInputFile = "wasim_snapshots_template.inp"

        wasim_stru_cmd = WasimStruCommand()
        wasim_stru_cmd.WorkingDirectory = self.load_case_result_files_dir
        wasim_stru_cmd.Parameters = templateParameters
        wasim_stru_cmd.TemplateInputFile = "Wasim_stru_template.inp"

        sestra_cmd = SestraCommand()
        sestra_cmd.WorkingDirectory = self.load_case_result_files_dir
        sestra_cmd.Arguments = "/dsf"
        sestra_cmd.Parameters = templateParameters
        sestra_cmd.TemplateInputFile = "sestra_template.inp"
        pos_processing_command = PythonCommand(
            directory=self.common_file_path,
            filename="postprocessing.py",
            working_dir=self.load_case_result_files_dir)
        
        return CompositeExecutableCommand(
            [python_copy_command, wasim_setup_cmd, wasim_solve_cmd, wasim_snapshots_cmd,
                wasim_stru_cmd, sestra_cmd,pos_processing_command], self.load_case_result_files_dir)
        