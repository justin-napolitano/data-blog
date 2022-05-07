---
title: "Existing Carbon and Gas Storage Facilities"
date: "2022-05-06T12:30:32.169Z"
description: "Carbon and Gas Storage Facilities"
author: Justin napolitano
image: post-image.jpeg
imageAlt: Justin Napolitano
---

# Natural Gas Storage Facilities

## Data Import


```python
import pandas as pd
import matplotlib.pyplot as plt
import geopandas as gpd
import folium
import contextily as cx
import rtree
from zlib import crc32
import hashlib
from shapely.geometry import Point, LineString, Polygon
```

## Natural Gas Storage Facility Data


```python
## Importing our DataFrames

gisfilepath = "/Users/jnapolitano/Projects/data/energy/Natural_Gas_Storage_Facilities.geojson"

ng_storage_df = gpd.read_file(gisfilepath)

na = ng_storage_df.PROPMAX.min()
ng_storage_df.replace(na, 0 , inplace=True)

ng_storage_df = ng_storage_df.to_crs(epsg=3857)


ng_storage_df.describe()

```




<div style="overflow-x:auto;">
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>OBJECTID</th>
      <th>POPULATION</th>
      <th>LATITUDE</th>
      <th>LONGITUDE</th>
      <th>OWNERPCT</th>
      <th>MAXDEL</th>
      <th>WORKCAP</th>
      <th>BASEGAS</th>
      <th>TOTALCAP</th>
      <th>PROPMAX</th>
      <th>PROPWORK</th>
      <th>PROPTOTAL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>486.000000</td>
      <td>486.0</td>
      <td>486.000000</td>
      <td>486.000000</td>
      <td>486.000000</td>
      <td>4.860000e+02</td>
      <td>4.860000e+02</td>
      <td>4.860000e+02</td>
      <td>4.860000e+02</td>
      <td>486.0</td>
      <td>486.0</td>
      <td>486.0</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>243.500000</td>
      <td>0.0</td>
      <td>40.104496</td>
      <td>-90.940442</td>
      <td>94.232510</td>
      <td>1.014176e+06</td>
      <td>1.267850e+07</td>
      <td>8.983322e+06</td>
      <td>2.178277e+07</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>std</th>
      <td>140.440379</td>
      <td>0.0</td>
      <td>5.410305</td>
      <td>13.266648</td>
      <td>22.942722</td>
      <td>1.587148e+07</td>
      <td>2.116152e+07</td>
      <td>1.701687e+07</td>
      <td>3.496403e+07</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.000000</td>
      <td>0.0</td>
      <td>28.984463</td>
      <td>-151.273674</td>
      <td>0.000000</td>
      <td>0.000000e+00</td>
      <td>0.000000e+00</td>
      <td>0.000000e+00</td>
      <td>0.000000e+00</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>122.250000</td>
      <td>0.0</td>
      <td>37.670592</td>
      <td>-95.947958</td>
      <td>100.000000</td>
      <td>2.751325e+04</td>
      <td>1.451850e+06</td>
      <td>6.282835e+05</td>
      <td>2.765000e+06</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>243.500000</td>
      <td>0.0</td>
      <td>40.248852</td>
      <td>-87.046458</td>
      <td>100.000000</td>
      <td>1.000000e+05</td>
      <td>4.191552e+06</td>
      <td>2.983754e+06</td>
      <td>7.905500e+06</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>364.750000</td>
      <td>0.0</td>
      <td>42.699620</td>
      <td>-82.009671</td>
      <td>100.000000</td>
      <td>3.080000e+05</td>
      <td>1.374581e+07</td>
      <td>9.253025e+06</td>
      <td>2.427000e+07</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>max</th>
      <td>486.000000</td>
      <td>0.0</td>
      <td>61.263013</td>
      <td>-71.568969</td>
      <td>100.000000</td>
      <td>3.500000e+08</td>
      <td>1.698000e+08</td>
      <td>1.417339e+08</td>
      <td>2.872000e+08</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>



```{eval-rst}

.. index::
   single: Natural Gas Storage Facility Map

```

##  Natural Gas Storage Facility Map by Type


```python
ng_storage_map =ng_storage_df.explore(
    column="TYPE", # make choropleth based on "PORT_NAME" column
     popup=False, # show all values in popup (on click)
     tiles="Stamen Terrain", # use "CartoDB positron" tiles
     cmap='Reds', # use "Set1" matplotlib colormap
     #style_kwds=dict(color="black"),
     marker_kwds= dict(radius=6),
     tooltip=['NAICS_DESC','REGION', 'TYPE', 'OWNER', 'BASEGAS', 'TOTALCAP','PROPTOTAL', 'RESERVNAME' ],
     legend =True, # use black outline)
     categorical=True,
    )


ng_storage_map
```





