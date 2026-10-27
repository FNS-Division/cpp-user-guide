# Datasets

This page summarises the user-provided data required by the platform. The provided data must conform to the standards below.

Every dataset you upload is automatically checked and standardised before it is used — see [Data validation](datavalidation.md) for the checks applied to each category.

## Points of interest (POI)

**Example dataset:** [Download example-pointsofinterest.xlsx](datasets/example-pointsofinterest.xlsx) · [Download example-pointsofinterest.gpkg](datasets/example-pointsofinterest.gpkg)

**Accepted file formats:** `.csv`, `.xlsx`, `.geojson`, `.gpkg`, `.kml`

| Column name | Type | Example | Required | Levels | Description |
|-------------|------|---------|----------|--------|-------------|
| `lat` | float | 36.7538 | Yes* | | Latitude in WGS84 |
| `lon` | float | 3.0588 | Yes* | | Longitude in WGS84 |
| `connectivity_type` | string | fiber | No | `unknown`<br>`mobile`<br>`mobile_broadband`<br>`metro`<br>`fiber`<br>`adsl`<br>`wireless`<br>`satellite`<br>`wired` | Type of internet connectivity |
| `country_code` | string | ESP | No | | ISO 3166-1 alpha-3 country code |
| `dataset_id` | UUID | 987fcdeb-51a2-12d3 | No | | Dataset identifier (auto-generated if omitted) |
| `has_electricity` | boolean | True | No | `True`<br>`False` | Whether the POI has electricity |
| `is_connected` | boolean | True | No | `True`<br>`False` | Whether the POI has internet connectivity |
| `number_of_users` | int | 500 | No | | Peak number of internet users at the POI |
| `total_mbps` | float | 50.0 | No | | Total bandwidth demand in Mbps |
| `poi_id` | UUID | 123e4567-e89b-12d3 | No | | POI identifier (auto-generated if omitted) |
| `poi_type` | string | school | No | | Type of point of interest |

**Notes:**

- **\*** Required unless the input is a GeoPackage (GPKG) or GeoJSON file containing valid geometry.

