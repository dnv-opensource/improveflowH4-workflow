# improveflowH4-workflow

This repository showcases how OneWorkflow, a platform for orchestrating complex computational tasks, can be applied to run SesamCommands using Python. It features a range of Jupyter Notebooks and standard Python examples, demonstrating how to execute Sesam applications within a workflow, including custom Python scripts.

It's important to note that the code in this repository is currently in the pilot phase and is intended solely for testing purposes. Currently, we support the following applications: Sima, Wasim, Sestra, GeniERuntime, and Sesam Core.

## Introduction to OneWorkflow

OneWorkflow is a comprehensive workflow development system that integrates various tools, modules, and services seamlessly. This integration streamlines the workflow, enhances efficiency, and promotes a more unified approach to development. With its UI-less interface, OneWorkflow is designed to provide a robust backend for workflow automation. It also offers the flexibility to use the same code for local and cloud-based operations using OneCompute.

## Required Prerequisites

### Python

OneWorkflow supports Python versions 3.10, 3.11, and 3.12, available for download from the official [Python download page](https://www.python.org/downloads/). Please make sure that you have installed one of the listed versions. We encourage you to use Python version 3.12. To ensure a smooth development experience, it is essential that you enable the 'Add python.exe to the PATH' option during installation. This option is usually turned off by default, so please enable it. For guidance, refer to the image below.

<img src="pythonpath.png" alt="image" width="50%" height="auto">

It is essential to verify the default Python version on your system, especially if you have multiple Python installations, to ensure a smooth development experience. Here are the steps to follow:

- Open the command line interface (Windows-start-menu --> type cmd --> enter)
- Hit enter and type "python --version" and press enter to check the default Python version on your system.

### VSCode

To start your coding journey, download and install [Visual Studio Code](https://code.visualstudio.com/download) from its official website. This open-source code editor is lauded by developers worldwide for its extensive language support and a vast array of extensions. After successful installation, enhance your coding experience by adding the following extensions.

- [Python Extension](https://code.visualstudio.com/docs/languages/python) - Enhance your Python development experience in VS Code. Download it from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-python.python).
- [Jupyter Notebook Extension](https://code.visualstudio.com/docs/datascience/jupyter-notebooks) - Seamlessly integrate Jupyter notebooks with VS Code. Download it from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter).

### Git

You will need to have [git](https://git-scm.com/downloads) installed to clone the repository. Once git is installed, open a command prompt in the desired folder and use the command:
`git clone https://github.com/dnv-opensource/improveflowH4-workflow.git`

### Sesam Setup Guide

You need the relevant Sesam products with a license for local runs. Additionally, you need [Application Version Manager](https://sesam.dnv.com/download/windows/applicationversionmanager_3200_inst_win.zip), which does not require a license for local execution. You can download Sesam applications from [here](https://sesam.dnv.com/download/programs.html).

### Cloud Account

To run in the cloud, you need to contact DNV and have an account at https://test.onecompute.dnv.com/

### Python Dependencies

Refer to the [Installation Guide](installation/installation.ipynb) for detailed steps on setting up the necessary tools. These are essential for running all notebooks.

## Workflow Examples

1. [SE28 Example](SE28ExampleSimaWasimSestra/SE28ExampleSimaWasimSestra.ipynb) demonstrates how to do a parametrized run of Sima, Wasim and Sestra and postprocessing using SifIO.
2. [SesamCoreExample](SesamCoreExample/SesamCoreExample.ipynb) demonstrates running the Sesam Core Fatigue hotspot using OneWorkflow. See the Sesam Core UM for details.
3. [GeniERuntimeExample](GeniERuntimeExample/GeniERuntimeExample.ipynb) demonstrates how to do a parametrized study of a container ship using GeniERuntime and some trivial postprocessing using SifIO Python package.

4. [SimaExamples](SimaExamples) provides four distinct examples of Sima usage:
   1. [SimaExample.ipynb](SimaExamples/SimaExample.ipynb) - An illustrative Jupyter notebook.
   2. [SimaExample.py](SimaExamples/SimaExample.py) - A standalone Python script mirroring the notebook example.
   3. [SimaExampleInplace.ipynb](SimaExamples/SimaExampleInPlace.ipynb) - A Jupyter notebook demonstrating local, in-place execution.
   4. [SimaExampleInplace.py](SimaExamples/SimaExampleInPlace.py) - A standalone Python script for local, in-place execution, paralleling the notebook example.

## Notes on local execution

- Local execution is designed to simulate a cloud run. It creates temporary folders with unique, randomly generated names for job execution. It uploads files to 'blob' folders before starting the job. The workflow executes within the job folder. The following diagram visually represents the folder structure:

    <img src="folderstructure.png" alt="image" width="50%" height="auto">

- The cloud-simulated option gives insights into how the cloud conducts the analysis. However, there is another option available called "in-place execution". This choice doesn't require copying files to a blob folder but instead directly uses the execution or job folder. To better understand this method, please refer to the [SimaExampleInplace.ipynb](SimaExamples/SimaExampleInPlace.ipynb) file available in the "SimaExamples" folder.

- A `runsima.bat` file is available in Sima's job folder. Use this file to troubleshoot potential Sima execution issues.
