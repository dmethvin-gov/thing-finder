require("dotenv").config();
const {
  META_TITLE,
  META_URL,
  META_DESC,
  META_LANG,
  META_COLOR,
  META_EMAIL,
  META_TELEPHONE,
} = process.env;

module.exports = {
  title: META_TITLE || "Something Finder",
  url: META_URL || "",
  description: META_DESC || "A website for finding something.",
  lang: META_LANG || "en",
  primaryColor: META_COLOR || "#003399",
  email: META_EMAIL || undefined,
  telephone: META_TELEPHONE || undefined,
  dateFormat: "LLLL dd, yyyy",
};
