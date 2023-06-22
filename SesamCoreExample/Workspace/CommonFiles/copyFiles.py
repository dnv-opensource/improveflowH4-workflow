import glob, shutil, sys,os
load_case_dir  = os.getcwd()
common_files_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(common_files_dir)
print(f"copying all relevant files from {common_files_dir} to  {load_case_dir}")
extensions_to_skip = ["py", "stask","xlsx"]
for filename in glob.glob("*.*"):
    print(f"assessing file to copy {filename}")
    if not any(filename.endswith(ext) for ext in extensions_to_skip):
        print(f"copying file {filename}")
        shutil.copy2(f"{common_files_dir}\\{filename}", f"{load_case_dir}\\{filename}")
        print(f"{filename} copied")

