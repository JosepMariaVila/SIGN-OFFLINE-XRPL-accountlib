# SIGN-OFFLINE-XRPL-accountlib

Sign a transaction offline with VSC and Node.js and submit to the XRPL.

You need Node.js and VisualStudioCode.

Step by step guide to use the code:

1) Create an empty folder in your desktop

2) Open that folder with VSC, or when you are in VSC open that folder

3) Once in VSC create a jason file called tsconfig.json

4) Put inside that file this:

  {
  "compilerOptions": {
    "target": "ES5",
    "module": "CommonJS",
    "sourceMap": true
  }
  }

5) Open terminal and type:
npm install -g typescript

6) After that, type this (creates a basic package.json):
npm init --yes

7) After that type in the terminal (installs the library):
npm i xrpl-accountlib

8) After that type in the terminal (installs the library):
npm i xrpl-client

9) Type in the terminal (this is just in case you want to modify the code, to modify it you will always do that): tsc -w

(an don't close not use that terminal, just leave it opened)

10) Usage:
    
    To SIGN a transaction offline disconnect internet and type in a new terminal: node indexsign <secret_type> <secret> <destination_address> <amount> <sequence>

12) Usage:
    
    To SUBMIT a transaction online connect internet and type in the terminal: node indexsubmit <account> <tx_blob>
