#Monitoring Agrometeorological Resources Using Remote Sensing (P-RAIN, Evap-ETP, RH, SM, ST, SWS, SAT, VP, WS) in GEE

## Use and install this repository

HTTPS
```html
https://github.com/CarlosMendez1997Col/Monitoring-Agrometeorological-Resources.git
```

GitHub CLI
```html
gh repo clone CarlosMendez1997Col/Monitoring-Agrometeorological-Resources
```

## Description

Repository builded in `Google Earth Engine (GEE)` and `Javascript`.

Each part is llinked below:

```html
<!-- A1.Precipitation and Rainfall-->
https://github.com/CarlosMendez1997Col/Monitoring-Agrometeorological-Resources/tree/main/A1.%20Precipitation%20and%20Rainfall
<!--B2. Wind Speed-->
https://github.com/CarlosMendez1997Col/Monitoring-Agrometeorological-Resources/tree/main/B2.%20Wind%20Speed
<!--C3. Surface Air Temperature (SAT)-->
https://github.com/CarlosMendez1997Col/Monitoring-Agrometeorological-Resources/tree/main/C3.%20Surface%20Air%20Temperature%20(SAT)
<!--D4. Runoff-->
https://github.com/CarlosMendez1997Col/Monitoring-Agrometeorological-Resources/tree/main/D4.%20Runoff
<!--E5. Evaporation and Evapotranspiration-->
https://github.com/CarlosMendez1997Col/Monitoring-Agrometeorological-Resources/tree/main/E5.%20Evaporation%20and%20Evapotranspiration
<!--F6. Solar Radiation-->
https://github.com/CarlosMendez1997Col/Monitoring-Agrometeorological-Resources/tree/main/F6.%20Solar%20Radiation
<!--G7. Soil Moisture-->
https://github.com/CarlosMendez1997Col/Monitoring-Agrometeorological-Resources/tree/main/G7.%20Soil%20Moisture
<!--H8. Relative Humidity-->
https://github.com/CarlosMendez1997Col/Monitoring-Agrometeorological-Resources/tree/main/H8.%20Relative%20Humidity
<!--I9. Soil Temperature-->
https://github.com/CarlosMendez1997Col/Monitoring-Agrometeorological-Resources/tree/main/I9.%20Soil%20Temperature
<!--J10 Soil Water Storage (SWS)-->
https://github.com/CarlosMendez1997Col/Monitoring-Agrometeorological-Resources/tree/main/J10%20Soil%20Water%20Storage%20(SWS)
<!--K11. Agrometeorological Index-->
https://github.com/CarlosMendez1997Col/Monitoring-Agrometeorological-Resources/tree/main/K11.%20Agrometeorological%20Index
```
## Versions and releases

Version `1.0`

```JavaScript
https://github.com/CarlosMendez1997Col/Monitoring-Agrometeorological-Resources/releases
```
  
## External packages and repositories of GEE

```JavaScript
require("users/aazuspan/snazzy:styles");
require('users/gena/packages:style');
require('users/gena/packages:text');
require('users/gena/packages:utils');
```

## External Basemaps

```JavaScript
var MultiBrand = "https://snazzymaps.com/style/20053/multi-brand-network"
var MidNight = "https://snazzymaps.com/style/2/midnight-commander"
var GeoMap = "https://snazzymaps.com/style/48477/geomap"
var AImap = "https://snazzymaps.com/style/283414/ai-map"
var AccessCall = "https://snazzymaps.com/style/10448/accesscall"
var MutedBlue = "https://snazzymaps.com/style/83/muted-blue"
var Outrun = "https://snazzymaps.com/style/122898/outrun"
var Cobalt = "https://snazzymaps.com/style/30/cobalt"
```

## External Images and ImageCollections

```JavaScript
ee.ImageCollection("users/gena/global-hand/hand-100")
ee.Image("JAXA/ALOS/AW3D30/V2_2")
```

## Main ImageCollections and Datasets

```JavaScript

ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level1');

// A1.Precipitation and Rainfall
ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY').select(['precipitation'])
                 
// B2. Wind Speed
ee.ImageCollection('NASA/FLDAS/NOAH01/C/GL/M/V001').select(['Wind_f_tavg'])

// C3. Surface Air Temperature (SAT)
ee.ImageCollection('ECMWF/ERA5_LAND/DAILY_AGGR').select(['temperature_2m'])
                            
// D4. Runoff

// Surface Runoff
ee.ImageCollection('ECMWF/ERA5_LAND/DAILY_AGGR').select(['surface_runoff_sum'])
// Groundwater Runoff
ee.ImageCollection('ECMWF/ERA5_LAND/DAILY_AGGR').select(['sub_surface_runoff_sum'])

// E5. Evaporation and Evapotranspiration
ee.ImageCollection('ECMWF/ERA5_LAND/DAILY_AGGR').select(['total_evaporation_sum'])

// F6. Solar Radiation
ee.ImageCollection('ECMWF/ERA5_LAND/DAILY_AGGR').select(['surface_net_solar_radiation_sum'])

// G7. Soil Moisture (In construction)

// H8. Relative Humidity (In construction)

// I9. Soil Temperature (In construction)

// J10 Soil Water Storage (SWS) (0-7cm), (7-28cm), (28-100cm), (100-289cm)

ee.ImageCollection('ECMWF/ERA5_LAND/DAILY_AGGR').select(['volumetric_soil_water_layer_1'])
ee.ImageCollection('ECMWF/ERA5_LAND/DAILY_AGGR').select(['volumetric_soil_water_layer_2'])
ee.ImageCollection('ECMWF/ERA5_LAND/DAILY_AGGR').select(['volumetric_soil_water_layer_3'])
ee.ImageCollection('ECMWF/ERA5_LAND/DAILY_AGGR').select(['volumetric_soil_water_layer_4'])

// K11. Agrometeorological Index (In construction)
```


## Credits and repository of data

The original Images, ImageCollection and FeatureCollections used in this project, are available at:

- [CHIRPS Daily](https://developers.google.com/earth-engine/datasets/catalog/UCSB-CHG_CHIRPS_DAILY) Climate Hazards Center InfraRed Precipitation With Station Data (Version 2.0 Final) 
- [FLDAS:](https://developers.google.com/earth-engine/datasets/catalog/NASA_FLDAS_NOAH01_C_GL_M_V001?hl=es-419#description)Famine Early Warning Systems Network (FEWS NET) Land Data Assimilation System
- [ERA5](https://developers.google.com/earth-engine/datasets/catalog/ECMWF_ERA5_LAND_DAILY_AGGR) Land Daily Aggregated - ECMWF Climate Reanalysis

## Conflict of Interest.

The author declare that there is no conflict of interest in the publication of this data and have approved it for publication.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate. 

## MIT License

Copyright (c) 2025 Carlos Mendez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

