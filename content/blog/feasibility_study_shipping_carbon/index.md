---
title:  Feasibility of Shipping Carbon Across the Atlantic
date: "2022-05-08T14:40:32.169Z"
description: "Feasibility study of shipping carbon across the Atlantic."
author: Justin Napolitano
image: post-image.jpeg
imageAlt: Justin Napolitano
---

# Feasibility of Shipping Carbon Across the Atlantic


## Introduction

Yesterday I published a [Monte Carlo Simulation of shipping CO2 across the Atlantic from Europe to the United States](https://blog.jnapolitano.io/carbon-shipping-projections/).  I stated that the industry could be a 270 billion dollar annual industry. Upon reflection, I realized that this number seemed too high. In fact, that would equate to nearly 1 billion dollars in economic activity per day. 

In this report, I review the mean price of shipping CO2 in an attempt to understand the feasibility of this economic sector.  




## Methodology

Please review the my [previous post](https://blog.jnapolitano.io/carbon-shipping-projections/) which details design of my model.  

The major difference in this report is the sampling of the mean price per voyage.

## Findings

I posted the initial article without reviewing the mean shipping cost per voyage.  In review, I found that it would cost a billion dollars to ship CO2 per voyage on an average sized tanker ship.  This valuable cannot be reasonable. 

### Distance of Transport

The standard deviation in mean price per voyage was found to be less than 0.  This suggests that the distance of travel within Europe is marginal.  The major obstacle is crossing the Atlantic to access the Gulf of Mexico.  It is possible that an import/export port located in the Chesapeake, New England, Willmington, or Savannah could reduce the cost of navigating through the Caribbean to access Gulf based ports.  

This would present a secondary problem of piping the CO2 to the interior of the country to access the spent wells located in the Rust Belt.  

### Industrial Applications 

Another study must be completed to calculate value of super critical CO2 and other form factors to industrial applications in order to attempt to justify shipping CO2 across such large distances.  Frankly put, shipping such large quantities of CO2 to store it is most likely unreasonable.  

### Carbon Storage

I do not think based on this model that the US would be a suitable storage location for European CO2.  As mentioned previously, the only way to justify the cost would be to sell the CO2 to market for industrial applications.  


## Limitations of the Model

### Accounting for the Return Trip to Port
 
It is important to note that I did not account for the differential costs for the return trip to a European port.  If we were half the findings, it would still cost about 500 million USD to ship a full tanker to the United States.  This number seems unreasonably high.  Though, the cost of shipping per ton was fixed at .12 USD, the distance of travel elevates pricing.  To the point that I am worried about the validity of my model.  I need to review the shipping cost algorithm to ensure that I am generating valid results.  

### Cost to Transport

The cost to transport per 100 km is fixed at .12 USD as suggested by this [source](https://ieaghg.org/docs/General_Docs/Reports/PH4-30%20Ship%20Transport.pdf).  It accounts for the cost of liquification, shipping costs, and port fees.  The source however, was published in 2004.  The costs may have been reduced by technological advance and increased demand for CO2.

### Volumes of Transport

I simply converted the volumes of standard LNG ships to liquifed CO2.  There may be data available for tankers dedicated to carbon, but I was not aware of any when performing this analysis.  Tankers may also not completely dedicate their capacity to CO2.  Armed with a proper probability distribution, I could improve the model by randomly choosing volumes based on historical data.  

## Conclusion

It is unlikely that CO2 will be shipped to the United States simply for storage. A transatlantic trade may develop, but I would assume in order to meet demands for the industrial applications of super critical CO2.

## Mean Voyage Data Analysis


```python
mean_price_per_cycle_df.describe()
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
      <th>Voyage Cost in Billions USD</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>5.000000e+02</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>1.457033e+00</td>
    </tr>
    <tr>
      <th>std</th>
      <td>4.445340e-16</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.457033e+00</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>1.457033e+00</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>1.457033e+00</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>1.457033e+00</td>
    </tr>
    <tr>
      <th>max</th>
      <td>1.457033e+00</td>
    </tr>
  </tbody>
</table>
</div>



### Calculating the Confidence Interval For Mean Voyage

The data is nearly normal.  I could test for normality, but that would be beyond the scope of this analysis.  Also, by design the Monte Carlo model should produce a normal distribution with sufficient samples.  


```python

st.norm.interval(alpha=0.90, loc=np.mean(mean_price_per_cycle_df['Voyage Cost in Billions USD']), scale=st.sem(mean_price_per_cycle_df['Voyage Cost in Billions USD']))
```




    (1.4570329863646765, 1.4570329863646765)



It is safe to assume that 90 percent of the time we would see an annual cost 1.46 billion dollars USD with the assumptions of the model taken into account.  As the price per 100 km is fixed, the standard deviations is minimal.  The distances as well to port seem to be fairly consistent.  The cost of transport through Europe is minimal.

### Histogram of Mean Voyage Price Samples

The price does not deviate.  It is so concentrated in fact, that I worry that the model is not correctly randomizing European ports of origin.  If the model is operating correctly, then it is apparent that the Atlantic is the only barrier to trade.  Partners such as the UK, France, Portugal, The Netherlands, Spain, or any other nation relatively close to the United States are equally unlikely.  


```python
mean_price_per_cycle_df.plot.hist(grid=True, bins=20, rwidth=0.9,
                   color='#607c8e')
plt.title('Mean Price Distribution Per Voyage')
plt.xlabel('Mean Voyage Price in Billions USD')
plt.ylabel('Frequency')
plt.grid(axis='y', alpha=0.75)
```


    
![png](feasability_of_shipping_carbon_files/feasability_of_shipping_carbon_8_0.png)
    


## Annual Data Analysis

This is a reprint of the findings from [my previous report](https://blog.jnapolitano.io/carbon-shipping-projections/)


```python
annual_price_samples_df.describe()
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
      <th>usd_billions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>500.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>273.281259</td>
    </tr>
    <tr>
      <th>std</th>
      <td>5.468424</td>
    </tr>
    <tr>
      <th>min</th>
      <td>257.417260</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>269.584137</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>273.498084</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>277.353518</td>
    </tr>
    <tr>
      <th>max</th>
      <td>291.351511</td>
    </tr>
  </tbody>
</table>
</div>



## Calculating the Confidence Interval

The data is nearly normal.  I could test for normality, but that would be beyond the scope of this analysis.  Also, by design the Monte Carlo model should produce a normal distribution with sufficient samples.  


```python

st.norm.interval(alpha=0.90, loc=np.mean(annual_price_samples_df['usd_billions']), scale=st.sem(annual_price_samples_df['usd_billions']))
```




    (272.87900122752995, 273.68351670240344)



It is safe to assume that 90 percent of the time we would see an annual cost of 272.88 to 273.68 billion dollars USD with the assumptions of the model taken into account.  

### Monte Carlo Histogram


```python
annual_price_samples_df.plot.hist(grid=True, bins=20, rwidth=0.9,
                   color='#607c8e')
plt.title('Annual Price Distribution for Shipping Carbon')
plt.xlabel('Annual Price in Billions USD')
plt.ylabel('Frequency')
plt.grid(axis='y', alpha=0.75)
```


    
![png](feasability_of_shipping_carbon_files/feasability_of_shipping_carbon_15_0.png)
    


## Data Imports and Manipulation

### The Shipping Dataframe

The shipping dataframe is the basis of the simulation.  It is used to tabulate total cost and to record the values of variables.

#### Capacity Distribution and Number of Ships Calculation


```python
# Capacity range
# 40,000 m3 71,500 to 210,000

#Susanna Dorigoni, Luigi Mazzei, Federico Pontoni, and Antonio Sileo
#IEFE – Centre for Research on Energy and Environmental Economics and Policy,
#Università Bocconi, Milan, Italy

# I'm sure a better report is available but this is a start
# cubic meters unit

### a rough estimate of global suplly dedicated to co2 shipping

# I will probably need a better metric but this is a good start that can be modified later when necessary

ships = int(63*.25)
ships


conversion_factor = 2.21/2.65
conversion_factor

lower_bound = int(40000 * conversion_factor)
upper_bound = int(210000 * conversion_factor)

median = 137564 * conversion_factor
standard_dev = 6.63 * conversion_factor  #file:///Users/jnapolitano/Downloads/LNG_Shipping_a_Descriptive_Analysis.pdf

cap_range = range(lower_bound, upper_bound)

cap_distribution = np.random.normal(loc=median , scale=standard_dev, size=ships)


```

#### The Shipping Df


```python
shipping_df = pd.DataFrame(cap_distribution, columns=['co2_capacity_cubic_meters'])
shipping_df['days_to_port'] = 0
shipping_df['europe_port'] = ''
shipping_df["us_port"] =''
shipping_df['distance'] =''
shipping_df['price'] = 0
shipping_df['cost_per_day'] = 0
shipping_df['co2_capacity_tonnes'] = shipping_df['co2_capacity_cubic_meters']/544.66 ## Verify this factor.  It seems to high
shipping_df
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
      <th>co2_capacity_cubic_meters</th>
      <th>days_to_port</th>
      <th>europe_port</th>
      <th>us_port</th>
      <th>distance</th>
      <th>price</th>
      <th>cost_per_day</th>
      <th>co2_capacity_tonnes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>114721.472752</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.629517</td>
    </tr>
    <tr>
      <th>1</th>
      <td>114729.654368</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.644539</td>
    </tr>
    <tr>
      <th>2</th>
      <td>114728.465767</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.642356</td>
    </tr>
    <tr>
      <th>3</th>
      <td>114727.124642</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.639894</td>
    </tr>
    <tr>
      <th>4</th>
      <td>114728.082194</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.641652</td>
    </tr>
    <tr>
      <th>5</th>
      <td>114713.566506</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.615001</td>
    </tr>
    <tr>
      <th>6</th>
      <td>114720.269709</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.627308</td>
    </tr>
    <tr>
      <th>7</th>
      <td>114714.918350</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.617483</td>
    </tr>
    <tr>
      <th>8</th>
      <td>114731.984989</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.648818</td>
    </tr>
    <tr>
      <th>9</th>
      <td>114722.804903</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.631963</td>
    </tr>
    <tr>
      <th>10</th>
      <td>114713.641452</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.615139</td>
    </tr>
    <tr>
      <th>11</th>
      <td>114726.862877</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.639413</td>
    </tr>
    <tr>
      <th>12</th>
      <td>114729.870299</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.644935</td>
    </tr>
    <tr>
      <th>13</th>
      <td>114735.366180</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.655025</td>
    </tr>
    <tr>
      <th>14</th>
      <td>114733.863624</td>
      <td>0</td>
      <td></td>
      <td></td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>210.652267</td>
    </tr>
  </tbody>
</table>
</div>



### The European Ports Df


```python

gisfilepath = "/Users/jnapolitano/Projects/data/energy/PORT_2013_SH/Data/PORT_PT_2013.shp"


ports_df = gpd.read_file(gisfilepath)

ports_df = ports_df.to_crs(epsg=3857)
```

### Filtered Wells DataFrame


```python
## Importing our DataFrames

gisfilepath = "/Users/jnapolitano/Projects/data/energy/filtered-wells.geojson"


filtered_df = gpd.read_file(gisfilepath)

filtered_df = filtered_df.to_crs(epsg=3857)


```

#### Getting Map Conditions for Us Port Filtering



```python
map_conditions = filtered_df.TERMID.unique().tolist()
```

### US Ports Dataframes


```python
## Importing our DataFrames

gisfilepath = "/Users/jnapolitano/Projects/data/energy/Liquified_Natural_Gas_Import_Exports_and_Terminals.geojson"


terminal_df = gpd.read_file(gisfilepath)

terminal_df = terminal_df.to_crs(epsg=3857)


```


```python
terminal_df.drop(terminal_df[terminal_df['STATUS'] == 'SUSPENDED'].index, inplace = True)
terminal_df.rename(columns={"NAME": "TERMINAL_NAME"})
terminal_df['TERMINAL_GEO'] = terminal_df['geometry'].copy()

```


```python
port_terminals_df = terminal_df.query('TERMID in @map_conditions').copy()
port_terminals_df['co2_capacity_mmta'] = port_terminals_df['CURRENTCAP'] * conversion_factor
port_terminals_df['co2_capacity_metric_tons'] = port_terminals_df['co2_capacity_mmta'] * 1000000
port_terminals_df['available'] = True
```

## Random Distribution, Distance and Pricing Functions 

### Accounting for Random Days at Sea

As days at sea is variable I created a range between 20 and 40 days to account for a round trip to every major port in Europe.  


```python

def random_day():
    lower_bound = 20
    upper_bound = 40

    median = 30
    standard_dev = 2

    days_range = range(lower_bound, upper_bound)

    days_distribution = np.random.normal(loc=median , scale=standard_dev, size=ships)


    days_randomized = np.random.choice(days_distribution, size=1)


    return (days_randomized[0].astype(np.int64))

```

### Accounting for Random European Ports

 I randomized the port selection process with the following function.  The data provided by EuroStat did not filter according to type of port.  Nonetheless, the distance recorded should be very similiar to those of actual LNG ports.  A better data set could be substituded directly into the function.


```python

def random_europe_port():
    #select a random number along the index of the ports df.  Return the value of hte geometry at the index.  
    #select indices from the dataframe that are valid.  ie capacity has not yet been met.  
    ports_randomized = np.random.choice(ports_df.index, size=1)
    index_location = ports_randomized[0]
    return ports_df.geometry[index_location]

```

### Accounting for Random US Ports

I was able to filter import/export ports in the United States in to a dataset of about 15.  Like the European dataset, I randomized selection.


```python

def random_us_port():
    #select a random number along the index of the ports df.  Return the value of hte geometry at the index.  

    ports_randomized = np.random.choice(port_terminals_df.index, size=1)
    index_location = ports_randomized[0]
    return port_terminals_df.geometry[index_location]

```

### Calculating Distance Between Ports

I calculated the shortest distance between ports based on their geographic locations with the shapley.distance function.  It returns distance in meters.  I divide by 1000 to convert into Km.   The algorithm could be improved by using official shipping data to randomize a distribution of distances between ports.  Unfortunately, I do not have that data available to me. 


```python

def geo_distance(dist1,dist2):
    # return distance in km
    distance = dist1.distance(dist2)*1000
    return(distance)

    

```

#### Calculating Price of Transport


The cost of transport accounts for port fees, liquification, and transport.   Unfortunately, my data is from a paper published in 2004.  I would like to find a more recent paper.   I did not convert the value of 2004 USD to 2022 because I am not sure of the validity of the conversion factors available online.  I would need a better source to correctly model the true cost of transport.  

[source](https://ieaghg.org/docs/General_Docs/Reports/PH4-30%20Ship%20Transport.pdf)


```python

def price_to_transport(distance):
    price = (distance/100) * 12
    return price

```

### Calculating Cost Per Day


```python
def cost_per_day(price,distance):
    return price/distance
```

## Costs Per Annum Algorithm

The algorithm I used calculates the daily status of ships transporting CO2 across the Atlantic from a random European port to a random port in the United States.  It will run for 365 iterations or until the total carbon capacity of the US ports is reached.  This value could and probably should be dynamically allocated via a similiar algorithm, but I do not yet have historical probability distributions of carbon imports to determime a valid price allocation function.  

When the daily counter reaches zero for a tanker:
* The capacity is refilled to full.
* A random us port is assigned.
* A random European port is assigned.
* The distance between ports is calculated.
* The cost of transport over that distance is calculated per 100 km.
* The total shipping price of that cycle is tabulated.
* The total tonnage of that cycle is tabulated.
* The mean price per voyage is tabulated





```python

days = 365
day_counter = 0 
carbon_total_millions_metric_tons = 300000000
total_tons_shipped = 0
total_price = 0
cycle_mean_price_samples = np.zeros(shape=days)

#deduction = capacity of empty ships
for day in range(days):
    if carbon_total_millions_metric_tons >= 0:
        # must use apply to account for multiple 0 conditions.  If i simply vectorized the function across the dataframe in a single call i would assign the the same values each day 
        shipping_df['days_to_port'] = shipping_df['days_to_port'] - 1
        shipping_df['us_port'] = shipping_df.apply(lambda x:  random_us_port() if x['days_to_port']<=0 else x['us_port'], axis=1)
        shipping_df['europe_port'] = shipping_df.apply(lambda x:  random_europe_port() if x['days_to_port']<=0 else x['europe_port'], axis=1)
        shipping_df['distance'] = shipping_df.apply(lambda x:  geo_distance(x['us_port'], x['europe_port']) if x['days_to_port']<=0 else x['distance'], axis=1)
        shipping_df['price'] = shipping_df.apply(lambda x:  price_to_transport(x['distance']) if x['days_to_port']<=0 else x['price'], axis=1)
        #calculate cost per day for fun...
        # query all that are = o.  Summate the capacities deduct the total 
        tmp_df=shipping_df.loc[shipping_df['days_to_port'] <= 0]
        sum_of_capacity = tmp_df['co2_capacity_tonnes'].sum()
        sum_of_price = tmp_df['price'].sum()
        mean_of_price = tmp_df['price'].mean()
        cycle_mean_price_samples[day] = mean_of_price
        shipping_df['days_to_port'] = shipping_df['days_to_port'].apply(lambda x: random_day() if x<=0 else x)
        total_tons_shipped = total_tons_shipped + sum_of_capacity
        total_price = total_price + sum_of_price
        carbon_total_millions_metric_tons = carbon_total_millions_metric_tons - sum_of_capacity
        #print(carbon_total_millions_metric_tons)
        day_counter = day_counter+1
    else: 
        break

    
    
print(day_counter)
print(total_tons_shipped)
print(total_price)
#Drop the nan, ie empty samples
cycle_mean_price = cycle_mean_price_samples[np.logical_not(np.isnan(cycle_mean_price_samples))]
#Calculate mean price of filling a ship (around a billion according to the data i have if filled to capacity.  Ridiculous.)
cycle_mean_price = cycle_mean_price.mean()
print(cycle_mean_price)

```

    365
    40863.449618275925
    285070693392.5522
    1457032986.364676


## Monte Carlo Simulation with 500 iterations

The annual rate of shipping can be variable according to shifting dynamics. I account for that by modeling the per annum algorithm 500 times.  Modeling would improve as n increases, but for the sake of time I limited the computation to 500 iterations

The only difference between this algorithm and the previous one is an extra for loop.  The algorithmic efficiency is surprisingly good as the I was able to vectorize tabulations with lambda functions across the dataframes.  On my laptop, I was able to complete the algorithm in about 16 minutes of run time.




```python

nsamples = 500
price_samples = np.zeros(shape=nsamples)
cycle_mean_price_annual_samples = np.zeros(shape=nsamples)

for sample in range(nsamples):

    days = 365
    day_counter = 0 
    carbon_total_millions_metric_tons = 300000000 # could randomize.  Need a probability distribution based on historial data. 
    total_tons_shipped = 0
    total_price = 0
    cycle_mean_price_daily_samples = np.zeros(shape=days)


    #deduction = capacity of empty ships
    for day in range(days):
        if carbon_total_millions_metric_tons >= 0:
            # must use apply to account for multiple 0 conditions.  If i simply vectorized the function across the dataframe in a single call i would assign the the same values each day 
            shipping_df['days_to_port'] = shipping_df['days_to_port'] - 1
            shipping_df['us_port'] = shipping_df.apply(lambda x:  random_us_port() if x['days_to_port']<=0 else x['us_port'], axis=1)
            shipping_df['europe_port'] = shipping_df.apply(lambda x:  random_europe_port() if x['days_to_port']<=0 else x['europe_port'], axis=1)
            shipping_df['distance'] = shipping_df.apply(lambda x:  geo_distance(x['us_port'], x['europe_port']) if x['days_to_port']<=0 else x['distance'], axis=1)
            shipping_df['price'] = shipping_df.apply(lambda x:  price_to_transport(x['distance']) if x['days_to_port']<=0 else x['price'], axis=1)
            # query all that are = o.  Summate the capacities deduct the total 
            tmp_df=shipping_df.loc[shipping_df['days_to_port'] == 0]
            sum_of_capacity = tmp_df['co2_capacity_tonnes'].sum()
            sum_of_price = tmp_df['price'].sum()
            mean_of_price = tmp_df['price'].mean()
            cycle_mean_price_daily_samples[day] = mean_of_price
            shipping_df['days_to_port'] = shipping_df['days_to_port'].apply(lambda x: random_day() if x<=0 else x)
            total_tons_shipped = total_tons_shipped + sum_of_capacity
            total_price = total_price + sum_of_price
            carbon_total_millions_metric_tons = carbon_total_millions_metric_tons - sum_of_capacity
            #print(carbon_total_millions_metric_tons)
            day_counter = day_counter+1
        else: 
            break

    #Drop the nan, ie empty samples
    cycle_mean_price = cycle_mean_price_samples[np.logical_not(np.isnan(cycle_mean_price_samples))]
    #Calculate mean price of filling a ship (around a billion according to the data i have if filled to capacity.  Ridiculous.)
    cycle_mean_price = cycle_mean_price.mean()
    cycle_mean_price_annual_samples[sample] =cycle_mean_price
        
    

    price_samples[sample] = total_price

        

```

### Creating the Annual Price Samples DF


```python
annual_price_samples_df = pd.DataFrame(price_samples, columns=['cost_in_usd'])
```


```python
annual_price_samples_df['usd_billions'] = annual_price_samples_df.cost_in_usd / 1000000000
annual_price_samples_df.drop(columns=['cost_in_usd'], inplace=True)
```

### Creating the Mean Price Per Round Trip Df


```python
mean_price_per_cycle_df = pd.DataFrame(cycle_mean_price_annual_samples, columns=['Voyage Cost in Billions USD'])
mean_price_per_cycle_df['Voyage Cost in Billions USD'] = mean_price_per_cycle_df['Voyage Cost in Billions USD'] / 1000000000

```

## Imports


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
import numpy as np
from scipy.spatial import cKDTree
import scipy.stats as st
from shapely.geometry import Point
from haversine import Unit
from geopy.distance import distance

import warnings

warnings.filterwarnings('ignore')

```
