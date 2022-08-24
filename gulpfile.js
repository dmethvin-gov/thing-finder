/* Build instructions for USWDS 3.0 */

const uswds = require("@uswds/compile");

uswds.settings.version = 3;
uswds.compile.browserslist = ["> 1%", "last 2 versions", "not IE"];

uswds.paths.dist.theme = "./src/sass";

// Where to put the compiled css file
uswds.paths.dist.css = "./dist/uswds";

// Eleventy copies these to the ./dist dir for us
// uswds.paths.dist.js = "./src/static/uswds/js";
// uswds.paths.dist.img = "./src/static/uswds/img";
// uswds.paths.dist.fonts = "./src/static/uswds/fonts";

// Expose all uswds-compile functions
// https://designsystem.digital.gov/documentation/getting-started/developers/phase-two-compile/
for (const [key, fn] of Object.entries(uswds)) {
  if (typeof fn === "function") exports[key] = fn;
}

// Disable compile functions that do the wrong thing in our project
exports.init = exports.copyAssets = () => {
  console.log(
    `****
    File copy functionality is handled by Eleventy, see the .eleventy.js file for details.
    ****`
  );
};
