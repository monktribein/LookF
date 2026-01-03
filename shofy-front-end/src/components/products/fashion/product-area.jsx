// 'use client';
// import React, { useMemo, useState } from 'react';
// import ErrorMsg from '@/components/common/error-msg';
// import { useGetProductTypeQuery } from '@/redux/features/productApi';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Scrollbar } from "swiper/modules";
// import { TextShapeLine } from '@/svg';
// import ProductItem from './product-item';
// import { HomeTwoPrdLoader } from '@/components/loader';
// import { slugify } from '@/utils/slugify';
// import 'swiper/css';
// import 'swiper/css/scrollbar';

// // Tabs
// const tabs = ["All Collection", "Shirts", "T-Shirts", "Polo T-Shirts", "Trousers"];

// const ProductArea = ({ assetImagesByTab = null }) => {
//   const [activeTab, setActiveTab] = useState(tabs[0]);
//   const { data: products, isError, isLoading } = useGetProductTypeQuery({
//     type: 'fashion',
//     query: 'customerFavorite=true',
//   });

//   const handleActiveTab = (tab) => setActiveTab(tab);

//   // Slider settings (updated mobile view)
//   const slider_setting = {
//     slidesPerView: 5,
//     spaceBetween: 20,
//     loop: false,
//     centeredSlides: false,
//     scrollbar: {
//       el: ".swiper-scrollbar",
//       draggable: true,
//       dragClass: "tp-swiper-scrollbar-drag",
//       snapOnRelease: true,
//     },
//     breakpoints: {
//       1200: { slidesPerView: 5 },
//       992: { slidesPerView: 4 },
//       768: { slidesPerView: 3 },
//       576: { slidesPerView: 2 }, // ✅ mobile will now show 2 per view
//       0: { slidesPerView: 2 },   // ✅ ensures even smallest screen shows 2 per view
//     },
//   };

//   const normalizedFavorites = useMemo(() => {
//     if (!products?.data?.length) return [];
//     const allowedMain = new Set(['shirts', 'tshirts']);
//     const allowedSub = new Set(['polo-tshirts', 'trousers']);

//     return products.data
//       .map((p) => {
//         const main = (p.mainCategory || slugify(p.parent || '')).toLowerCase();
//         const sub = (p.subCategory || slugify(p.children || '')).toLowerCase();
//         return { ...p, mainCategory: main, subCategory: sub };
//       })
//       .filter((p) => {
//         // Ensure only allowed fashion categories
//         if (allowedSub.has(p.subCategory)) return true;
//         if (allowedMain.has(p.mainCategory)) return true;
//         return false;
//       })
//       .filter((p) => !!p.img); // skip entries without a primary image
//   }, [products]);

//   const display_items = useMemo(() => {
//     switch (activeTab) {
//       case 'Shirts':
//         return normalizedFavorites.filter((p) => p.mainCategory === 'shirts');
//       case 'T-Shirts':
//         return normalizedFavorites.filter((p) => p.mainCategory === 'tshirts');
//       case 'Polo T-Shirts':
//         return normalizedFavorites.filter((p) => p.subCategory === 'polo-tshirts');
//       case 'Trousers':
//         return normalizedFavorites.filter((p) => p.subCategory === 'trousers');
//       default:
//         return normalizedFavorites;
//     }
//   }, [activeTab, normalizedFavorites]);

//   const activeAssetImages = useMemo(() => {
//     if (!assetImagesByTab) return [];
//     return assetImagesByTab?.[activeTab] || [];
//   }, [assetImagesByTab, activeTab]);

//   const tabCounts = useMemo(() => {
//     if (assetImagesByTab) {
//       return tabs.reduce((acc, t) => {
//         acc[t] = (assetImagesByTab?.[t] || []).length;
//         return acc;
//       }, {});
//     }
//     const byTab = {
//       "All Collection": normalizedFavorites.length,
//       Shirts: normalizedFavorites.filter((p) => p.mainCategory === 'shirts').length,
//       "T-Shirts": normalizedFavorites.filter((p) => p.mainCategory === 'tshirts').length,
//       "Polo T-Shirts": normalizedFavorites.filter((p) => p.subCategory === 'polo-tshirts').length,
//       Trousers: normalizedFavorites.filter((p) => p.subCategory === 'trousers').length,
//     };
//     return byTab;
//   }, [assetImagesByTab, normalizedFavorites]);

