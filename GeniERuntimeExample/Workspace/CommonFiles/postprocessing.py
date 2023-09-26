
#the below line may be used if you want to test the script from the notebook and write the file to the common files folder
#%%writefile f"{notebook_root_folder}\Workspace\CommonFiles\processing.py"
# Ensure that 'import DNV.Sesam.Runtime' is executed first in your script
"""
This code demonstrates the use of SifIO API. It stores node coordinates and displacements for the first 200 nodes in an ascii table for further processing.

The Python package should be installed with this command : pip install -i https://test.pypi.org/simple/ dnv-sifio --user
See examples here : https://test.pypi.org/project/dnv-sifio/ 
The C# documentation of the API, may be found here: https://sesam.dnv.com/dev/api/sifio/
The input interface file documentations can be found here https://sesam.dnv.com/download/windows64/sesam_input_interface_format.pdf
and the results interface format here https://sesam.dnv.com/download/windows64/sesam_results_interface_format.pdf
"""
from dnv.net.runtime import *
from dnv.sesam.sifapi.core import ISifData
from dnv.sesam.sifapi.io import SesamDataFactory
import pandas as pd
import os
def write_node_element_count():
    """
    Reads the number of occurrences of a data type and the size of the established pointer table
    for a datatype.
    """
    with SesamDataFactory.CreateReader(".", 'T1.FEM') as reader:
        reader.CreateModel()
        all_data =[]
        node_count = reader.GetCount("GNODE")
        element_count = reader.GetCount("GELMNT1")
        all_data.append([node_count, element_count])
        dataframe = pd.DataFrame({'Node Count':  [node_count], 'Element Count': [element_count]})
        a = os.getcwd()
        dataframe.to_csv('nodeCount.csv')
      
write_node_element_count()

