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
const isNewArrival = (product = {}) => product.isNewArrival === true;

const TrendingProducts = () => {
  const imageOverrideMap = {
    trousers:
      "https://xcdn.next.co.uk/COMMON/Items/Default/Default/ItemImages/AltItemZoom/317892s.jpg",
    "oversized t-shirts":
      "https://i.pinimg.com/originals/bf/80/51/bf80515a5be6282c6128312ac4691d83.jpg",
    cargos:
      "https://cdn.shopify.com/s/files/1/0588/2203/3585/products/5010YKWHITE_1.jpg?v=1629198756&width=940",
    cosmetics:
      "https://img.freepik.com/premium-photo/professional-makeup-products-makeup_972405-1627.jpg",
    accessories:
      "https://www.checkcharm.com/wp-content/uploads/2024/04/image-265.png",
    "full sleeve shirt - classic white":
      "https://www.studiosuits.com/cdn/shop/files/whitecottonshirtlk_1445x.jpg?v=1698385632",
    "casual shorts - khaki":
      "https://m.media-amazon.com/images/I/41QCeJzhL-L.jpg",
    "boxers - cotton pack navy":
      "https://savys.pk/cdn/shop/files/men-cotton-boxer-587701.png?v=1745098410&width=1000",
    "denim jeans - dark wash":
      "https://tse3.mm.bing.net/th/id/OIP.iDTGVM3-q1aRGcMnjpoLggAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    "denim jeans - light wash":
      "https://peppermayo.co.uk/cdn/shop/files/BackAgainStraightLegDenimJeansLightWashBlue4.jpg?v=1749598102",
    "casual shorts - navy":
      "https://www.careofcarl.com/bilder/artiklar/zoom/24233311r_3.jpg?m=1678800351",
    "flat front trousers - navy":
      "https://d3n4hccmbcfj87.cloudfront.net/uploads/2017/08/4PEP1.jpg",
    "boxers - cotton pack grey":
      "https://www.cottontraders.com/dw/image/v2/BCDM_PRD/on/demandware.static/-/Sites-cotton-master-catalog/default/dweb0d79c0/images/original/AJ10592W_original_neutral_charcoal_278091.jpg?sw=549",
  };

  const getOverrideImg = (category = "", title = "") => {
    if (typeof category !== "string") return null;
    const cat = category.toLowerCase();
    const ttl = typeof title === "string" ? title.toLowerCase() : "";
    if (ttl.includes("casual shorts - khaki"))
      return imageOverrideMap["casual shorts - khaki"];
    if (ttl.includes("boxers - cotton pack navy"))
      return imageOverrideMap["boxers - cotton pack navy"];
    if (ttl.includes("boxers - cotton pack grey"))
      return imageOverrideMap["boxers - cotton pack grey"];
    if (ttl.includes("denim jeans - dark wash"))
      return imageOverrideMap["denim jeans - dark wash"];
    if (ttl.includes("denim jeans - light wash"))
      return imageOverrideMap["denim jeans - light wash"];
    if (ttl.includes("casual shorts - navy"))
      return imageOverrideMap["casual shorts - navy"];
    if (ttl.includes("flat front trousers - navy"))
      return imageOverrideMap["flat front trousers - navy"];
    if (ttl.includes("full sleeve shirt - classic white"))
      return imageOverrideMap["full sleeve shirt - classic white"];
    if (cat.includes("trouser") || cat.includes("pant"))
      return imageOverrideMap["trousers"];
    if (cat.includes("oversized")) return imageOverrideMap["oversized t-shirts"];
    if (cat.includes("cargo")) return imageOverrideMap["cargos"];
    if (cat.includes("cosmetic") || cat.includes("beauty"))
      return imageOverrideMap["cosmetics"];
    if (cat.includes("accessor")) return imageOverrideMap["accessories"];
    return null;
  };

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
  if (!isLoading && isError) content = <ErrorMsg msg="There was an error" />;
  if (!isLoading && !isError && products?.data?.length === 0)
    content = <ErrorMsg msg="No Products found!" />;

  if (!isLoading && !isError && products?.data?.length > 0) {
    const arrivals = products.data.filter((p) => isNewArrival(p));

    const getItemsForCategory = (cat) => {
      let pool = arrivals;
      if (cat === "View All") return pool;
      const target = slugify(cat);
      pool = pool.filter((p) => {
        const main = getMainCategory(p);
        const sub = getSubCategory(p);
        const parent = getParent(p);
        const child = getChild(p);
        return (
          slugify(main) === target ||
          slugify(sub) === target ||
          slugify(parent) === target ||
          slugify(child) === target
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
          {filteredItems.map((item) => {
            const label = normalizeCategory(item);
            const overrideImg = getOverrideImg(label, item.title);
            const cardProduct = overrideImg ? { ...item, img: overrideImg } : item;
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
