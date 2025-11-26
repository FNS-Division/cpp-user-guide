# Welcome to the ITU Connectivity Planning Platform

## About the ITU Connectivity Planning Platform

The Connectivity Planning Platform is an easy-to-use mapping and analysis tool designed to help planners connect schools, hospitals, residential buildings, and other places to the internet. By assessing various technology options like fibre, cellular networks, point-to-point microwave, and satellite, the platform identifies the best way to bring connectivity to unconnected areas.

The platform evaluates the costs of each solution and provides a deployment plan that meets the cost limits you set. The platform uses your data on the locations of Points of Interest (POIs), ICT infrastructure (cell sites and tranmission nodes), and mobile coverage. Additionally, it uses open data on population, road networks and topography to enrich the analysis, making it a powerful solution for planning affordable, efficient internet connectivity.

## The Platform Model

- **Dataset Upload**: Begin by uploading your datasets to the platform. The data will be processed and cleaned to ensure it is ready for analysis. If you have previously uploaded the required datasets, you may skip this step.
- **Project Creation**: Create a new project and assign it a name.
- **Scenario Selection**: Select a scenario for your project. Scenarios define the logic used to assign technology options to Points of Interest (POIs). For example, the _Maximise Operator Net Present Value (NPV)_ scenario chooses the set of technology options that jointly maximise operator profits. At this stage, you will also set scenario parameters—such as the planning period, budget, and throughput demand per user—and choose which technology options to include in your analysis.
- **Model Configuration & Dataset Selection**: Configure each technology model by specifying key parameters, such as the maximum allowable connection length and equipment costs. Each model relies on specific datasets, including ICT infrastructure locations. Here, you will link the relevant datasets to each model.

_Figure: Platform model_

![cpp-model](diagrams/scenarios-models-datasets-with-frames.svg)
