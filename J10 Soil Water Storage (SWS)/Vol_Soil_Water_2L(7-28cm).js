// Monitoring-Agrometeorological-Resources (P-RAIN, EVAP-ETP, RH, SM, ST, SWS, SAT, VP, WS)

// Created by Carlos Mendez

// Volume Soil Water at (7-28cm)

var geometry_col = ee.Geometry.Polygon(
        [[[-80.14310386284969, 14.178929930836995],
          [-80.14310386284969, -4.478119941165931],
          [-66.43216636284969, -4.478119941165931],
          [-66.43216636284969, 14.178929930836995]]], null, false);
          
var titleLocation = ee.Geometry.Point([-78.93942498639821, 12.810558946114867]);

var dateLocation = ee.Geometry.Point([-78.07767417534969, -1.3404739902547393]);

var gradientLabelLocation = ee.Geometry.Point([-71.00247886284969, 10.195740335234447]);

var gradientLocation = ee.Geometry.Polygon(
        [[[-71.42338299257605, 8.857307737585614],
          [-71.42338299257605, 8.276099454816547],
          [-67.41337322695105, 8.276099454816547],
          [-67.41337322695105, 8.857307737585614]]], null, false);



////////////////////////////////////////////////////////////////////// Import external packages and repositories //////////////////////////////////////////////////////////////////

var snazzy = require("users/aazuspan/snazzy:styles");
var style = require('users/gena/packages:style');
var text = require('users/gena/packages:text');
var utils = require('users/gena/packages:utils');
var palettes = require('users/gena/packages:palettes');

var MultiBrand = "https://snazzymaps.com/style/20053/multi-brand-network"
var MidNight = "https://snazzymaps.com/style/2/midnight-commander"
var GeoMap = "https://snazzymaps.com/style/48477/geomap"
var AImap = "https://snazzymaps.com/style/283414/ai-map"
var AccessCall = "https://snazzymaps.com/style/10448/accesscall"
var MutedBlue = "https://snazzymaps.com/style/83/muted-blue"
var Outrun = "https://snazzymaps.com/style/122898/outrun"
var Cobalt = "https://snazzymaps.com/style/30/cobalt"

////////////////////////////////////////////////////////////////////// Main Script //////////////////////////////////////////////////////////////////

// Import the Colombia Boundary
var dataset = ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level1');

// Import The Area or Region to analyze
var Region = dataset.filter(ee.Filter.eq('ADM0_NAME', 'Colombia'));
var geometry = Region.geometry();

////////////////////////////////////////////////////////////////////// Monthly Evaporation Average//////////////////////////////////////////////////////////////////

// Put the start or first data in format 'YYYY-MM-DD'
var startDay = 01
var startMonth = 01
var startYear = 1995
var startDate = ee.Date.fromYMD(startYear, startMonth, startDay);

// Get the currently data in format 'YYY-MM-DD'
var now = new Date();
var eeDate = ee.Date(now);
// Extract and convert current year, month and day 
var endYear = eeDate.format('YYYY');
var endYear = ee.Number.parse(endYear);
var endMonth = eeDate.format('MM');
var endMonth = ee.Number.parse(endMonth);
var endDay = eeDate.format('dd');
var endDay = ee.Number.parse(endDay);
// Aggregate and join information of final data 
var endDate = ee.Date.fromYMD(endYear, endMonth, endDay);

// Create functions to calculate differences in days and months between first/final data
var nDays = ee.Number(endDate.difference(startDate,'day').round());
var months = ee.List.sequence(1,12);
var nMonths = ee.Number(endDate.difference(startDate,'month')).round();

var Evap = ee.ImageCollection('ECMWF/ERA5_LAND/DAILY_AGGR')
                            .filterDate(startDate, endDate)
                            .select(['volumetric_soil_water_layer_2'])

var byMonth_Evap = ee.ImageCollection(ee.List.sequence(0, nMonths).map(function (n){
                var ini = startDate.advance(n,'month');
                var end = ini.advance(1,'month');
                return Evap.filterDate(ini,end)
                              .select(0).mean().rename('Monthly VWC 7-28cm')
                              .set('system:time_start', ini)
                              .clip(Region);
                }));

