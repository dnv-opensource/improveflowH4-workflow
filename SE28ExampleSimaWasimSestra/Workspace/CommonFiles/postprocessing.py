
#the below line may be used if you want to test the script from the notebook and write the file to the common files folder
#%%writefile f"{notebook_root_folder}\Workspace\CommonFiles\processing.py"
# Ensure that 'import DNV.Sesam.Runtime' is executed first in your script
"""
This code demonstrates the use of SifIO API. It stores node coordinates and displacements for the first 200 nodes in an ascii table for further processing.

The Python package should be installed with this command : pip install -i https://test.pypi.org/simple/ dnv-sifio --user
The C# documentation of the API, may be found here: https://sesam.dnv.com/dev/api/sifio/
The input interface file documentations can be found here https://sesam.dnv.com/download/windows64/sesam_input_interface_format.pdf
and the results interface format here https://sesam.dnv.com/download/windows64/sesam_results_interface_format.pdf
"""
from dnv.net.runtime import *
from dnv.sesam.sifapi.core import ISifData
from dnv.sesam.sifapi.io import SesamDataFactory
from System.Collections.Generic import List
import numpy as np
import os
import os
def find_displacements_for_given_nodes_and_loadcase (loadcase :int, nodes : list):
    """
    Reads the number of occurrences of a data type and the size of the established pointer table
    for a datatype.
    """
    with SesamDataFactory.CreateReader(".", "R3.SIN") as reader:
        reader.CreateModel()
        all_data =[]
        for node in nodes:
            print("node:"+ str(node))
            disp_data = reader.ReadData(
                "RVNODDIS", [loadcase, node])
            node_coordinate = reader.ReadData(
                "GCOORD", [node])
            #convert to Python list
            node_coordinate = list(node_coordinate[0].Data)
            disp_data = list(disp_data[0].Data)
            
            print(node_coordinate[2:4])
            print("xdisp: " + str(disp_data[5]))
            node_data = node_coordinate[2:5] + disp_data[5:8]
            all_data.append(node_data)
        filename = f"postprocessedresultsLC{str(loadcase)}.txt"
        print(f"writing file {filename}")
        np.savetxt(filename,
                    all_data, header="xcoord\t\t\t, \t\t\tycoord\t\t\t,\t\t\tzcoord\t\t\t,\t\t\txdisp\t\t\t,\t\t\tydisp\t\t\t, \t\t\tzdisp\t\t")
        os.path.exists(os.path.join(os.getcwd(),filename))
        print(f"file written to {os.path.join(os.getcwd(),filename)}")

lc = 11
nodes = range(1,200)
find_displacements_for_given_nodes_and_loadcase(lc, nodes)

