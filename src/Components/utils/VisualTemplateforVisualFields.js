export const visualTemplate = {
  1: {
    name: "bus_bar",
    options: {
      1: "Coated",
      2: "Barred Conductor",
      3: "Sleeve",
      4: "NI",
      5: "NA",
    },
  },
  2: {
    name: "busbar_do_jumper",
    options: {
      1: "Coated",
      2: "Barred Conductor",
      3: "Sleeve",
      4: "NI",
      5: "NA",
    },
  },
  3: {
    name: "ug_cable_jumper",
    options: { 1: "Lug", 2: "Binding", 3: "NI", 4: "NA" },
  },
  4: {
    name: "tc_condition",
    options: { 1: "Straight", 2: "Tilted", 3: "Plinth", 4: "Pole structure" },
  },
  5: { name: "bird_guard", options: { 1: "Yes", 0: "No" } },
  6: {
    name: "do_tc_jumper",
    options: {
      1: "Coated",
      2: "Barred Conductor",
      3: "Sleeve",
      4: "NI",
      5: "NA",
    },
  },
  7: { name: "ht_booting", options: { 1: "Yes", 0: "No" } },
  8: { name: "lt_booting", options: { 1: "Yes", 0: "No" } },
  9: { name: "breather_installed", options: { 1: "Yes", 0: "No" } },
  10: {
    name: "silica_gel_color",
    options: { 1: "Blue", 2: "Orange", 3: "NI", 4: "NA" },
  },
  11: { name: "oil_leakage", options: { 1: "Yes", 0: "No" } },
  12: {
    name: "oil_level",
    options: { 1: "Normal", 2: "Low", 3: "NI", 4: "NA" },
  },
  13: { name: "tc_fencing", options: { 1: "Yes", 0: "No" } },
  14: { name: "fuse_box_external", options: { 1: "Closed", 2: "Open" } },
  15: { name: "fuse_box_internal_burn", options: { 1: "Yes", 0: "No" } },
  16: {
    name: "lt_cable_connection",
    options: { 1: "Lug", 2: "Patta", 3: "Binding", 4: "NI", 5: "NA" },
  },
};

export const compressVisualData = (formData) => {
  const compressed = {};


  const normalize = (val) => {
    const map = {
      "n/a": "N/A",
      na: "N/A",
      sleeve: "Sleeve",
      "barred conductor/sleeve": "Sleeve",
    };
    const key = (val || "").toString().trim().toLowerCase();
    return map[key] || val;
  };

  Object.entries(visualTemplate).forEach(([templateId, { name, options }]) => {
    const userValue = formData[name];

    if (userValue !== undefined) {
      const normalizedUserValue = normalize(userValue).toLowerCase();

      const matchedOption = Object.entries(options).find(
        ([_, val]) => normalize(val).toLowerCase() === normalizedUserValue
      );

      if (matchedOption) {
        compressed[templateId] = parseInt(matchedOption[0]);
      } else {
        console.warn(`⚠️ No match found for "${name}" → "${userValue}"`);
        alert(`⚠️ No match found for "${name}" → "${userValue}"`)
      }
    }
  });

  return compressed;
};
