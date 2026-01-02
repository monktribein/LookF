// Save a custom design and return the customDesignId (future-ready)
// NOTE: Must not call local dev hosts or run API calls during build/SSR.
const getApiBase = () => {
  const raw =
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_BASE_URL) ||
    "";
  const base = String(raw).trim().replace(/\/$/, "");
  if (!base) {
    throw new Error(
      "Missing NEXT_PUBLIC_API_BASE_URL. Please set it to your backend base URL."
    );
  }
  return base;
};

const parseJsonSafe = async (res) => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text || "Unexpected response from server");
  }
};

export const saveCustomDesign = async (payload = {}) => {
  const {
    productId,
    baseImage,
    selectedColor,
    selectedSize,
    customText,
    previewImage,
    userId,
  } = payload;

  const body = {
    productId,
    baseImage,
    selectedColor,
    selectedSize,
    customText,
    previewImage,
    userId,
  };

  const API_BASE = getApiBase();
  const res = await fetch(`${API_BASE}/api/custom-designs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok || !data?.success || !data?.customDesignId) {
    throw new Error(data?.message || "Failed to save design");
  }
  return data?.customDesignId;
};

export const fetchCustomDesign = async (id) => {
  const API_BASE = getApiBase();
  const res = await fetch(`${API_BASE}/api/custom-designs/${id}`);
  const data = await parseJsonSafe(res);
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || "Failed to fetch design");
  }
  return data?.data;
};

