# Scenarios

The tool provides built-in connectivity scenarios to guide the analysis. Each scenario defines how the connectivity models are parameterised and determines the best technologies to use for connecting points of interest (POIs) according to a specific logic. Details of the available scenarios are outlined below.

## Maximise Operator Net Present Value (NPV)

### Scenario parameters

There are scenario-level parameters which need to be provided, as summarised in the table below.

| Description | Example value |
|------------|---------------|
| Budget (USD) | 1,000,000 |
| Project planning period (years) | 10 |
| Demand per user (Mbps) | 1.5 |

The diagram below illustrates the _Maximise Operator Net Present Value (NPV)_ scenario. This scenario focuses on connecting as many points of interest as possible while maximizing the operator's net revenue.

_Figure: Maximise Operator Net Present Value (NPV)_

![scenario](diagrams/scenario_max_npv.drawio.svg)

## Minimise Operator Total Cost of Ownership (TCO)

### Scenario parameters

There are scenario-level parameters which need to be provided, as summarised in the table below.

| Description | Example value |
|------------|---------------|
| Project planning period (years) | 10 |
| Demand per user (Mbps) | 1.5 |

The diagram below illustrates the _Minimise Operator Total Cost of Ownership (TCO)_ scenario. This scenario focuses on connecting as many points of interest as possible while minimizing the operator's cost of ownership (which includes both Capital Expenditure and Operational Expenditure).

_Figure: Minimise Operator Total Cost of Ownership (TCO)_

![scenario](diagrams/scenario_min_tco.drawio.svg)