// Classification Script for Antananarivo (Tana), Madagascar
// Highlights coexistence of urban dwellings, distributed water network, rice farming, agroforesty, and deforested hillsides. 
// Modified from Urban Classified script by Monja Sebela: https://custom-scripts.sentinel-hub.com/sentinel-2/urban_classified/


var NDWI=index(B03,B08); // Water index to highlight lakes, streams, and canals
var NDVI=index(B08, B04); // Vegetation index to highlight rice farming and agroforestry
var BareSoil=2.5 *((B11 + B04)-(B08 + B02))/((B11 + B04)+(B08 + B02)); // Bare soil to highlight widespread deforestation

// Water display
// Original script was written for more arid environments so the NDWI threshold has been lowered here to capture streams and canals in Tana
if (NDWI > 0.01) {
 return [0, 0.5, 1]
}

// Buildings
// Distinguishes bare soil from urban dwellings, many of which are constructed from clay and other locally sourced materials
if((B11>0.8)||(NDVI<0.1)){
  return[.9,.5,0.3]
}
// Vegetated areas
// Important distinguisher between rice paddy agriculture and agroforesty of primarily eucalyptus trees 
// The NDVI coefficient increased here to highlight differences in rice agriculture and agroforestry
if (NDVI>0.2){
  return [0, 1.1*NDVI, 0]
}

// Bare soil
// Highlight remaining areas where rampant deforestation has eliminated all primary forest
else {
 return [BareSoil, 0.2, 0]
}