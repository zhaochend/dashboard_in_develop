import xarray as xr
import pandas as pd
import numpy as np
import os
import geopandas as gpd
import rio
import geojson
import rasterio
from rasterio.transform import from_origin

path = r'C:\Users\zhaoc\Documents\chen_research\NUS\Rice\data'
files = os.listdir(path)
files = [i for i in files if i.endswith('.nc')]

f = files[0]
os.chdir(path)
data = xr.open_dataset(f)

shp_path = r'C:\Users\zhaoc\Documents\chen_research\NUS\world_shp/SEApIndia.shp'
countries = gpd.read_file(shp_path)
data = data.rio.write_crs("EPSG:4326")
countries = countries.to_crs("EPSG:4326")
masked_data = data.rio.clip(countries.geometry, all_touched=True)

# Extract the data
longitude = masked_data['longitude'].values
latitude = masked_data['latitude'].values
z_values = masked_data['z'].values
cropland_area = masked_data['cropland_area'].values

# Create a list to hold all the features
features = []

# Iterate over the coordinates and data
for i, lat in enumerate(latitude):
    for j, lon in enumerate(longitude):
        for k, z in enumerate(z_values):
            value = cropland_area[k, i, j]
            if not np.isnan(value):
                # Create a GeoJSON feature for each non-NaN value
                feature = geojson.Feature(
                    geometry=geojson.Point((float(lon), float(lat))),
                    properties={"z": int(z), "cropland_area": float(value)}
                )
                features.append(feature)

# Create the FeatureCollection
feature_collection = geojson.FeatureCollection(features)

# Save to a GeoJSON file
with open("gaez.geojson", "w") as f:
    geojson.dump(feature_collection, f)

# to geotiff
for i, z in enumerate(z_values):
    # Create a transform using the coordinates
    transform = from_origin(longitude.min(), latitude.max(), 
                            abs(longitude[1] - longitude[0]), 
                            abs(latitude[1] - latitude[0]))

    # Open a new GeoTIFF file
    with rasterio.open(
        f'croparea_month{z}.tif',
        'w',
        driver='GTiff',
        height=cropland_area.shape[1],
        width=cropland_area.shape[2],
        count=1,
        dtype=cropland_area.dtype,
        crs='+proj=latlong',
        transform=transform,
    ) as dst:
        # Write the data for the current z level
        dst.write(cropland_area[i, :, :], 1)

# convert shapefile to geojson
country_geojson = countries.to_json()
geojson_path = r'C:\Users\zhaoc\Documents\chen_research\NUS\Rice\dashboard_github\dashboard_in_develop\dashboard\maps/'
with open(geojson_path+'SEApIndia.geojson', 'w') as f:
    f.write(country_geojson)