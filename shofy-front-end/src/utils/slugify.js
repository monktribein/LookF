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

export const formatFromSlug = (slug = "") => {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

