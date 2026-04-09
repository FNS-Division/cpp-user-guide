# I. Product Description - General

## 1. What it is

The Connectivity Technology Explorer is a lightweight, non-technical "pre-CPP" experience that helps users build intuition about **which connectivity technologies tend to fit different contexts and why**. It is designed primarily for **policymakers and decision-makers** who need to understand trade-offs early, before working with CPP's full modelling workflows (data inputs, parameters, datasets, scenario objectives, and cost outputs).

This tool is not a cost model. It is a **guided exploration tool** that turns CPP concepts into plain language so users can arrive at CPP better prepared, knowing what matters most in their scenario and what questions to ask.

**Launch the interactive tool:** [Open Connectivity Technology Explorer](explorer/index.html)

## 2. Design considerations

CPP is powerful, but it can feel technical at the starting line. This Explorer provides a structured ramp-up by:

- **Reducing cognitive load**: only a few context questions, no parameters or datasets required.
- **Making trade-offs visible**: users see how priorities like *speed vs long-term value vs cost* shift the likely fit.
- **Explaining the "why"**: each technology card highlights the key drivers behind the recommendation.
- **Supporting exploration**: users can change one context choice and immediately see how results respond, building understanding through experimentation rather than instructions.

*Note: Satellite connectivity is described generically rather than referencing a specific orbit type, so the concept remains applicable across different satellite architectures.*

## 3. How results are calculated (simple "math" behind the fit)

The Explorer uses a transparent scoring model (a rules-based weighted sum) that mimics how early project logic often works:

1. Each context choice contributes positive or negative points to each technology according to predefined rules that approximate early-stage planning logic.
2. Points are added up into a single score per technology.
3. The score is translated into a fit category:
   - **Strong fit**: score >= 4
   - **Good fit**: score 1 to 3
   - **Context-dependent**: score -1 to 0
   - **Poor fit**: score <= -2
4. A match meter visualizes how strongly each technology fits the selected context. The meter is normalized per technology so that options with fewer scoring factors are not visually penalized.
5. "Logic chips" highlight the strongest factors that influenced the score (for example *Infrastructure proximity +3* or *Hard terrain -2*), with an option to expand and view all contributing signals.

This is intentionally simple: it gives users a credible, explainable model of the *direction* of fit, not a feasibility/cost conclusion.

Note: for the detailed scoring model, see the section **Annex - Technology Explorer scoring model**.

## 4. Mapping the Explorer to CPP (menus + concepts -> simple context questions)

The Explorer steps are a simplified translation of how CPP typically structures a project: define the context, define what's needed, then define what matters most.

<style>
.tech-explorer-table,
.tech-explorer-table th,
.tech-explorer-table td {
  border: 1px solid #9ca3af;
}

.tech-explorer-table {
  border-collapse: collapse;
  width: 100%;
}

.tech-explorer-table th,
.tech-explorer-table td {
  padding: 8px;
}

.tech-explorer-mapping-table {
  table-layout: fixed;
}
</style>

### Step 1 - "Where are we?"

<table class="tech-explorer-table tech-explorer-mapping-table" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
  <colgroup>
    <col style="width: 28%;">
    <col style="width: 36%;">
    <col style="width: 36%;">
  </colgroup>
  <thead>
    <tr>
      <th>Explorer inputs</th>
      <th>CPP concept translation</th>
      <th>Why we translated it this way</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li><em>How close is this location to existing infrastructure?</em></li>
          <li><em>How difficult is it to build here?</em></li>
        </ul>
      </td>
      <td>
        <ul>
          <li><strong>Geography and access constraints</strong> -> remoteness and terrain (proxy for construction complexity, accessibility), and likely infrastructure proximity</li>
          <li><strong>Buildability constraints</strong> -> terrain as a proxy for civil works effort and physical feasibility challenges</li>
        </ul>
      </td>
      <td>Instead of asking for CPP-specific data fields upfront, we capture the <strong>same intent</strong> as high-level context signals a policymaker can answer reliably.</td>
    </tr>
  </tbody>
</table>

### Step 2 - "What is needed?"

