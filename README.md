# hwsc-org.github.io
webpage that contains app's documentations

# How to write a wiki page 
You can write wiki pages by creating a `md` file and using `markdown` language. 
This website is set up to use `GitHub Flavored Markdown`, meaning if you are famaliar 
with GitHub's markdown, then you are good to go. Otherwise, visit 
[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) website to
learn how to use markdown language.

<br>

---
<br>

## Create a service directory
Before you do this step, look under directory `wikis` to make sure the service 
you want to create a directory for, is not already created. Service directory
names should be similar to the actual service names.

If your service directory **does not exist**, then create a new directory named after 
your service under `wikis` directory:

![wikis directory ex](/images/readme/wikis-directory.png)

<br>

---
<br>

## Create a markdown file
To write a wiki page, create a new `.md` file in your service directory.

i.e.: To write a wiki page for `rules` for `frontend service`, 
you would go to `/wikis/frontend-svc/` and create a `rules.md` file:

![md file directory ex](/images/readme/md-file-directory.png)

<br>

### Define front matter block
The first thing in your newly created `md` file **must** be a front matter block.
Copy and paste snippet below, and the only thing you'll be changing is the `title`.

```yaml

---
layout: wiki
title: YourService > YourTitle
---

```

i.e.: To define the front matter for `rules.md` for `frontend service`:

```yaml

---
layout: wiki
title: Frontend > Rules
---

```

Without going in too much detail (and not necessary to understand), this block tells 
Jekyll to use `layout` defined in `/_layouts/wiki.html` and injects your 
`title` in an area defined in `wiki.html`.

<br>

### Set redirection path
This step **only** applies to newly created directories under `/wikis/`. 
**Skip this step** if service directory already existed prior to creating 
your new `md` file.

There are holes in our directory organization where users can manipulate the URL
to access pages like below :

![index directory page ex](/images/readme/index-directory-page.png)

The above is an example page if we hit the URL `hwsc-org.github.io/wikis/frontend-svc/`. 
To prevent user's from seeing this page, we can **redirect** the users to a default 
page for that directory.

This default page acts as the lead page or main page for that directory 
(you get to choose which `md` file is the default for the directory).

i.e.: If we choose `rules.md` as our `default` page for `frontend-svc` directory, then
in my `rules.md` file, we will define `redirect_from` (in exact format):

```yaml

---
layout: wiki
title: Frontend > Rules
redirect_from:
  - "/wikis/frontend-svc/"
---

```

This tells Jekyll to redirect `hwsc-org.github.io/wikis/frontend-svc/` to 
`hwsc-org.github.io/wikis/frontend-svc/rules.html` 

<br>

---
<br>

## Formatting markdown rules
In order for your `md` page to work nicely with the TOC (table of contents) setup, you 
will have to follow some formatting rules.

Here is an example TOC for file `vuex.md`:

![toc ex](/images/readme/toc-ex.png)

This TOC has only two header levels, `## H2` and `### H3`. And thus, it can **only** 
scan these two levels into our TOC. 

This means, any first level TOC, you **must** use `## H2`. And any first level TOC
**must** precede a second level TOC. And any second level TOC **must** use `### H3`.
Otherwise the TOC won't be formatted correctly.

Avoid using `# H1` because this header is reserved for `title` in our
front matter blocks in our `md` files.

<br>

---
<br>

## Link:Route your md file
Keep your route link names as short and concise as possible.

**Note 1:** when you state your `md` file, change the `md` extension to `html`, so that
Jekyll can parse the `md` files as `html` files.

**Note 2:** ES6 maps are ordered, so set each `key: value` pairs alphabetically.

**Note 3:** Test your links work.

<br>

### For existing service directory
If your service directory under `/wikis/` already existed, there will be an existing 
routeMap already declared in `/js/main.js`. You will only have to look up
your service routeMap and add your `key: value` to it. `key: value` maps to `<Name of link>: <route to file>`

i.e.: For the newly created `rules.md` file under `/wikis/frontend-svc/`, my `key:value` pair is 
`Rules: "/wikis/frontend-svc/rules.html"`. Notice that I converted my `md` to `html`
extension. This tells Jekyll to parse the `md` file as a `html` file.

In the example image below, a const variable `FRONT_SVC_PATH = "/wikis/frontend-svc/"` is declared.
So we use that as part of our paths, to avoid redundancy.

![toc ex](/images/readme/routes-ex.png)

<br>

### For NEW service directory
If you had to create a **new** service directory under `/wikis/`, then you will
have to declare some variables. Follow the examples naming convention for consistency.

<br>

#### Declare a constant variable
This constant variable should be the pathway to your service directory:

```
const NEWSERVICE_SVC_PATH = '/wikis/new-service-svc/';
```

i.e.: If we created a new service directory named `frontend-svc`, our constant variable would
look like:

```
const FRONT_SVC_PATH = '/wikis/frontend-svc/';
```
<br>

#### Declare and set a ES6 Map
This map contains an ordered `key: value` pairs of `link name to routes`:

```
const newSvcRoutes = new Map(Object.entries({
  Key: "value",
}));
```

i.e.: To set a link name and route to new file `rules.md` under `frontend-svc` directory
(using the `FONT_SVC_PATH` const):
```
const FRONT_SVC_PATH = '/wikis/frontend-svc/';
const frontSvcRoutes = new Map(Object.entries({
  Rules: `${FRONT_SVC_PATH}rules.html`,
}));
```
<br>

---
<br>

## Set up Jekyll Locally
You can edit and test files locally to view your changes. It has out of the box hot reloader on save. This will be helpful to see how your formatting is, that your TOC is set up correctly, and to test your links.

Follow the following steps:
- [ ] Follow [Requirements](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll#requirements) block to install `ruby` and `bundler`.
- [ ] `$ git clone https://github.com/hwsc-org/hwsc-org.github.io.git` or download this project on your computer
- [ ] Open cloned or downloaded project on your IDE
- [ ] You should be at root of this project
- [ ] Run `$ bundle install` in terminal to install Jekyll and other dependencies from the GitHub Pages gem
- [ ] Run `$ bundle exec jekyll serve` to run Jekyll site locally
