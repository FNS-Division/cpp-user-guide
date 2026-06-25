# Datasets

This page summarises the user-provided data required by the toolkit. The provided data must conform to the standards below.

## Points of interest (POI)

**Example dataset:** [Download example-pointsofinterest.xlsx](datasets/example-pointsofinterest.xlsx)

| Column name | Type | Example | Required | Levels | Description |
|-------------|------|---------|----------|--------|-------------|
| `lat` | float | 36.7538 | Yes* | | Latitude in WGS84 |
| `lon` | float | 3.0588 | Yes* | | Longitude in WGS84 |
| `connectivity_type` | string | fiber | No | `unknown`<br>`mobile`<br>`mobile_broadband`<br>`metro`<br>`fiber`<br>`wireless`<br>`satellite`<br>`wired` | Type of internet connectivity |
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

- If **connectivity_type** or **is_connected** is not provided, connectivity status will be inferred using speed-test data from [Ookla Open Data](https://www.ookla.com/ookla-for-good/open-data).

- If **has_electricity** is not provided, the POI will be assumed not to have electricity.

- If **number_of_users** is not provided, it will be estimated using the demand model and population data.

- If **total_mbps** is not provided, it will be estimated from the number of users and the assumed bandwidth demand per user (demand analysis).

## Cell sites

**Example dataset:** [Download example-cellsites.xlsx](datasets/example-cellsites.xlsx)

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

- If **`antenna_height`** is not provided, a default height of **25 meters** will be assumed.

## Transmission nodes

**Example dataset:** [Download example-transmissionnode.xlsx](datasets/example-transmissionnode.xlsx)

| Column name | Type | Example | Required | Levels | Description |
|-------------|------|---------|----------|--------|-------------|
| `lat` | float | 38.988755 | Yes* | | Latitude in WGS84 |
| `lon` | float | 1.401938 | Yes* | | Longitude in WGS84 |
| `country_code` | string | DZA | No | | ISO 3166-1 alpha-3 country code |
| `dataset_id` | UUID | 987fcdeb-51a2-12d3 | No | | Dataset identifier (auto-generated if omitted) |
| `ict_id` | UUID | 123e4567-e89b-12d3 | No | | Node identifier (auto-generated if omitted) |
| `transmission_medium` | string | fiber | No | `fiber`<br>`microwave`<br>`other` | Transmission medium |

**Notes:**

- **\*** Required unless the input is a GeoPackage (GPKG) or GeoJSON file containing valid geometry.

- If **`transmission_medium`** is not provided, `fiber` will be assumed.

## Mobile coverage

**Example dataset:** [Download example-coverage.csv](datasets/example-mobilecoverage.xlsx)

| Column name | Type | Example | Required | Levels | Description |
|-------------|------|---------|----------|--------|-------------|
| `geometry` | geometry | `POLYGON((-74.0060 40.7128, -73.9857 40.7484, -73.9772 40.7516, -74.0060 40.7128))` | Yes | | Mobile coverage polygon in WGS84 |
| `radio_type` | string | 4G | Yes* | `2G`<br>`3G`<br>`4G`<br>`5G` | Radio transmission technology |
| `country_code` | string | DZA | No | | ISO 3166-1 alpha-3 country code |
| `dataset_id` | UUID | 987fcdeb-51a2-12d3 | No | | Dataset identifier (auto-generated if omitted) |

**Notes:**

- **\*** **`radio_type`** is automatically added through the CPP user interface using a drop down menu.

- **`geometry`** must contain valid polygon or multipolygon geometries in the **WGS84** coordinate reference system.

- If you submit a **raster file** through the platform, the pixels with coverage should have a value of `1`.

- If you submit **vector data**, only include the polygons of areas **with** coverage.
