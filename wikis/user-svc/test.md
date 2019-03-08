---
layout: wiki
title: wikiki
---
Refer: https://github.com/hwsc-org/hwsc-app-gateway-svc/issues/9#issuecomment-433744526

# Filter Store
Contains all states related to filters and methods that manipulate these states.


## States  
### filters: array of hardcoded strings
`hard coded`

Used in a dropdown menu to display to users the type of filters that are available and can choose from.

Filter types:  publishers, call types,  ground types, regions, oceans, sensor, sample rates, geographic coordinate, date

### publishers: array of type Publisher
`retrieved from backend`
Used to generate a list of selectable, available publishers by their firstName and lastName. Sortable by `firstName` or `lastName`.
```
interface Publisher {
  firstName: string;
  lastName: string;
}
```

```$xslt

```

### callTypes: array of strings
`retrieved from backend`
Used to generate a list of selectable, available call types, i.e: Herd, Friend, Feed Point, Dependency Migration.

### groundTypes: array of strings
`retrieved from backend`
Used to generate a list of selectable ground types, i.e: Social Ground, Atlas, Breeding Migrating.

### ---- [NEEDS MORE INFO] regions: array of strings || array of type Region
`retrieved from backend`
Used to generate a list of selectable, available regions.
```
interface Region {
  city: string;
  country: string;
}
```

### oceans: array of strings
`hard coded`
Used to generate a list of selectable oceans.

Oceans: Pacific, Atlantic, Indian, Southern, and Arctic.

### sensors: array of type Sensor
`retrieved from backend`
Used to generate a list of selectable, available sensor by their `tag` and `name`. Sortable by `tag` or `name`.
```
interface Sensor {
  tag: string;
  name: string;
}
```

## Getters



## Mutations
### SET_PUBLISHERS



## Actions
### Set actions should follow the same pattern below:
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