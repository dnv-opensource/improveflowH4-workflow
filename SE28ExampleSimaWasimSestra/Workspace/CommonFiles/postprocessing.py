#%%writefile f"{notebook_root_folder}\Workspace\CommonFiles\processing.py"

#https://sesam.dnv.com/dev/api/sifio/
#https://sesam.dnv.com/download/windows64/sesam_input_interface_format.pdf
#https://sesam.dnv.com/download/windows64/sesam_results_interface_format.pdf
from matplotlib import cm
import matplotlib.pyplot as plt
import os
from DNV.Sesam.SifApi.Core import ISifData
from DNV.Sesam.SifApi.IO import SesamDataFactory
from System.Collections.Generic import List
import numpy as np
#os.chdir(r"C:\Users\kblu\source\repos\improveflowH4-workflow\SE28ExampleSimaWasimSestra\Workspace\Results\test001")

def find_displacements_for_given_nodes_and_loadcase (loadcase :int, nodes : list):
    """
    Reads the number of occurrences of a data type and the size of the established pointer table
    for a datatype.
    """

    reader = SesamDataFactory.CreateReader(".", "R3.SIN")
    reader.CreateModel()
    all_data =[]
    for node in nodes:
        print("node:"+ str(node))
        disp_data = reader.ReadData(
            "RVNODDIS", [loadcase, node])
        node_coordinate = reader.ReadData(
            "GCOORD", [node])
        #convert to Python list
        node_coordinate = [
            coordinate for coordinate in node_coordinate[0].Data]
        disp_data = [disp for disp in disp_data[0].Data]
        print(node_coordinate[2:4])
        print("xdisp: " + str(disp_data[5]))
        print("ydisp: " + str(disp_data[6]))
        print("zdisp: " + str(disp_data[7]))
        print("xcoord: " + str(node_coordinate[2]))
        print("ycoord: " + str(node_coordinate[3]))
        print("zcoord: " + str(node_coordinate[4]))
        node_data = node_coordinate[2:5] + disp_data[5:8]
        all_data.append(node_data)
    np.savetxt(f"postprocessedresultsLC{loadcase}.txt",
               all_data, header="xcoord\t\t\t, \t\t\tycoord\t\t\t,\t\t\tzcoord\t\t\t,\t\t\txdisp\t\t\t,\t\t\tydisp\t\t\t, \t\t\tzdisp\t\t")
   
    reader.Dispose()


lc = 11
nodes = range(1,200)
find_displacements_for_given_nodes_and_loadcase(lc, nodes)
#os.chdir(notebook_root_folder)
# data = np.loadtxt(
#     f"{notebook_root_folder}\\postprocessedresultsLC{lc}.txt")
# xyz = data[:, 0:3]
# total_disp = np.sqrt(data[:, 3]**2+data[:, 4]**2+data[:, 5]**2)
# plt.plot(data[:,0], total_disp,'*')
# plt.xlabel("x coordinate")
# plt.ylabel("total disp")
