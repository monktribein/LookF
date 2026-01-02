// Save a custom design and return the customDesignId (future-ready)
// Always use a full backend URL to avoid relative-path CORS issues.
// 1) If NEXT_PUBLIC_API_URL is set, use it.
// 2) Otherwise default to localhost:5000 (backend default).
let API_BASE = "http://localhost:5000";
if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) {
  API_BASE = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
}

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
  const res = await fetch(`${API_BASE}/api/custom-designs/${id}`);
  const data = await parseJsonSafe(res);
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || "Failed to fetch design");
  }
  return data?.data;
};

