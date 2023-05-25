# improveflowH4-workflow
repository to demonstrate use of OneWorkflow 
## Prerequisites 
You need the products Sima, Wasim, Sestra with license for local runs. In adtion you need Application Version Manager. You can get them all here: https://sesam.dnv.com/download/programs.html.
To run in the cloud you need to contact DNV and have an account in https://test.onecompute.dnv.com/ 
You also need to get the relevant Python packages and tools from DNV.

## To run the example do the following:
1. Install Python 3.10 if neeeded
2. Set up a jupyter notebook environment, personally I like this https://code.visualstudio.com/docs/datascience/jupyter-notebooks 
2. In _packages_ folder run: `pip install -r requirements.txt`
3. Put the `OneCompute` into `%LOCALAPPDATA%`, typically the folder will look like this:
![image](https://github.com/dnv-opensource/improveflowH4-workflow/assets/32701770/578ce7c0-f8ce-424f-a8a0-91b5fde78e47)
6. Manually modify relevant folder locations in the sections **Set up fixed user parameters**  **Set up custom user parameter** of the [notebook](SE28ExampleSimaWasimSestra\workflowCoreDemoSE28SestraAndWasim.ipynb) to point to your local location of input. See explanation in the different subsections of the notebook.
7. Please note that the required bin files will not be checked into git and will needed to be shared outside this repository.