//   const display_with_images = useMemo(() => {
//     // If we have local assets for this tab, render those (even if API returns no products)
//     if (assetImagesByTab) {
//       return activeAssetImages.map((src, idx) => ({
//         _id: `asset-${activeTab}-${idx}`,
//         img: src,
//         title: activeTab,
//         tags: [],
//         price: activeTab === "Trousers" ? 1099 : activeTab === "Polo T-Shirts" ? 799 : 599,
//         reviews: [],
//         discount: 0,
//         status: "active",
//         href: (() => {
//           const s = String(src || "");
//           if (s.includes("/Men/trousers/")) return "/shop?navCategory=trousers";
//           if (s.includes("/Men/cargo%20pant/") || s.includes("/Men/cargo pant/")) return "/shop?navCategory=cargo-pants";
//           if (s.includes("/Men/cargo%20jogger/") || s.includes("/Men/cargo jogger/")) return "/shop?navCategory=cargo-joggers";
//           if (s.includes("/Men/Polo%20T-shirt/") || s.includes("/Men/Polo T-shirt/")) return "/shop?navCategory=polo-tshirts";
//           if (s.includes("/Men/full%20sleeve%20t-shirt/") || s.includes("/Men/full sleeve t-shirt/")) return "/shop?navCategory=full-sleeve-tshirts";
//           if (s.includes("/Men/over%20sized%20t-shirt/") || s.includes("/Men/over sized t-shirt/")) return "/shop?navCategory=oversized-tshirts";
//           if (s.includes("/Men/regular%20fit%20t-shirt/") || s.includes("/Men/regular fit t-shirt/")) return "/shop?navCategory=regular-fit-t-shirt";
//           if (s.includes("/Men/T-shirt/")) return "/shop?navCategory=tshirts";
//           if (s.includes("/Men/casual%20shirt/") || s.includes("/Men/casual shirt/")) return "/shop?navCategory=casual-shirts";
//           if (s.includes("/Men/checked%20formal%20shirt/") || s.includes("/Men/checked formal shirt/")) return "/shop?navCategory=checked-formal-shirts";
//           if (s.includes("/Men/Flora%20shirt/") || s.includes("/Men/Flora shirt/")) return "/shop?navCategory=floral-shirts";
//           return "/shop";
//         })(),
//       }));
//     }

//     // Otherwise, keep existing API behavior (but ensure images are local-only)
//     const fallbackLocalImages = (assetImagesByTab?.["All Collection"] || []).length
//       ? assetImagesByTab["All Collection"]
//       : [
//           "/assets/Popular/img%201.jpg",
//           "/assets/Popular/img%202.jpg",
//           "/assets/Popular/img%203.jpg",
//           "/assets/Popular/img%204.jpg",
//           "/assets/Popular/img%206.jpg",
//           "/assets/Popular/img%207.jpg",
//           "/assets/Popular/img%208.jpg",
//           "/assets/Popular/img%209.jpg",
//         ];

//     if (!display_items || display_items.length === 0) return [];
//     return display_items.map((item, idx) => ({
//       ...item,
//       img: fallbackLocalImages[idx % fallbackLocalImages.length] || item.img,
//     }));
//   }, [assetImagesByTab, activeAssetImages, activeTab, display_items]);

//   // Decide what to render
//   let content = null;
//   if (!assetImagesByTab) {
//     if (isLoading) content = <HomeTwoPrdLoader loading={isLoading} />;
//     else if (!isLoading && isError) content = <ErrorMsg msg="There was an error" />;
//     else if (!isLoading && !isError && normalizedFavorites.length === 0)
//       content = <ErrorMsg msg="No Products found!" />;
//   }

//   if (assetImagesByTab) {
//     if (activeAssetImages.length === 0) {
//       content = <ErrorMsg msg="No items found" />;
//     }
//   }

//   if (!content) {
//     content = (
//       <div className="row justify-center m-50">
//         <div className="col-xl-12">
//           <div className="tp-product-tab-2 tp-tab mb-50 text-center">
//             <nav>
//               <div className="nav nav-tabs justify-content-center">
//                 {tabs.map((tab, i) => (
//                   <button
//                     key={i}
//                     onClick={() => handleActiveTab(tab)}
//                     className={`nav-link text-capitalize ${activeTab === tab ? "active" : ""}`}
//                   >
//                     {tab.split("-").join(" ")}
//                     <span className="tp-product-tab-tooltip">{tabCounts[tab] || 0}</span>
//                   </button>
//                 ))}
//               </div>
//             </nav>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="tp-product-area pb-50 bg-white">
//       <div className="container">
//         <div className="row">
//           <div className="col-xl-12">
//             <div className="tp-section-title-wrapper-2 text-center mb-30">
//               <span className="tp-section-title-pre-2 pt-40">
//                 All Product Shop
//                 <TextShapeLine />
//               </span>
//               <h3 className="tp-section-title-2">Customer Favorite Style Product</h3>
//             </div>
//           </div>
//         </div>

//         {content}

