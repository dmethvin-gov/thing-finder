/* Build instructions for USWDS 3.0 */

const uswds = require("@uswds/compile");

uswds.settings.version = 3;
uswds.compile.browserslist = ["> 1%", "last 2 versions", "not IE"];

uswds.paths.dist.theme = "./src/sass";

// Eleventy copies these to the ./dist dir for us
uswds.paths.dist.css = "./src/static/uswds";
uswds.paths.dist.js = "./src/static/uswds/js";
uswds.paths.dist.img = "./src/static/uswds/img";
uswds.paths.dist.fonts = "./src/static/uswds/fonts";

// Expose all uswds-compile functions
// https://designsystem.digital.gov/documentation/getting-started/developers/phase-two-compile/
for (const [key, fn] of Object.entries(uswds)) {
  if (typeof fn === "function") exports[key] = fn;
}
