const Query = {
  groupByFields: (data, ...fields) => {
    const groups = {};
    data.foreach((d) => {
      const key = fields.map((f) => d[f]).join("|");
      if (!groups[key]) groups[key] = [];
      groups[key].push(d);
    });
    return groups;
  },
  sortOnField: (data, f, fn) => [...data].sort((r1, r2) => fn(r1[f], r2[f])),
  //TODO: make sure these aren't backwards
  byNumberAsc: (a, b) => b - a,
  byNumberDesc: (a, b) => a - b,
  byStringAsc: (a, b) => (a === b ? 0 : a < b ? -1 : 1),
  byStringDesc: (a, b) => (a === b ? 0 : a < b ? 1 : -1),
};

/*
 * Fill an HTML template. Template markers are backticks.
 */
function fillTemplate(templateId, data, target) {
  const source = document.getElementById(templateId).innerHTML;
  const entry = source.replace(
    /`([^`]*)`/g,
    (_, v) => data[v] ?? reportError(`Missing data: ${v}`)
  );
  const filled = document.createElement("template");
  filled.innerHTML = entry;
  const dest = document.querySelector(target);
  Array.from(filled.content.childNodes).forEach((n) => dest.appendChild(n));
}

/*
 * Report an error to the console (and eventually to analytics)
 */
function reportError(str) {
  console.error(str);
  return "??";
}
