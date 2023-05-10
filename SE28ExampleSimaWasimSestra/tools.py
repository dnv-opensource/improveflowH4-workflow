from subprocess import Popen, PIPE
import os
def run_command(cmd):
    print("Runnign command " + str(cmd) + " in working directory " + os.getcwd())
    
    with Popen(cmd, stdout=PIPE, bufsize=1, universal_newlines=True) as p:
         while True:
             line = p.stdout.readline()
             if not line:
                 break
             print(line)    
         exit_code = p.poll()
    return exit_code