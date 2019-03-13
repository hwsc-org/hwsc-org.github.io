---
layout: wiki
title: Frontend > Vuex
redirect_from:
  - "/wikis/frontend-svc/"
  - "/wikis/"
---
Refer: https://github.com/hwsc-org/hwsc-app-gateway-svc/issues/9#issuecomment-433744526

## States
Contains all states related to filters and methods that manipulate these states.

### filters
array of hardcoded strings
`hard coded`
@kimlisa
Used in a dropdown menu to display to users the type of filters that are available and can choose from.
Filter types:  publishers, call types,  ground types, regions, oceans, sensor, sample rates, geographic coordinate, date


### publishers
array of type Publisher
`retrieved from backend`
Used to generate a list of selectable, available publishers by their firstName and lastName. Sortable by `firstName` or `lastName`.
```
interface Publisher {
  firstName: string;
  lastName: string;
}
```

### callTypes
array of strings
`retrieved from backend`
Used to generate a list of selectable, available call types, i.e: Herd, Friend, Feed Point, Dependency Migration.

### groundTypes
array of strings
`retrieved from backend`
Used to generate a list of selectable ground types, i.e: Social Ground, Atlas, Breeding Migrating.

### regions: array of type Region
`retrieved from backend`
Used to generate a list of selectable, available regions.
```
interface Region {
  city: string;
  country: string;
}
```

### oceans
array of strings
`hard coded`
Used to generate a list of selectable oceans.

Oceans: Pacific, Atlantic, Indian, Southern, and Arctic.

### sensors
array of type Sensor
`retrieved from backend`
Used to generate a list of selectable, available sensor by their `tag` and `name`. Sortable by `tag` or `name`.
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
### SET_PUBLISHERS
```html
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
```

### SET_FILTERS
### SET_GROUND_TYPES
### SET_REGIONS
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