<table class="tech-explorer-table tech-explorer-mapping-table" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
  <colgroup>
    <col style="width: 28%;">
    <col style="width: 36%;">
    <col style="width: 36%;">
  </colgroup>
  <thead>
    <tr>
      <th>Explorer inputs</th>
      <th>CPP concept translation</th>
      <th>Why we translated it this way</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li><em>What level of performance is required?</em> (demand)</li>
          <li><em>How many people need access?</em> (density)</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><strong>Demand assumptions</strong> (bandwidth needs, service expectations) -> simplified into essential connectivity / everyday use / high-performance needs</li>
          <li><strong>Scale and concentration of demand</strong> -> simplified into low / mid / high density</li>
        </ul>
      </td>
      <td>CPP can represent demand via parameters and datasets. The Explorer uses "plain language demand tiers" to help users reason about <strong>capacity vs coverage</strong> needs before they ever touch numerical inputs.</td>
    </tr>
  </tbody>
</table>

### Step 3 - "What matters most?"

<table class="tech-explorer-table tech-explorer-mapping-table" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
  <colgroup>
    <col style="width: 28%;">
    <col style="width: 36%;">
    <col style="width: 36%;">
  </colgroup>
  <thead>
    <tr>
      <th>Explorer inputs</th>
      <th>CPP concept translation</th>
      <th>Why we translated it this way</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <ul>
          <li><em>What's the priority?</em> (cost / long-term value / speed)</li>
        </ul>
      </td>
      <td>
        <ul>
          <li><strong>Scenario objectives / optimization goals</strong> -> simplified into a single dominant objective users can choose</li>
        </ul>
      </td>
      <td>In CPP, objective-setting strongly influences recommended solutions. The Explorer makes that relationship visible early, without requiring users to understand optimization language.</td>
    </tr>
  </tbody>
</table>

## 5. Features and expected user flow

### 5.1 Core features

- **Three-step guided context setup** with clear progression and completion indicators.
- **Selectable "tiles"** (instead of dropdowns) for faster, mobile-friendly input.
- **Technology fit** results shown as:
  - Fit label (Strong / Good / Context-dependent / Poor fit)
  - Match meter (visual strength of fit)
  - Key driver chips (strongest contributing factors shown by default, with an option to expand and view all contributing signals)
  - Plain-language "why" bullets (pros + watch-outs)
- **Optional toggle to show CPP parameter examples**: displays illustrative CPP parameter examples to connect the simple choices back to CPP terminology.
- **Neutral state** before context completion: shows technologies without bias until the user has provided a full context.
- **Info modal** explaining purpose, boundaries, and how it supports CPP readiness.
- **Context-aware input validation** to prevent contradictory scenario definitions.
- **Context consistency rules**: to avoid unrealistic combinations (for example, a very remote location paired with dense urban demand), the Explorer enforces simple consistency rules between inputs. Population density options are constrained by the selected remoteness level. If a user changes the remoteness after selecting density, incompatible density options are automatically cleared.
- **Expandable factor explanation**: results highlight the strongest factors first and allow users to expand each card to see all contributing signals behind the score.
- **Technology-normalized match meters**: the visual match bar is normalized for each technology so the percentage accurately reflects how well that technology fits the selected context.

### 5.2 How users are expected to use it

You can launch the tool while following this flow: [Open Connectivity Technology Explorer](explorer/index.html)

1. **Start by defining the context, not by picking a technology**: answer Steps 1 to 3 based on the project context.
2. Review the results:
   - Compare which technologies rise or fall with the context.
   - Read the "why" bullets to understand trade-offs.
3. (Optional) turn on **"Show CPP parameter examples"**:
   - See examples of CPP parameters that relate to each technology.
   - Use this as a bridge to CPP terminology and deeper modelling work.
4. Iterate: change one assumption (e.g., priority or terrain) and observe how the fit shifts. This is the learning mechanism.

# II. Annex - Technology Explorer Scoring Model

## 1. Model overview

The Connectivity Technology Explorer uses a **simple additive scoring model** to estimate how well different connectivity technologies fit a given context.

For each scenario defined by the user, the tool evaluates five contextual dimensions:

