# Intro
---
This spin-off project of [DUCTAPE](https://github.com/AdiHarif/DUCTAPE) is all about "dependency detection".
For this project I used VS code.

# Table of contents
---
- [[Dependency detection README#General idea|General idea]]
- [[Dependency detection README#How it works|How it works]]
- [[Dependency detection README#Testing|Testing]] 
	- [[#Running Tests|Running Tests]]
		- [[#Running Tests#Run All Tests|Run All Tests]] 
		- [[#Running Tests#Run a Single Test File|Run a Single Test File]]
	- [[#Examples|Examples]]
- [[Dependency detection README#References|References]] 
- [[Dependency detection README#`launch.json`|launch.json]]

# General idea
---
For a given _source_ and _sink_, detect whether a source finds its way to one of the sinks in some form.
A _source_ is defined as the return value of the source function, and a _sink_ is defined as one of the parameters of a sink function.

# How it works
---
<u>Step 0</u> - create `launch.json` file. If you are using VS code, create it under `.vscode` folder.
See [[Dependency detection README#`launch.json`|launch file]].

1. Create a type script program under `$PROGRAM_PATH`. We will call the directory its located in `$PROGRAM_DIR_PATH`.
2. Create `source_names.txt` and `sink_names.txt` files, each containing the names of the according functions.
3. Create files for analysis using the extractor.
	* Inside the `GraphIR-Extractor` folder run:
	`npm start -- -i $PROGRAM_PATH -o $PROGRAM_DIR_PATH`
4. Go inside `GraphIR-Static-Analysis` directory and run:
	* `souffle -g $PROGRAM_DIR_PATH/main.cpp src/main.dl`
	* `g++ -std=c++17 -g $PROGRAM_DIR_PATH/main.cpp src/functors/*.cpp -o $PROGRAM_DIR_PATH/main.out`
5. Go to `Run and debug` (`Ctrl+Shift+D`) and run `"Launch a.out (compiled with souffle)"`

Now You have under `$PROGRAM_DIR_PATH` all the analysis output files. For this project, we are interested in `sourceToSink.csv` and `sourceToSinkWithLines.csv`.

* `sourceToSink.csv` - Contains all the source-sink relations for each source that finds it way to a sink.
	Each row constructed as:
	* `<source> <sourceId> <sinkFunction> <sinkIdx> <sinkId>`
		* `<source>` - The name of the source function
		* `<sourceId>` - The id of the return value of the source function node
		* `<sinkFunction>` - The name of the sink function
		* `<sinkIdx>` - The index of the sink function's parameter
		* `<sinkId>` - The id of the node the `Call` node of the sink function points to
* `sourceToSinkWithLines.csv` - Contains all the _possible matches_ of found sources and sinks from source-sink relations that we found in `sourceToSink.csv`.
	Each row constructed as:
	* `<sourceName> <sourceLine> <sourceColumn> <sinkFunction> <sinkLine> <sinkColumn>`
		* `<sourceName>` - The name of the source function
		* `<sourceLine>` - The possible line the source function is called in
		* `<sourceColumn>` - The possible column the source function is called in
		* `<sinkFunction>` - The name of the sink function
		* `<sinkLine>` - The possible line the sink function is called in
		* `<sinkColumn>` - The possible column the sink function is called in

# Testing
---
This project uses Mocha as a test framework with custom test running capabilities.

## Running Tests
### Run All Tests
```bash
npm test
```
### Run a Single Test File
Simply pass the test name (without the `.test.js` extension):
```bash
npm test big_sample
```
This will run the test file `tests/dependency_detection/big_sample.test.js`.
## Examples
- Run all tests: `npm test`
- Run big_sample tests: `npm test big_sample`
- Run basic_sample tests: `npm test basic_sample`
- Run array_sample tests: `npm test array_sample`

# References
---
* [GraphIR-Extractor repo](https://github.com/AdiHarif/GraphIR-Extractor)
* [GraphIR-Static-Analysis repo](https://github.com/AdiHarif/GraphIR-Static-Analysis) (the current project was forked from this repo)

# `launch.json`
---
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "(gdb) Launch a.out (compiled with souffle)",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/samples/dependency_detection/two_inputs_sample/main.out",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}/samples/dependency_detection/two_inputs_sample",
            "environment": [
                {
                    "name": "LD_LIBRARY_PATH",
                    "value":"${workspaceFolder}/samples/dependency_detection/two_inputs_sample"
                }
            ],
            "externalConsole": false,
            "MIMode": "gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                },
                {
                    "description": "Set Disassembly Flavor to Intel",
                    "text": "-gdb-set disassembly-flavor intel",
                    "ignoreFailures": true
                }
            ]
        }
    ]
}
```