//         {/* Swiper only if products exist */}
//         {display_with_images.length > 0 && (
//           <>
//             <style>{`
//               /* Adjust slides on mobile for proper spacing */
//               @media (max-width: 768px) {
//                 .popular-product-slide {
//                   padding: 0 6px;
//                 }
//                 .tp-category-slider-active-2 {
//                   padding: 0 4px;
//                 }
//               }
//             `}</style>

//             <Swiper
//               {...slider_setting}
//               modules={[Scrollbar]}
//               className="tp-category-slider-active-2 swiper-container mb-50"
//             >
//               {display_with_images.map((prd) => (
//                 <SwiperSlide key={prd._id}>
//                   <div className="popular-product-slide">
//                     <ProductItem product={prd} />
//                   </div>
//                 </SwiperSlide>
//               ))}
//               <div className="swiper-scrollbar tp-swiper-scrollbar tp-swiper-scrollbar-drag"></div>
//             </Swiper>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ProductArea;


'use client';
import React, { useMemo, useState, useRef } from 'react';
import ErrorMsg from '@/components/common/error-msg';
import { useGetProductTypeQuery } from '@/redux/features/productApi';
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { TextShapeLine } from '@/svg';
import ProductItem from './product-item';
import { HomeTwoPrdLoader } from '@/components/loader';
import { slugify } from '@/utils/slugify';
import 'swiper/css';
import 'swiper/css/scrollbar';

const tabs = ["All Collection", "Shirts", "T-Shirts", "Polo T-Shirts", "Trousers"];

const ProductArea = ({ assetImagesByTab = null }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const swiperRef = useRef(null);
  const lastMoveRef = useRef(0);

  const { data: products, isError, isLoading } = useGetProductTypeQuery({
    type: 'fashion',
    query: 'customerFavorite=true',
  });

  const slider_setting = {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: false,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    breakpoints: {
      1200: { slidesPerView: 5 },
      992: { slidesPerView: 4 },
      768: { slidesPerView: 3 },
      576: { slidesPerView: 2 },
      0: { slidesPerView: 2 },
    },
  };

  const handleMouseMove = (e) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const now = Date.now();
    if (now - lastMoveRef.current < 350) return;
    lastMoveRef.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x > width * 0.7) swiper.slideNext();
    if (x < width * 0.3) swiper.slidePrev();
  };

  const normalizedFavorites = useMemo(() => {
    if (!products?.data?.length) return [];
    return products.data
      .map((p) => ({
        ...p,
        mainCategory: (p.mainCategory || slugify(p.parent || '')).toLowerCase(),
        subCategory: (p.subCategory || slugify(p.children || '')).toLowerCase(),
      }))
      .filter((p) => !!p.img);
  }, [products]);

  const display_items = useMemo(() => {
    switch (activeTab) {
      case 'Shirts':
        return normalizedFavorites.filter(p => p.mainCategory === 'shirts');
      case 'T-Shirts':
        return normalizedFavorites.filter(p => p.mainCategory === 'tshirts');
      case 'Polo T-Shirts':
        return normalizedFavorites.filter(p => p.subCategory === 'polo-tshirts');
      case 'Trousers':
        return normalizedFavorites.filter(p => p.subCategory === 'trousers');
      default:
        return normalizedFavorites;
    }
  }, [activeTab, normalizedFavorites]);

  let content = null;
  if (!assetImagesByTab) {
    if (isLoading) content = <HomeTwoPrdLoader loading />;
    else if (isError) content = <ErrorMsg msg="There was an error" />;
    else if (!display_items.length) content = <ErrorMsg msg="No Products found!" />;
  }

  return (
    <section className="tp-product-area pb-50 bg-white">
      <div className="container">
        {/* Heading */}
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-section-title-wrapper-2 text-center mb-30">
              <span className="tp-section-title-pre-2 pt-40">
                All Product Shop
                <TextShapeLine />
              </span>
              <h3 className="tp-section-title-2">
                Customer Favorite Style Product
              </h3>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="row justify-center m-50">
          <div className="col-xl-12">
            <div className="tp-product-tab-2 tp-tab mb-40 text-center">
              <nav>
                <div className="nav nav-tabs justify-content-center">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>

        {content}

        {/* Slider */}
        {display_items.length > 0 && (
          <div
            onMouseMove={handleMouseMove}
            style={{ cursor: "ew-resize" }}
          >
            <Swiper
              {...slider_setting}
              modules={[Scrollbar]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className="tp-category-slider-active-2 mb-50"
            >
              {display_items.map((prd) => (
                <SwiperSlide key={prd._id}>
                  <ProductItem product={prd} />
                </SwiperSlide>
              ))}
              <div className="swiper-scrollbar"></div>
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductArea;