// Create a time-series with a trendline
var monthly_evap = ui.Chart.image.series({
  imageCollection: byMonth_Evap,
  region: geometry,
  reducer: ee.Reducer.mean(),
  scale: 5566,
   }).setOptions({
    title: 'Monthly Average Volumetric Water Content Colombia 7-28cm',
                                 hAxis: {
                                      title: '',
                                      format: 'Y',
                                      titleTextStyle: {italic: false, bold: true},
                                      gridlines: {color: 'FFF'},
                                      baselineColor: 'FFF'
                                        },
                                vAxis: {
                                      title: 'Volume/fraction(%)',
                                      titleTextStyle: {italic: false, bold: true},
                                      gridlines: {color: 'FFF'},
                                      baselineColor: 'FFF'
                                       },
                                colors: ['#3669D5'],
                                chartArea: {backgroundColor: ''},
                                  trendlines: {0: 
                                        {
                                    type: 'linear', 
                                    color: 'black', 
                                    lineWidth: 1,
                                    pointSize: 0,
                                    visibleInLegend: true,
                                    labelInLegend: 'Monthly VWC-L2 Trend'}
                                        },
                })
      .setChartType('ColumnChart');
print(monthly_evap);


////////////////////////////////////////////////////////////////////// Annual Evapotranspiration Average//////////////////////////////////////////////////////////////////

var Annual_Evap = ee.ImageCollection('ECMWF/ERA5_LAND/DAILY_AGGR')
                 .select(['volumetric_soil_water_layer_2'])

  var createAnnualImage = function(year) 
  {
  var startDate = ee.Date.fromYMD(year, 1, 1);
  var endDate = startDate.advance(1, 'year');
  var seasonFiltered = Annual_Evap.filter(ee.Filter.date(startDate, endDate));
  var total = seasonFiltered.reduce(ee.Reducer.mean()).rename('Annual VWC 7-28cm');
    return total.set({
                      'system:time_start': startDate.millis(),
                      'system:time_end': endDate.millis(),
                      'year': year,
                     });
  };

var years = ee.List.sequence(startYear,endYear);
var yearlyImages = years.map(createAnnualImage);
var yearlyCol_Evap = ee.ImageCollection.fromImages(yearlyImages);


// Create a time-series with a trendline
var annual_evap = ui.Chart.image.series({
  imageCollection: yearlyCol_Evap,
  region: geometry,
  reducer: ee.Reducer.mean(),
  scale: 5566,
   }).setOptions({
    title: 'Annual Average Volumetric Water Content Colombia 7-28cm',
                                 hAxis: {
                                      title: '',
                                      format: 'Y',
                                      titleTextStyle: {italic: false, bold: true},
                                      gridlines: {color: 'FFF'},
                                      baselineColor: 'FFF'
                                        },
                                vAxis: {
                                      title: 'Volume/fraction(%)',
                                      titleTextStyle: {italic: false, bold: true},
                                      gridlines: {color: 'FFF'},
                                      baselineColor: 'FFF'
                                       },
                                colors: ['#3669D5'],
                                chartArea: {backgroundColor: ''},
                                  trendlines: {0: 
                                        {
                                    type: 'linear', 
                                    color: 'black', 
                                    lineWidth: 1,
                                    pointSize: 0,
                                    visibleInLegend: true,
                                    labelInLegend: 'Annual VWC-L2 Trend'}
                                        },
                })
      .setChartType('ColumnChart');
print(annual_evap);

////////////////////////////////////////////////////////////////////// Create Animation and Timelapse //////////////////////////////////////////////////////////////////



var visParams = { min: 0, max: 1.0, palette: palettes.cmocean.Thermal[7]};

var annotations = [{position: 'right', offset: '5%', margin: '20%', property: 'label', scale: 5000}]


// 2. Load an ImageCollection
var byMonth_Evap_Tim = byMonth_Evap.filter(ee.Filter.date('2015-01-01T00:00:00', '2024-12-31T00:00:00'));

var collection_Evap = byMonth_Evap_Tim.map(function(img){
  var date = img.get('system:time_start');
  var date2 = ee.Date(date);
  return img.set('system_time_start', date2);
});

