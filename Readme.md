# improveflowH4-workflow
Repository to demonstrate the use of OneWorkflow. The repository contains various Jupyter notebook examples demonstrating how to run Sesam applications in a workflow including custom Python scripts.
This code is only a pilot and only intended for testing. Currently we have support for 
Sima, Wasim, Sestra, GeniERuntime and Sesam Core. 

## Prerequisites 
You need the relevant Sesam products  with license for local runs. In addition you need Application Version Manager for local execution. You can get the Sesam applications here: https://sesam.dnv.com/download/programs.html.
To run in the cloud you need to contact DNV and have an account in https://test.onecompute.dnv.com/ 

## To run the examples do the following:
1. Install Python 3.10 if neeeded (https://www.python.org/downloads/release/python-31011/)
2. Set up a jupyter notebook environment, personally I like this https://code.visualstudio.com/docs/datascience/jupyter-notebooks 
3. Follow the instructions in [SE28 Example](SE28ExampleSimaWasimSestra/workflowCoreDemoSE28SestraAndWasim.ipynb) to see how to install the required tools. They are required for all the notebooks.

## Examples provided
1. [SE28 Example](SE28ExampleSimaWasimSestra/workflowCoreDemoSE28SestraAndWasim.ipynb)  demonstrates how to do a parametrized run of Sima, Wasim and Sestra and postprocessing using SifIO. 
2. [SesamCoreExample](SesamCoreExample/SesamCoreExample.ipynb)  demonstrates how to run Sesam Core Fatigue hotspot using OneWorkflow. See the Sesam Core UM for details. 
3. [GeniERuntimeExample](GeniERuntimeExample/GeniERuntimeExample.ipynb) demonstrates how to do a parametrized study of a container ship using GeniERuntime and some trivial post processing using SifIO.