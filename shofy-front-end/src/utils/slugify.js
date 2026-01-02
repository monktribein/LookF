export const slugify = (value = "") => {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// Navbar dropdown category slug/title -> canonical slug mapping (used in URLs)
export const NAVBAR_CATEGORY_FOLDER_MAP = {
  // tshirts
  tshirts: "tshirts",
  "plain-t-shirts": "plain-tshirts",
  "plain-tshirts": "plain-tshirts",
  "printed-t-shirts": "printed-tshirts",
  "printed-tshirts": "printed-tshirts",
  "regular-fit-t-shirt": "regular-fit-t-shirt",
  "polo-t-shirts": "polo-tshirts",
  "polo-tshirts": "polo-tshirts",
  "full-sleeve-tshirts": "full-sleeve-tshirts",
  "full-sleeve-t-shirts": "full-sleeve-tshirts",
  "full-sleeve-t-shirt": "full-sleeve-tshirts",
  "oversized-tshirts": "oversized-tshirts",
  "oversized-t-shirts": "oversized-tshirts",
  "oversized-t-shirt": "oversized-tshirts",
  "over-sized-t-shirt": "oversized-tshirts",
  "over-sized-t-shirts": "oversized-tshirts",

  // shirts
  "formal-shirts": "formal-shirts",
  "casual-shirts": "casual-shirts",
  "checked-formal-shirts": "checked-formal-shirts",
  "floral-shirts": "floral-shirts",

  // bottom wear
  joggers: "joggers",
  cargos: "cargos",
  "cargo-jogger": "cargo-joggers",
  "cargo-joggers": "cargo-joggers",
  "cargo-pant": "cargo-pants",
  "cargo-pants": "cargo-pants",
  trousers: "trousers",
  jeans: "jeans",
  boxers: "boxers",
  shorts: "shorts",
};

export const resolveNavbarCategoryFolder = (slugOrTitle = "") => {
  const normalized = slugify(slugOrTitle);
  return NAVBAR_CATEGORY_FOLDER_MAP[normalized] || normalized;
};

// Canonical slug -> actual directory name under:
// /public/assets/Nav bar category/Men/{dirName}/
// Note: directory names in this project contain spaces and casing.
export const NAVBAR_CATEGORY_DIRNAME_MAP = {
  // tshirts
  tshirts: "T-shirt",
  "plain-tshirts": "T-shirt",
  "printed-tshirts": "T-shirt", // if you add a dedicated folder later, update this mapping
  "regular-fit-t-shirt": "regular fit t-shirt",
  "polo-tshirts": "Polo T-shirt",
  "full-sleeve-tshirts": "full sleeve t-shirt",
  "oversized-tshirts": "over sized t-shirt",

  // shirts
  "casual-shirts": "casual shirt",
  "checked-formal-shirts": "checked formal shirt",
  "floral-shirts": "Flora shirt",

  // bottom wear
  joggers: "cargo jogger", // if you add a dedicated "joggers" folder, update this mapping
  "cargo-jogger": "cargo jogger",
  "cargo-joggers": "cargo jogger",
  "cargo-pant": "cargo pant",
  "cargo-pants": "cargo pant",
  trousers: "trousers",
  jeans: "jeans",
  boxers: "boxer",
  shorts: "shorts",
};

export const resolveNavbarCategoryDirName = (canonicalSlug = "") => {
  const normalized = slugify(canonicalSlug);
  return NAVBAR_CATEGORY_DIRNAME_MAP[normalized] || "";
};

export const formatFromSlug = (slug = "") => {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

