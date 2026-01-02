"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
// internal
import ErrorMsg from "../common/error-msg";
import { ArrowRightLong, TextShapeLine, NextLongArr, PrevLongArr } from "@/svg";
import { HomeTwoCateLoader } from "../loader";
import { useGetCategoriesQuery } from "@/redux/features/categoryApi";

const FashionCategory = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategoriesQuery({ isActive: true });
  const router = useRouter();
  const scrollContainerRef = useRef(null);

  const slugify = (value = "") =>
    value
      .toString()
      .trim()
      .toLowerCase()
      .replace(/&/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  // handle category route
  const handleCategoryRoute = (title) => {
    const slug = slugify(title);
    // Keep homepage visuals the same, but route these specific cards to the assets-based grid
    if (slug === "oversized-t-shirts" || slug === "oversized-t-shirt") {
      return router.push(`/shop?navCategory=oversized-tshirts`);
    }
    if (slug === "cargos") {
      return router.push(`/shop?navCategory=cargos`);
    }
    return router.push(`/shop?category=${slug}`);
  };

  // handle scroll navigation
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 300; 
      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <HomeTwoCateLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && (categories?.data?.length || 0) === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError) {
    // Popular picks (online imagery)
    const curated = [
      { id: 1, name: "CUSTOMIZED TOPS", description: "Customized Tops" },
      { id: 2, name: "OVERSIZED T-SHIRTS", description: "Oversized Tees" },
      { id: 3, name: "CARGOS", description: "Cargo Edit" },
      { id: 4, name: "COSMETICS", description: "Cosmetics" },
      { id: 5, name: "ACCESSORIES", description: "Accessories" },
      { id: 6, name: "BOTTOM WEAR", description: "Bottom Wear" },
      { id: 7, name: "BAGS AND CARRIERS", description: "Bags and Carriers" },
      { id: 8, name: "HEADWEAR", description: "Headwear" },
    ];

    const imageMap = {
      "customized tops": "https://img.freepik.com/premium-psd/psd-simple-white-men-s-tee-mockup-template_1016955-32.jpg?w=996",
      "oversized t-shirts": "https://i.pinimg.com/originals/bf/80/51/bf80515a5be6282c6128312ac4691d83.jpg",
      "cargos": "https://tse1.explicit.bing.net/th/id/OIP.-Thi_CCNOfVhoRJ_VBWCKQHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3",
      "cosmetics": "https://img.freepik.com/premium-photo/professional-makeup-products-makeup_972405-1627.jpg",
      "accessories": "https://www.checkcharm.com/wp-content/uploads/2024/04/image-265.png",
      "bottom wear": "https://www.jaipurkurti.com/cdn/shop/products/JKPAT0161-02.jpg?v=1643790621&width=580",
      "bags and carriers": "https://baginning.com/media/catalog/product/cache/17f7930b9630993becbd36a7c8a76b30/j/d/jd565298963621_02.jpg",
      "headwear": "https://www.jeffreycampbell.com/cdn/shop/products/1_51766109-630d-4b60-9427-1392505d556b.jpg?v=1643790621&width=580",
    };

    // Safety fallback (used only if an item is missing from imageMap)
    const fallbackImgs = ["/assets/img/menu/menu-home-2.jpg"];

    content = curated.map((item, idx) => {
      const imgKey = item.name.toLowerCase();
      const img =
        imageMap[imgKey] ||
        fallbackImgs[idx % fallbackImgs.length] ||
        "/assets/img/menu/menu-home-2.jpg";
      return (
      <div
        key={idx}
        className="category-scroll-item"
        style={{
          flexShrink: 0,
          width: "240px",
          height: "340px",
          margin: "0 8px",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
          position: "relative",
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            width: "100%",
            background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)",
            padding: "18px 12px 16px 12px",
            boxSizing: "border-box",
            borderBottomLeftRadius: "18px",
            borderBottomRightRadius: "18px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontWeight: 700,
              fontSize: "18px",
              color: "#fff",
              margin: 0,
              marginBottom: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              background: "none",
              display: "block",
              padding: 0,
              textShadow: "0 2px 6px rgba(0,0,0,0.35)",
            }}
          >
            <a
              className="cursor-pointer"
              onClick={() => handleCategoryRoute(item.name)}
              style={{
                textDecoration: "none",
                color: "#fff",
                background: "none",
                padding: 0,
                textShadow: "0 2px 6px rgba(0,0,0,0.35)",
              }}
            >
              {item.name}
            </a>
          </h3>
          <a
            className="tp-btn tp-btn-border"
            onClick={() => handleCategoryRoute(item.name)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "auto",
              paddingLeft: "22px",
              paddingRight: "22px",
              marginTop: "10px",
              color: "#fff",
              borderColor: "rgba(255,255,255,0.9)",
              textShadow: "0 2px 6px rgba(0,0,0,0.35)",
            }}
          >
            Shop Now{" "}
            <span style={{ marginLeft: 6 }}>
              <ArrowRightLong />
            </span>
          </a>
        </div>
      </div>
    );});
  }
  return (
    <>
      <section className="tp-category-area pb-95 pt-95">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-section-title-wrapper-2 text-center mb-50">
                <span className="tp-section-title-pre-2 mb-5 ">
                  Shop by Categories
                  <TextShapeLine />
                </span>
                <h3 className="tp-section-title-2">LookFame Edition</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-category-slider-2 p-relative">
                {/* Left Navigation Arrow - Overlaid */}
                <button
                  className="tp-category-slider-button-prev-overlay"
                  onClick={() => handleScroll("left")}
                  style={{
                    position: "absolute",
                    left: "20px",
                    top: "130px",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    color: "#BE5985",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    zIndex: 10,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
                    e.target.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  <PrevLongArr />
                </button>

                {/* Right Navigation Arrow - Overlaid */}
                <button
                  className="tp-category-slider-button-next-overlay"
                  onClick={() => handleScroll("right")}
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "130px",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    color: "#BE5985",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    zIndex: 10,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
                    e.target.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  <NextLongArr />
                </button>

                {/* Scrollable Categories Container */}
                <div
                  ref={scrollContainerRef}
                  className="categories-scroll-container"
                  style={{
                    overflowX: "auto",
                    overflowY: "hidden",
                    whiteSpace: "nowrap",
                    padding: "0 15px",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <div
                    className="categories-scroll-wrapper"
                    style={{
                      display: "inline-flex",
                      gap: "12px",
                      padding: "0 12px",
                      minWidth: "100%",
                    }}
                  >
                    {content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hide scrollbar for webkit browsers */}
        <style jsx>{`
          .categories-scroll-container::-webkit-scrollbar {
            display: none;
          }
          .category-scroll-item:hover {
            transform: scale(1.02);
            transition: transform 0.3s ease;
          }

            /* Hide navigation arrows on mobile screens */
          @media (max-width: 767px) {
            .tp-category-slider-button-prev-overlay,
            .tp-category-slider-button-next-overlay {
            display: none !important;
           }
         }
        `}</style>
      </section>
    </>
  );
};

export default FashionCategory;
