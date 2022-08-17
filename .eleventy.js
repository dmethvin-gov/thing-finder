const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const filters = require("./eleventy/filters.js");
const shortcodes = require("./eleventy/shortcodes.js");
const transforms = require("./eleventy/transforms.js");

require("dotenv").config();

module.exports = function (config) {
  // Configure nunjucks
  config.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
  });
  for (const [name, fn] of Object.entries(filters)) {
    config.addFilter(name, fn);
  }
  for (const [name, fn] of Object.entries(shortcodes)) {
    config.addShortcode(name, fn);
  }
  for (const [name, fn] of Object.entries(transforms)) {
    config.addTransform(name, fn);
  }

  // Markdown
  const mdlib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "anchor",
    permalinkSymbol: "#",
  });
  config.setLibrary("md", mdlib);

  // Layouts
  config.addLayoutAlias("base", "base.njk");

  // Pass-through files
  config.addPassthroughCopy({ "src/static": "." });

  // Deep-Merge
  config.setDataDeepMerge(true);

  // Base Config
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "includes",
      layouts: "layouts",
      data: "data",
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};