- If **both** **`connectivity_type`** and **`is_connected`** are absent, connectivity status is inferred using speed-test data from [Ookla Open Data](https://www.ookla.com/ookla-for-good/open-data). Supplying either column disables the inference for the whole dataset, so partially filled columns are left as they are — see [Data validation](datavalidation.md#points-of-interest).

- Values inferred from Ookla data are one of `fiber`, `adsl`, `fixed_unknown` or `mobile`. **`connectivity_type`** is not validated against the levels above, so any other value you supply is passed through to the outputs unchanged.

- If **`has_electricity`** is not provided, the POI will be assumed not to have electricity.

- If **number_of_users** is not provided, it will be estimated using the demand analysis and population data.

- If **total_mbps** is not provided, it will be estimated from the number of users and the assumed bandwidth demand per user (demand analysis).

## Cell sites

**Example dataset:** [Download example-cellsites.xlsx](datasets/example-cellsites.xlsx) · [Download example-cellsites.gpkg](datasets/example-cellsites.gpkg)

**Accepted file formats:** `.csv`, `.xlsx`, `.geojson`, `.gpkg`, `.kml`

| Column name | Type | Example | Required | Levels | Description |
|-------------|------|---------|----------|--------|-------------|
| `lat` | float | 38.988755 | Yes* | | Latitude in WGS84 |
| `lon` | float | 1.401938 | Yes* | | Longitude in WGS84 |
| `radio_type` | string | 4G | Yes | `2G`<br>`3G`<br>`4G`<br>`5G` | Radio transmission technology |
| `antenna_height` | float | 25 | No | | Antenna height above ground level (meters) |
| `country_code` | string | DZA | No | | ISO 3166-1 alpha-3 country code |
| `dataset_id` | UUID | 987fcdeb-51a2-12d3 | No | | Dataset identifier (auto-generated if omitted) |
| `ict_id` | UUID | 123e4567-e89b-12d3 | No | | Cell tower identifier (auto-generated if omitted) |

**Notes:**

- **\*** Required unless the input is a GeoPackage (GPKG) or GeoJSON file containing valid geometry.

- If **`antenna_height`** is not provided at all, a default height of **25 meters** is assumed. If it is provided for only *some* sites, the gaps are filled with the median height of the valid sites in your own file — see [Data validation](datavalidation.md#cell-sites).

## Transmission nodes

**Example dataset:** [Download example-transmissionnode.xlsx](datasets/example-transmissionnode.xlsx) · [Download example-transmissionnode.gpkg](datasets/example-transmissionnode.gpkg)

**Accepted file formats:** `.csv`, `.xlsx`, `.geojson`, `.gpkg`, `.kml`

| Column name | Type | Example | Required | Levels | Description |
|-------------|------|---------|----------|--------|-------------|
| `lat` | float | 38.988755 | Yes* | | Latitude in WGS84 |
| `lon` | float | 1.401938 | Yes* | | Longitude in WGS84 |
| `country_code` | string | DZA | No | | ISO 3166-1 alpha-3 country code |
| `dataset_id` | UUID | 987fcdeb-51a2-12d3 | No | | Dataset identifier (auto-generated if omitted) |
| `ict_id` | UUID | 123e4567-e89b-12d3 | No | | Node identifier (auto-generated if omitted) |
| `transmission_medium` | string | fiber | No | `fiber`<br>`microwave`<br>`copper`<br>`coaxial` | Transmission medium |

**Notes:**

- **\*** Required unless the input is a GeoPackage (GPKG) or GeoJSON file containing valid geometry.

- If **`transmission_medium`** is missing or holds a value outside the levels above, it is recorded as `unknown` — see [Data validation](datavalidation.md#transmission-nodes).

- **`transmission_medium`** is descriptive only and does not affect the modelling: every transmission node is treated as a potential fibre connection point regardless of its medium.

## Mobile coverage

**Example dataset:** [Download example-coverage.csv](datasets/example-mobilecoverage.xlsx) · [Download example-mobilecoverage.gpkg](datasets/example-mobilecoverage.gpkg) · [Download example-mobilecoverage.tif](datasets/example-mobilecoverage.tif)

**Accepted file formats:** `.csv`, `.xlsx`, `.geojson`, `.gpkg`, `.kml`, `.tif`, `.tiff`

| Column name | Type | Example | Required | Levels | Description |
|-------------|------|---------|----------|--------|-------------|
| `geometry` | geometry | `POLYGON((-74.0060 40.7128, -73.9857 40.7484, -73.9772 40.7516, -74.0060 40.7128))` | Yes | | Mobile coverage polygon in WGS84 |
| `radio_type` | string | 4G | Yes* | `2G`<br>`3G`<br>`4G`<br>`5G` | Radio transmission technology |
| `country_code` | string | DZA | No | | ISO 3166-1 alpha-3 country code |
| `dataset_id` | UUID | 987fcdeb-51a2-12d3 | No | | Dataset identifier (auto-generated if omitted) |

**Notes:**

- **\*** **`radio_type`** is automatically added through the CPP user interface using a drop down menu.

- **`geometry`** must contain valid polygon or multipolygon geometries. Data in another coordinate reference system is reprojected to **WGS84** automatically — see [Data validation](datavalidation.md#geospatial-validation).

- If you submit **vector data**, only include the polygons of areas **with** coverage.

- If you submit a **raster file** (`.tif`/`.tiff`), it must have a **single band**, and pixels in areas **with** coverage must have a value of `1`. The platform UI will ask you to pick a single **`radio_type`** (e.g. 4G) for the whole raster.

- If you need to submit **multiple coverage types** (e.g. 4G and 5G), submit **vector data** instead, with each coverage type as a separate row and its radio type in the **`radio_type`** column.
