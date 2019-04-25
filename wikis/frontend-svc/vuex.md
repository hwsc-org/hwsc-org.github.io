---
layout: wiki
directory: frontend-svc
filename: vuex.md
title: Frontend > Vuex
---
Refer: https://github.com/hwsc-org/hwsc-app-gateway-svc/issues/9#issuecomment-433744526

## States
Contains all states related to filters content.

### filters
**array of strings** `hardcoded`

Used in a drop-down menu to display to users the type of filters that
can be applied.

`Available filter types`: publishers, call types, ground types, regions,
oceans, sensor, sample rates, geographic coordinate, date


### publishers
**array of type Publisher** `retrieved from backend`

Used to generate a list of selectable publishers by their
firstName and lastName. Sortable by `firstName` or `lastName`.

```ts
interface Publisher {
  firstName: string;
  lastName: string;
}
```

### callTypes
**array of strings** `retrieved from backend`

Used to generate a list of selectable call types.

i.e: Herd, Friend, Feed Point, Dependency Migration.

### groundTypes
**array of strings** `retrieved from backend`

Used to generate a list of selectable ground types.

i.e: Social Ground, Atlas, Breeding Migrating.

### regions
**array of type Region** `retrieved from backend`

Used to generate a list of selectable regions.

```ts
interface Region {
  city: string;
  country: string;
}
```

### oceans
**array of strings** `hard coded`

Used to generate a list of selectable oceans.

`Oceans`: Pacific, Atlantic, Indian, Southern, and Arctic.

### sensors
**array of type Sensor** `retrieved from backend`

Used to generate a list of selectable sensors by their `tag` and `name`.
Sortable by `tag` or `name`.

```
interface Sensor {
  tag: string;
  name: string;
}
```

## Getters
### getFilters
### getPublishers
### getGroundTypes
### getRegions
### getOceans
### getSensors


## Mutations
### SET_FILTERS
Sets state.filters to payload

Payload is a list of

### SET_PUBLISHERS
Sets state.publishers to payload

### SET_GROUND_TYPES
Sets state.groundTypes to payload

### SET_REGIONS
Sets state.regions to payload

### SET_OCEANS
### SET_SENSORS

## Actions
#### Set actions should follow the same pattern below:
- if state `some state` is not set
  - set loading to true (display a loader somewhere)
  - request to backend `for whatever you need`.
  - when receiving response, set loading to false (remove the loader)
  - if request success:
    - commit a mutation to set state `some state`
  - else:
    - depending on error code: 
      - redirect to the proper error page or
      - if a modal pop up, close it, and show a modal error and allow user to click OK and remain on page

#### Sets
- setPublishers
- setCallTypes
- setGroundTypes
- setRegions
- setSensors


##### 5 hashes
###### 6 hashes

> some block quote<br>
> so i can get css

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

