"use client";
import React, { useState, useEffect } from "react";
import { slugify } from "@/utils/slugify";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import { HomeTwoNewPrdPrdLoader } from "@/components/loader";

const baseCategories = [
  "View All",
  "Shirts",
  "Trousers",
  "T-shirts",
  "Polo T-shirts",
];

const categoryLimits = {
  Shirts: 8,
  Trousers: 8,
  "T-shirts": 8,
  "Polo T-shirts": 8,
};

const normalizeCategory = (product = {}) => {
  const { mainCategory, subCategory, parent, children, category, tags = [] } =
    product;
  if (typeof mainCategory === "string" && mainCategory) return mainCategory;
  if (typeof subCategory === "string" && subCategory) return subCategory;
  if (typeof parent === "string" && parent) return parent;
  if (typeof children === "string" && children) return children;
  if (typeof category === "string" && category) return category;
  if (typeof category?.name === "string") return category.name;
  if (Array.isArray(tags) && tags.length) return tags.join(" ");
  return "";
};

const getMainCategory = (product = {}) =>
  (product.mainCategory || "").toLowerCase();
const getSubCategory = (product = {}) =>
  (product.subCategory || "").toLowerCase();
const getParent = (product = {}) => (product.parent || "").toLowerCase();
const getChild = (product = {}) => (product.children || "").toLowerCase();
const navCategoryFromImg = (src = "") => {
  const s = String(src || "");
  if (s.includes("/Men/trousers/")) return "trousers";
  if (s.includes("/Men/cargo%20pant/") || s.includes("/Men/cargo pant/"))
    return "cargo-pants";
  if (s.includes("/Men/cargo%20jogger/") || s.includes("/Men/cargo jogger/"))
    return "cargo-joggers";
  if (s.includes("/Men/Polo%20T-shirt/") || s.includes("/Men/Polo T-shirt/"))
    return "polo-tshirts";
  if (s.includes("/Men/full%20sleeve%20t-shirt/") || s.includes("/Men/full sleeve t-shirt/"))
    return "full-sleeve-tshirts";
  if (s.includes("/Men/over%20sized%20t-shirt/") || s.includes("/Men/over sized t-shirt/"))
    return "oversized-tshirts";
  if (s.includes("/Men/regular%20fit%20t-shirt/") || s.includes("/Men/regular fit t-shirt/"))
    return "regular-fit-t-shirt";
  if (s.includes("/Men/T-shirt/")) return "tshirts";
  if (s.includes("/Men/casual%20shirt/") || s.includes("/Men/casual shirt/"))
    return "casual-shirts";
  if (s.includes("/Men/checked%20formal%20shirt/") || s.includes("/Men/checked formal shirt/"))
    return "checked-formal-shirts";
  if (s.includes("/Men/Flora%20shirt/") || s.includes("/Men/Flora shirt/"))
    return "floral-shirts";
  return "";
};
const TrendingProducts = ({ assetImages = [], assetImagesByTab = null }) => {

  const {
    data: products,
    isError,
    isLoading,
  } = useGetProductTypeQuery({
    type: "fashion",
    query: `new=true`,
  });

  const [activeCat, setActiveCat] = useState("View All");
  const [categories, setCategories] = useState(baseCategories);

  useEffect(() => {
    if (!products?.data) return;
    setCategories(baseCategories);
  }, [products?.data]);

  let content = null;

  if (isLoading) content = <HomeTwoNewPrdPrdLoader loading={isLoading} />;
  const hasAssetFallback = Array.isArray(assetImages) && assetImages.length > 0;
  const apiItems = products?.data || [];
  const hasApiItems = Array.isArray(apiItems) && apiItems.length > 0;

  if (!isLoading && isError && !hasAssetFallback) content = <ErrorMsg msg="There was an error" />;
  if (!isLoading && !isError && !hasApiItems && !hasAssetFallback)
    content = <ErrorMsg msg="No Products found!" />;

  const hasAssetTabs =
    assetImagesByTab && typeof assetImagesByTab === "object";

  const PRICE_BY_TAB = {
    "View All": 599,
    Shirts: 899,
    Trousers: 1099,
    "T-shirts": 599,
    "Polo T-shirts": 799,
  };

  if (!isLoading && (( !isError && hasApiItems) || hasAssetFallback)) {
    // Prefer API items; otherwise render local static assets as a fallback.
    const arrivals = hasApiItems ? apiItems : [];

    const getItemsForCategory = (cat) => {
      // If API has no items, but we have tab->images, use that directly (ensures filtering always works)
      if (!hasApiItems && hasAssetTabs) {
        const images = assetImagesByTab?.[cat] || [];
        const price = PRICE_BY_TAB[cat] ?? PRICE_BY_TAB["View All"];
        return images
          .slice(0, categoryLimits[cat] ?? images.length)
          .map((src, idx) => {
            const navCategory = navCategoryFromImg(src) || slugify(cat);
            return {
              _id: `asset-new-${slugify(cat)}-${idx}`,
              img: src,
              title: cat === "View All" ? "New Arrival" : cat,
              tags: [],
              price,
              reviews: [],
              discount: 0,
              status: "active",
              href: navCategory ? `/shop?navCategory=${navCategory}` : "/shop",
            };
          });
      }

      let pool = arrivals;
      if (cat === "View All") return pool;
      // More forgiving matching so pills work even if API uses tshirts vs t-shirts, polo-tshirts vs polo-t-shirts, etc.
      const target = slugify(cat);
      const targetAlts = new Set([target]);
      if (target === "t-shirts") {
        targetAlts.add("tshirts");
        targetAlts.add("tshirt");
        targetAlts.add("t-shirt");
      }
      if (target === "polo-t-shirts") {
        targetAlts.add("polo-tshirts");
        targetAlts.add("polo");
      }
      pool = pool.filter((p) => {
        const main = getMainCategory(p);
        const sub = getSubCategory(p);
        const parent = getParent(p);
        const child = getChild(p);
        const candidates = [main, sub, parent, child].map((v) => slugify(v));
        return (
          candidates.some((c) => targetAlts.has(c))
        );
      });
      const limit = categoryLimits[cat] ?? pool.length;
      return pool.slice(0, limit);
    };

    const filteredItems = getItemsForCategory(activeCat);

    content = (
      <>
        <style>{`
          .tp-trending-grid {
            display: grid;
            gap: 28px;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            margin-top: 40px;
          }

          @media (max-width: 768px) {
            .tp-trending-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 20px;
              padding: 0 10px;
            }
          }

          @media (max-width: 480px) {
            .tp-trending-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
            }
          }
        `}</style>

        <div className="tp-trending-grid">
          {filteredItems.map((item, idx) => {
            // Prefer per-item image (important for correct tab filtering).
            const localImg =
              item?.img ||
              (Array.isArray(assetImages) && assetImages.length
                ? assetImages[idx % assetImages.length]
                : null);
            const cardProduct = localImg ? { ...item, img: localImg } : item;
            return (
              <div key={item._id} className="tp-trending-item">
                <ProductItem product={cardProduct} style_2={true} />
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <section
      className="tp-trending-area bg-white"
      style={{
        width: "100%",
        overflowX: "hidden",
        padding: "80px 0 100px",
      }}
    >
      <div
        className="container text-center"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <h2
          className="text-4xl tracking-wide"
          style={{ fontFamily: "var(--tp-ff-poppins)" }}
        >
           New Arrivals
          </h2>
        <p className="text-gray-500 mt-3">Get them before everyone else does</p>

        <style>{`
          .filter-pills {
            display: flex;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap; /* desktop: wrap */
            margin-top: 24px;
            margin-bottom: 8px;
          }
          .filter-btn {
            padding: 12px 22px;
            border-radius: 9999px;
            border: 1px solid #d1d5db;
            background: #ffffff;
            color: #374151;
            font-weight: 600;
            font-size: 16px;
            line-height: 1;
            transition: all 200ms ease;
            white-space: nowrap;
            flex-shrink: 0;
          }
          .filter-btn--active {
            background: #FF8FB7;
            color: white;
            border-color: #FF8FB7;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
          }

          @media (max-width: 768px) {
            .filter-pills {
              overflow-x: auto;
              flex-wrap: nowrap; 
              justify-content: flex-start;
              padding: 0 16px;
              -webkit-overflow-scrolling: touch;
            }
            /* Optional: hide scroll bar */
            .filter-pills::-webkit-scrollbar {
              display: none;
            }
          }
        `}</style>

        <div className="filter-pills">
          {categories.map((cat) => {
            const isActive = activeCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`filter-btn ${isActive ? "filter-btn--active" : ""}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="tp-trending-slider">{content}</div>
      </div>
    </section>
  );
};

export default TrendingProducts;