1. Location remoteness
2. Terrain difficulty
3. Population density
4. Connectivity demand
5. Project priority

Each condition contributes **positive or negative points** to each technology. All points are summed to produce a final score.

## 2. Scoring rules

Points are applied according to the following rules.

<table class="tech-explorer-table" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr>
      <th>Context condition</th>
      <th>Fibre</th>
      <th>Cellular / FWA</th>
      <th>Point-to-Point</th>
      <th>Satellite</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Infrastructure nearby</td><td>+3</td><td>+2</td><td>+1</td><td>-1</td></tr>
    <tr><td>Outside town</td><td>+1</td><td>+2</td><td>+2</td><td>0</td></tr>
    <tr><td>Far from infrastructure</td><td>-1</td><td>0</td><td>0</td><td>+2</td></tr>
    <tr><td>Very remote</td><td>-1</td><td>-1</td><td>0</td><td>+2</td></tr>
    <tr><td>Easy terrain</td><td>+1</td><td>0</td><td>+1</td><td>0</td></tr>
    <tr><td>Rugged terrain</td><td>-2</td><td>0</td><td>-1</td><td>0</td></tr>
    <tr><td>Dense population</td><td>+2</td><td>+1</td><td>0</td><td>0</td></tr>
    <tr><td>Everyday use needs</td><td>+2</td><td>+1</td><td>+1</td><td>0</td></tr>
    <tr><td>High-performance needs</td><td>+2</td><td>0</td><td>0</td><td>-1</td></tr>
    <tr><td>Essential connectivity needs</td><td>-1</td><td>-1</td><td>-1</td><td>0</td></tr>
    <tr><td>Priority: minimize cost</td><td>0</td><td>+1</td><td>+1</td><td>0</td></tr>
    <tr><td>Priority: long-term value</td><td>+1</td><td>0</td><td>0</td><td>-1</td></tr>
    <tr><td>Priority: deploy quickly</td><td>-1</td><td>+2</td><td>+1</td><td>+2</td></tr>
  </tbody>
</table>

Note: Some scoring conditions can occur simultaneously. For example, a location may be both near infrastructure and outside a town, or a project may serve high demand while also prioritizing long-term value. Because of this, the maximum theoretical score for a technology may exceed the sum visible in any single row combination in the table.

Notes:

- Some conditions do not affect certain technologies.
- High-performance needs are treated as a stronger performance requirement. Selecting this option triggers both the general higher-performance rule and an additional high-performance rule in the scoring model.
- Satellite receives higher scores as remoteness increases.
- Basic demand is treated as a low **planning baseline**, so it does not strongly favor any technology and slightly reduces the relative fit of infrastructure-heavy options.

## 3. Visual score indicator

The Explorer uses a visual "match meter" to illustrate how strongly each connectivity technology fits the selected context.

The Explorer normalizes the match meter per technology. Each technology's score is compared against its own realistic maximum score, and the meter is calculated as a percentage of that maximum.

Negative scores are visually floored at 0% so that the bar does not imply a positive fit when the score is neutral or weak.

For visualization purposes, the Explorer currently assumes approximate maximum scores. These values represent practical upper bounds used to normalize the visual meter. Actual scenario scores may not reach these values because some scoring conditions are mutually exclusive.

<table class="tech-explorer-table" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr>
      <th>Technology</th>
      <th>Approximate maximum score used for visualization</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Fibre</td><td>10</td></tr>
    <tr><td>Cellular / FWA</td><td>6</td></tr>
    <tr><td>Point-to-Point radio</td><td>5</td></tr>
    <tr><td>Satellite</td><td>6</td></tr>
  </tbody>
</table>

## 4. Explanation indicators

To help users understand the result, the Explorer highlights the strongest contributing factors influencing the score for each technology. These appear as small indicator chips (for example: **Infrastructure proximity +3** or **Hard terrain -2**).

By default, the interface shows the most influential signals to keep the explanation readable. Users can expand the result card to reveal all contributing factors that affected the score.

This design balances transparency of the scoring logic with clarity of the user interface.

## 5. When results are calculated

Technology fit is only calculated after all five contextual inputs are selected. Until then, technologies are displayed in a neutral state.
