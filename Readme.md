# improveflowH4-workflow
repository to demonstrate use of OneWorkflow 
## Prerequisites 
You need the products Sima, Wasim, Sestra with license for local runs. In adtion you need Application Version Manager. You can get them all here: https://sesam.dnv.com/download/programs.html.
To run in the cloud you need to contact DNV and have an account in https://test.onecompute.dnv.com/ 
You also need to get the relevant Python packages and tools from DNV.

## To run the example do the following:
1. Install Python 3.10 if neeeded
2. Set up a jupyter notebook environment, personally I like this https://code.visualstudio.com/docs/datascience/jupyter-notebooks 
3. Follow the instructions in [SE28 Example](SE28ExampleSimaWasimSestra/workflowCoreDemoSE28SestraAndWasim.ipynb) to see how to install the required tools.
4. Manually modify relevant folder locations in the sections **Set up fixed user parameters**  **Set up custom user parameter** of the [notebook](SE28ExampleSimaWasimSestra\workflowCoreDemoSE28SestraAndWasim.ipynb) to point to your local location of input. See explanation in the different subsections of the notebook.
5. Please note that the required bin files will not be checked into git and will needed to be shared outside this repository.
