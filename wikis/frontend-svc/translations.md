---
layout: wiki
directory: frontend-svc
filename: translations.md
title: Frontend > Translations
---
## Translations
### Purpose
Internationalize our web application to reach out to non-speaking english users and
give users the choice of reading texts in their preferred language.

### Supported Languages
`en`: english, default

## Adding Translations
One file per language in JSON files. Default language is `English` and `en.json`
file is the template to refer to when translating to other languages.

### File Location
`hwsc-frontend > src > consts > translations > *.json`

### File Type
Create new JSON files for new languages using our `naming convention`

### Naming Convention
Name your JSON file according to `639-1` column referenced from the 
[List of ISO 639-1 Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

Examples:
1. For English: `en.json`
1. For Korean: `ko.json`

## Coding Guidelines
Always add new texts to `en.json`, then update other translation files.

### Using translation in Vue
To optimize load time and utilize caching, use 
[custom directive: v-t](https://kazupon.github.io/vue-i18n/guide/directive.html)

Avoid using `$t()` function.

### Translation Structure
Use nested objects to group our translations. 
Group them by 
[major components](/wikis/frontend-svc/translations.html#major-components) or by 
[global commons](/wikis/frontend-svc/translations.html#global-commons)

### Major Components
Below is a list of vue components that deserves to be grouped or nested in JSON object
1. Views
1. Navigation Menu

TODO, TBD

### Global Commons
Refers to grouped common translations that will be used more than a few times, i.e: `HWSC`
which is the name of our app, and is used in multiple web pages and part of other titles.

### Grouped Structure Example
In `en.json` (this example does not re-use translations, see 
[Referencing Other Translations](/wikis/frontend-svc/translations.html#referencing-other-translations)):

```json
{
    "main-view": {
        "title": "HWSC Database",
        "search-btn": "Search",
        "advanced-search-btn": "Advanced Search"
    },
    "advanced-search-view": {
        "title": "Advanced Search",
        "sub-title": "HWSC",
        "begin-search-btn": "Begin Search",
        "filter-dropdown": "Select a Filer"
    },
    .
    .
    .
}
```

`main-view` is the homepage where users can click `Search` or `Advanced Search` button.

`advanced-search-view` is the page when user clicks `Advanced Search` from `main-view`.

### Referencing other translations
Follow the sample below to re-use translations in other parts of the current file

In `en.json`:

```json
{
    "common": {
        "appname": "HWSC",
        "search": "Search"
    },
    "main-view": {
        "title": "@:common.appname Database",
        "btn-search": "@:common.search",
        "btn-advanced-search": "Advanced @:common.search"
    },
    "advanced-search-view": {
        "title": "Advanced @:common.search",
        "title-sub": "@:common.appname",
        "btn-begin-search": "Begin @:common.search",
        "dropdown-filter": "Select a Filer"
    },
    .
    .
    .    
}
```

## Resources
[Basic Vue i18n Tutorial (toward bottom of article)](https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-vue-app-with-vue-i18n)

[Official Vue i18n Tutorial](https://kazupon.github.io/vue-i18n/guide/formatting.html#named-formatting)
