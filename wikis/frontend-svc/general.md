---
layout: wiki
directory: frontend-svc
filename: general.md
title: Frontend > General
redirect_from:
  - "/wikis/frontend-svc/"
---
## General 
### Rules and Guidelines
- Do **NOT** style using the `id`.
    - `id`s have a higher specificity than classes or elements and as such behave unpredictably
- If you're styling an element such as `div` or `span`, use a CSS class instead of just targeting `div`/`span` in the CSS file. 
  - If  I see some code that's styling a `div` that's a child of `nav` that's a direct child of `ul` that's a direct child of `some-component`, 
  I have much less of an idea of what's going on than if I see something like `parent-component.help-link { color: $grey; etc }`.
- Use dash-case for class names.
- Avoid using :nth-of-type, or multiple html tag selectors in a row. Instead we prefer apply multiple classes. 
   - Example of multiple tag selectors below: 
    ```css
    section div p span i { 
        margin: 10px
    }
    ```
    
- Keep as 'Immutable' as possible! i.e: Do **NOT** overwrite styles with the same name to have different functionality.
- **DO NOT NEST ANY DEEPER THAN 3 LEVELS!**
- Only use the `@import` command to import files that set variables. 
- If you `@import` a partial which generates styles, and the partial is called or imported elsewhere, the generated CSS will contain duplicate styles. 
Only use `@import` on 'safe' partials which generate and set variables for use elsewhere, but don't produce any CSS. 
Then, the files which call `@import` on these 'safe' partials can use these common variables to generate styles as needed. 
- Whenever a new feature is added to the frontend, make a good faith effort to pay attention to these things:
    - Are all new clickable/interactive items also accessible to a keyboard?
    - If an item is interactive, does it have hover and focus behaviour?
    - If color is removed from the page, is all essential information still present? 
        - talking about color blind accessibility
        
- Split up classes via 'separation of concerns'.
    - Layout
    - Style
    - Functionality
    
### Separation of Concerns Guideline
Must **READ** [link](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)

### Localization Guide
Strings should be declared constants and associated with a language i.e: All English strings are grouped together.

### Capitalization Guide

#### Links and Buttons

When referring to specific links or buttons in the application, use the casing in the specific link or button. 

Example text: 

- Click the "Add to Library" button
- Go to Saved Searches and click the "+" button. 

**Exception** : if the link in question is in ALL CAPS, do not refer to it with ALL CAPS. Instead use title case. This capitalization is intended for use in headers and should not be used in general copy. 

#### Domain Objects in General Discourse

Examples of a domain object: markers, users, charts, dashboards, reports. 

Do not capitalize domain objects unless 

1. You are referring to a specific link or button in the application
2. The text you are writing is in title case
3. Other English capitalization rules apply, such as the domain object beginning a sentence. 

### When to use title case vs sentence case

#### Examples of title case:

- Upload File
- Create Document

#### Example of sentence case: 

- Are you sure you want to delete these 2 saved searches?

Generally, use title case for short, terse phrases in titles, tooltips, navigation elements, etc. 

If the text you are using is longer than 3-5 words, strongly consider using sentence case instead.

## Maintain Visual Consistency
- If copying a considerable amount of CSS from another place, consider extracting them to `_todo.scss` or 
  putting a comment on your new code so they can be modified together in the future.
    
- Never new colors to the console, ONLY use the colors available in `_todo.scss`
- Always look for pre-existing styles for UI elements. Majority of the time, what you want already exists somewhere. 

### Finding Classes
- Inspect element of the thing you want to copy (You may need to go a couple elements above, since the class could be on the parent). Then search for those class names in your editor.

## How To Review CSS
 - Check for:
    - Separation of concerns
    - Too much nesting
    - Immutability 
    - Lack of variable usage (randomly adding new colors/font sizes)
    - Lack of GOOD names   
    - See an explicit `0` getting set, like `padding: 0`? This is likely overwriting something... which we want to avoid as much as possible.

## Screen Readers
Need to make sure things have the right `aria` attributes that let screen readers know how they should be used, and also have keyboard accessibility. 
We can get a lot of mileage out of using default controls, but sometimes we can't. (the accordion behaviour on the search page table, modals...)

## Resources
- [CSS separation of concerns](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)
- [How to Center EVERYTHING](https://css-tricks.com/centering-css-complete-guide/)
- [Flexbox 101](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Grid 101](https://css-tricks.com/snippets/css/complete-guide-grid/)
