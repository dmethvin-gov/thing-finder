const globalText = require("../src/data/globalText");
const lang = process.env.META_LANG || "en";

/*
 * xlate shortcode: Translate strings inside templates at build time
 *
 * Usage: {% xlate "English text", dictionary %}
 *
 * The `dictionary` is optional, it is normally defined in the file's
 * front matter. If omitted or if the string isn't found there, the
 * globalText.js file is searched for a match.
 *
 * If no match is found the build process generates an error message.
 */

module.exports = {
  xlate: function (key, dictionary) {
    const isCode = /^\*[A-Z]/.test(key);
    let lookup;
    if (lang !== "en" || isCode) {
      if (dictionary) {
        lookup = dictionary[key]?.[lang];
      }
      if (lookup === undefined) {
        lookup = globalText[key]?.[lang];
      }
    } else {
      lookup = key;
    }
    if (lookup === undefined) {
      console.error(
        `----- XLATE ERROR: Language '${lang}', key '${key}' -----`
      );
      if (dictionary === undefined) {
        console.log(
          "----- Using globalText only (did you forget a local dictionary?)"
        );
      } else {
        console.log("----- Using dictionary: ", JSON.stringify(dictionary));
      }
      // This will throw an error and stop the build
    }
    return lookup;
  },
};
