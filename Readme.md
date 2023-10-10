# improveflowH4-workflow
Repository to demonstrate the use of OneWorkflow. The repository contains various Jupyter notebook examples demonstrating how to run Sesam applications in a workflow including custom Python scripts.
This code is only a pilot and only intended for testing. Currently we have support for 
Sima, Wasim, Sestra, GeniERuntime and Sesam Core. 

## Prerequisites 
The following software is needed:
* [Python 3.10]((https://www.python.org/downloads/release/python-31011/)), typically for windows you want this [version](https://www.python.org/ftp/python/3.10.11/python-3.10.11-amd64.exe). All 3.10.X versions should be supported.

* [VSCode](https://code.visualstudio.com/download)
    Including the following extensions (install them after VSCode is installed). Jupyter and Python will most likely be installed automatically when opening an ipynb file.
    * [Python extension](https://code.visualstudio.com/docs/languages/python), [download link](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
   * [Jupyer Notebook extension](https://code.visualstudio.com/docs/datascience/jupyter-notebooks), [download link](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)
   * [Python environment manager download link](https://marketplace.visualstudio.com/items?itemName=donjayamanne.python-environment-manager).
* You also need git for cloning this code: https://git-scm.com/downloads 

You need the relevant Sesam products  with license for local runs. In addition you need Application Version Manager for local execution. You can get the Sesam applications here: https://sesam.dnv.com/download/programs.html.
To run in the cloud you need to contact DNV and have an account in https://test.onecompute.dnv.com/ 
With git installed you can clone this repository with `git clone https://github.com/dnv-opensource/improveflowH4-workflow.git`. (Start a command line prompt in the folder where you want this repository to be located.)

Follow the instructions in [the installation notebook ](installation.ipynb) to see how to install the required tools. They are required for all the notebooks.

## Examples provided
1. [SE28 Example](SE28ExampleSimaWasimSestra/workflowCoreDemoSE28SestraAndWasim.ipynb)  demonstrates how to do a parametrized run of Sima, Wasim and Sestra and postprocessing using SifIO. 
2. [SesamCoreExample](SesamCoreExample/SesamCoreExample.ipynb)  demonstrates how to run Sesam Core Fatigue hotspot using OneWorkflow. See the Sesam Core UM for details. 
3. [GeniERuntimeExample](GeniERuntimeExample/GeniERuntimeExample.ipynb) demonstrates how to do a parametrized study of a container ship using GeniERuntime and some trivial post processing using SifIO.

## Notes on local execution
The local execution is designed to simulate a cloud run. Because of this random generated folder names where the job will be executed is created within the temporary folder. Folders named blob is where the files will be uploaded before the job is executed, while the job folder is where the actual workflow will be executed: ![Alt text](folderstructure.png)

For Sima you will find a `runsima.bat` in the job folder. This may be used to debug possible issues with Sima execution.