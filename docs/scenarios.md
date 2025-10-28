# Scenarios

The tool provides built-in connectivity scenarios to guide the analysis. Each scenario defines how the connectivity models are parameterized and determines the best technologies to use for connecting points of interest (POIs) according to a specific logic. Details of the available scenarios are outlined below.

## Maximize Operator Net Present Value (NPV)

### Scenario parameters

There are scenario-level parameters which need to be provided, as summarized in the table below.

| Description | Example value |
|------------|---------------|
| Budget (USD) | 1,000,000 |
| Project planning period (years) | 10 |
| Demand per user (Mbps) | 1.5 |

The diagram below illustrates the _Maximize Operator Net Present Value (NPV)_ scenario. This scenario focuses on connecting as many points of interest as possible while maximizing the operator's net revenue.

_Figure: Maximize Operator Net Present Value (NPV)_

![scenario](diagrams/scenario_max_npv.drawio.svg)

## Minimize Operator Total Cost of Ownership (TCO)

### Scenario parameters

There are scenario-level parameters which need to be provided, as summarized in the table below.

| Description | Example value |
|------------|---------------|
| Budget (USD) | 1,000,000 |
| Project planning period (years) | 10 |
| Demand per user (Mbps) | 1.5 |

The diagram below illustrates the _Minimize Operator Total Cost of Ownership (TCO)_ scenario. This scenario focuses on connecting as many points of interest as possible while minimizing the operator's cost of ownership (which includes both Capital Expenditure and Operational Expenditure).

_Figure: Minimize Operator Total Cost of Ownership (TCO)_

![scenario](diagrams/scenario_min_tco.drawio.svg)