"use client";

import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { add_cart_product } from "@/redux/features/cartSlice";
import { saveCustomDesign } from "@/utils/customDesignApi";
import { notifyError, notifySuccess } from "@/utils/toast";

const DUMMY_PRODUCT_ID = "000000000000000000000000";
const BASE_PRICE = 0;

const popularImages = [
  "/assets/Popular/img%201.jpg",
  "/assets/Popular/img%202.jpg",
  "/assets/Popular/img%203.jpg",
  "/assets/Popular/img%204.jpg",
  "/assets/Popular/img%206.jpg",
  "/assets/Popular/img%207.jpg",
  "/assets/Popular/img%208.jpg",
  "/assets/Popular/img%209.jpg",
];

const colorOptions = ["White", "Black", "Blue", "Green", "Red"];
const sizeOptions = ["XS", "S", "M", "L", "XL"];

export default function CustomTopDesigner() {
  const dispatch = useDispatch();
  const [selectedBase, setSelectedBase] = useState(popularImages[0]);
  const [customText, setCustomText] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[2]);
  const [saving, setSaving] = useState(false);
  const [customDesignId, setCustomDesignId] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState("info");

  const previewImage = useMemo(() => selectedBase, [selectedBase]);

  const handleSave = async () => {
    if (!selectedBase) {
      notifyError("Please select a base design");
      return;
    }
    try {
      setSaving(true);
      setStatusMsg("");
      const payload = {
        productId: DUMMY_PRODUCT_ID,
        baseImage: selectedBase,
        selectedColor,
        selectedSize,
        customText,
        previewImage,
      };
      const id = await saveCustomDesign(payload);
      setCustomDesignId(id);
      notifySuccess("Design saved");
      setStatusType("success");
      setStatusMsg("Design saved successfully.");
    } catch (e) {
      const msg = e?.message || "Could not save design";
      notifyError(msg);
      setStatusType("error");
      setStatusMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleAddToCart = () => {
    if (!customDesignId) {
      notifyError("Please save your design before adding to cart");
      return;
    }
    dispatch(
      add_cart_product({
        _id: DUMMY_PRODUCT_ID,
        title: "Customized Top",
        price: BASE_PRICE,
        img: selectedBase,
        customDesignId,
        selectedColor,
        selectedSize,
        customText,
        quantity: 9999,
      })
    );
  };

  return (
    <section className="tp-shop-area pb-80 pt-40">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-30">
            <h3 className="breadcrumb__title">Customize Your Top</h3>
          </div>
        </div>

        <div className="row mb-30">
          <div className="col-12">
            <div className="row g-3">
              {popularImages.map((img, idx) => (
                <div className="col-6 col-sm-4 col-md-3" key={idx}>
                  <div
                    onClick={() => setSelectedBase(img)}
                    className="w-100"
                    style={{
                      border:
                        selectedBase === img
                          ? "2px solid #BE5985"
                          : "1px solid #e0e0e0",
                      borderRadius: 12,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={img}
                      alt="base design"
                      style={{ width: "100%", height: 220, objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-5 order-2 order-lg-1">
            <div className="p-3" style={{ border: "1px solid #eee", borderRadius: 12 }}>
              <h4 className="mb-20">Preview</h4>
              <img
                src={previewImage}
                alt="preview"
                style={{ width: "100%", height: 360, objectFit: "cover", borderRadius: 12 }}
              />
              <div className="mt-10">
                <p className="mb-5">
                  <strong>Text:</strong> {customText || "N/A"}
                </p>
                <p className="mb-5">
                  <strong>Color:</strong> {selectedColor}
                </p>
                <p className="mb-5">
                  <strong>Size:</strong> {selectedSize}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7 order-1 order-lg-2">
            <div className="p-3" style={{ border: "1px solid #eee", borderRadius: 12 }}>
              <h4 className="mb-20">Customize</h4>
              <div className="mb-3">
                <label className="form-label fw-semibold">Custom Text</label>
                <input
                  type="text"
                  className="form-control"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Enter your text"
                />
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 mb-3">
                  <label className="form-label fw-semibold">Color</label>
                  <select
                    className="form-select"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    {colorOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-sm-6 mb-3">
                  <label className="form-label fw-semibold">Size</label>
                  <select
                    className="form-select"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {sizeOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row g-2 mt-2">
                <div className="col-12 col-sm-6">
                  <button
                    className="tp-btn w-100"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Design"}
                  </button>
                </div>
                <div className="col-12 col-sm-6">
                  <button className="tp-btn w-100" onClick={handleAddToCart}>
                    Add Customized Product to Cart
                  </button>
                </div>
              </div>
              {statusMsg && (
                <p
                  className="mt-15"
                  style={{ color: statusType === "error" ? "#d9534f" : "#198754" }}
                >
                  {statusMsg}
                  {customDesignId && statusType !== "error" ? ` (ID: ${customDesignId})` : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
