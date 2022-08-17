# Generic Find-Something Site

This site provides a basic design for a site that calls an API to search for something.

## Setup

Prerequisites: NodeJS and npm

```sh
git clone git@github.com:YOURORG/YOURPROJECT.git
cd YOURPROJECT
npm install
```

To check that the installation was successful, use `npm run build`.

## Project organization

The site uses the [Eleventy](https://www.11ty.dev/) static site generator, plus the US Web Design System (USWDS 2.x) for styles. Its output is static HTML files and other assets such as images and CSS.

Most of the HTML source files use Nunjucks templates so that content can be modularized. This allows the project to have a common header and footer, for example, without duplicating them inside each static file. It also allows USWDS components to be defined and included in multiple files or locations within the same file.

Source files for styling are SASS files that USWDS compiles into standard CSS. It should be possible to copy examples on the USWDS site and include them into the project with minimal editing. The `base.njk` template file includes the USWDS styles and scripts that support its design components.

## Build tasks

These are the most common commands for working with the repo:

- `npm start` - Starts a dev server to "watch" and recompile when source files change. This reduces the wait time when editing files locally since you don't need to wait for a full build on each change. Also note that this server will _not_ detect when filters, shortcodes, or transforms are changed, you must manually restart when updating those.
- `npm run build` - Builds the static site files. The files go into the `dist` directory, and the files in that directory are the only ones pushed to the server in the deployment.

The `src/static` directory contains files that are copied to the `dist` directory as-is during the build process. These can be images, scripts, or other files that do not need processing.

## Internationalization

The build-time templating system supports multiple languages using the `xlate` shortcode. Strings for each language can be defined in one of two places, a `globalText.js` file or the front matter of the page or layout template. To improve the readability of the template files, you can use the English string as the default lookup code.

To build a version of the site for another language, set the `META_LANG` environment to the two-letter language code. This can be used for both watch (developer mode) and static build, for example:

```sh
META_LANG=es npm start
```

If an `xlate` string lookup fails, the console will show an error message during the build specifying the name of the missing key. _Note that the translation string is case sensitive!_ Here is an example of an error message:

```
----- XLATE ERROR: Language 'es', key 'Store Hours' -----
```

In this example, the template most likely used `{% xlate "Store Hours", translation %}` but there was no Spanish equivalent in the front matter `translation` key of the containing page, nor in the `globalText.js` file.

## Deployment

The site is hosted on [cloud.gov](https://cloud.gov). You will need a cloud.gov account and will need to be granded access to the project. Once you have access you can login and push the project.

To deploy use the command `npm run deploy-stage`. You will be prompted for a one-time password; the prompt gives you the URL to visit for the OTP.