var series_Evap =  collection_Evap.map(function(image){
  var start = ee.Date(image.get('system:time_start'));
  var end = ee.Date(image.get('system:time_end'));
  var label = start.format('YYYY-MM-dd');
  
  return image.visualize({
      forceRgbOutput: false,
      bands: ['Monthly VWC 7-28cm'],
      min: 0, max: 1.0, palette: visParams.palette
  }).set({label: label}); 
});


series_Evap = series_Evap.map(function(image) {
  return text.annotateImage(image, {}, dateLocation, annotations) 
});

var rgbVis_Evap = series_Evap.map(function(img)
{
var scale = Map.getScale();

// Title
var label_title = 'VWC 7-28cm';
var title_text = text.draw(label_title, titleLocation, scale*0.8, {fontSize: 12});

// Text label
var textGradient = 'Volume in %';
var text_Gradient = text.draw(textGradient, gradientLabelLocation, scale*0.8, {fontSize: 10});

// Gradient Bar
var labels = ee.List.sequence(0, 1.0, 1.0);
var gradientBar = style.GradientBar.draw(gradientLocation, {
                                                            min: 0, max: 1.0,
                                                            palette: visParams.palette,
                                                            labels: labels,
                                                            text: {fontSize: 10}
                                                            }
                                        );


return img.blend(title_text)
          .blend(text_Gradient)
          .blend(gradientBar)
});  

var videoParams = {'region': geometry_col, 'framesPerSecond': 4, 'dimensions': 512, 'crs': 'EPSG:3857', 'format': 'gif'};

print(rgbVis_Evap.limit(180).getVideoThumbURL(videoParams));
print(ui.Thumbnail(rgbVis_Evap.limit(180), videoParams));


////////////////////////////////////////////////////////////////////////////// Set Style Images and Hillshade  ///////////////////////////////////////////////////////////////////////////////////////

var hand30_100 = ee.ImageCollection("users/gena/global-hand/hand-100")
var demALOS = ee.Image("JAXA/ALOS/AW3D30/V2_2")

demALOS = demALOS.select('AVE_DSM').clip(Region.geometry());

var paletteHand = ['grey', 'white'];

var vis = {min: -50.0, max: 3000.0, palette: paletteHand}

function hillshade(image) {
  var weight = 0.7
  var extrusion = 5
  var sunAzimuth = 315
  var sunElevation = 35
  var elevation = 45
  var contrast = 0.1
  var brightness = 0
  var saturation = 0.85
  var gamma = 0.1

  return utils.hillshadeRGB(image, demALOS, weight, extrusion, sunAzimuth, sunElevation, contrast, brightness, saturation, gamma)
}

////////////////////////////////////////////////////////////////////// Create and configure Split Panels //////////////////////////////////////////////////////////////////

// Get the first image of collection
var firstImage = byMonth_Evap_Tim.first();

// Get the latest image of collection
var sortedCollection = byMonth_Evap_Tim.sort('system:time_start', false);
var lastImage = sortedCollection.first();

// Create two maps

var map1 = ui.Map();
var map2 = ui.Map();

// Link and compare Maps

var linker = ui.Map.Linker([map1,map2]);

map1.addLayer(firstImage, visParams, 'firstImage');
map1.addLayer(hillshade(hand30_100.mosaic().visualize(vis)), {}, 'DEM Base Hillshade', true, 0.3)
map1.centerObject(geometry_col,6)
snazzy.addStyle(Cobalt,"Cobalt", map1);

map2.addLayer(lastImage, visParams, 'latestImage');
map2.addLayer(hillshade(hand30_100.mosaic().visualize(vis)), {}, 'DEM Base Hillshade', true, 0.3)
map2.centerObject(geometry_col,6)
snazzy.addStyle(MutedBlue,"Mutedblue", map2);

// Create a split panel

var splitPanel = ui.SplitPanel({
firstPanel: map1, 
secondPanel: map2,
orientation: 'horizontal',
wipe: true
});

// Display the split panel

ui.root.widgets().reset([splitPanel]);


