'use client';
import React, { useState, useEffect } from "react";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import { useDispatch } from "react-redux";
import DetailsTabNav from "./details-tab-nav";
import RelatedProducts from "./related-products";

const overrideImgSrc = (product = {}) => {
  const slug = (product.slug || "").toLowerCase();
  const title = (product.title || "").toLowerCase();
  if (slug.includes("casual-shorts-khaki") || title.includes("casual shorts - khaki")) {
    return "https://m.media-amazon.com/images/I/41QCeJzhL-L.jpg";
  }
  if (slug.includes("boxers-cotton-pack-grey") || title.includes("boxers - cotton pack grey")) {
    return "https://www.cottontraders.com/dw/image/v2/BCDM_PRD/on/demandware.static/-/Sites-cotton-master-catalog/default/dweb0d79c0/images/original/AJ10592W_original_neutral_charcoal_278091.jpg?sw=549";
  }
  if (slug.includes("boxers-cotton-pack-navy") || title.includes("boxers - cotton pack navy")) {
    return "https://savys.pk/cdn/shop/files/men-cotton-boxer-587701.png?v=1745098410&width=1000";
  }
  if (slug.includes("denim-jeans-dark-wash") || title.includes("denim jeans - dark wash")) {
    return "https://tse3.mm.bing.net/th/id/OIP.iDTGVM3-q1aRGcMnjpoLggAAAA?rs=1&pid=ImgDetMain&o=7&rm=3";
  }
  if (slug.includes("denim-jeans-light-wash") || title.includes("denim jeans - light wash")) {
    return "https://peppermayo.co.uk/cdn/shop/files/BackAgainStraightLegDenimJeansLightWashBlue4.jpg?v=1749598102";
  }
  if (slug.includes("casual-shorts-navy") || title.includes("casual shorts - navy")) {
    return "https://www.careofcarl.com/bilder/artiklar/zoom/24233311r_3.jpg?m=1678800351";
  }
  if (slug.includes("flat-front-trousers-navy") || title.includes("flat front trousers - navy")) {
    return "https://d3n4hccmbcfj87.cloudfront.net/uploads/2017/08/4PEP1.jpg";
  }
  return null;
};

const ProductDetailsContent = ({ productItem }) => {
  const { _id, img, imageURLs, videoId, status } = productItem || {};
  const patchedImg = overrideImgSrc(productItem) || img;
  const patchedImageURLs =
    Array.isArray(imageURLs) && imageURLs.length
      ? imageURLs.map((item, idx) =>
          idx === 0 && overrideImgSrc(productItem)
            ? { ...item, img: overrideImgSrc(productItem) }
            : item
        )
      : [{ img: patchedImg }];

  const [activeImg, setActiveImg] = useState(patchedImg);
  const dispatch = useDispatch();
  // active image change when img change
  useEffect(() => {
    setActiveImg(patchedImg);
  }, [patchedImg]);

  // handle image active
  const handleImageActive = (item) => {
    setActiveImg(item.img);
  };
  return (
    <section className="tp-product-details-area">
      <div className="tp-product-details-top pb-115">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              {/* product-details-thumb-wrapper start */}
              <DetailsThumbWrapper
                activeImg={activeImg}
                handleImageActive={handleImageActive}
                imageURLs={patchedImageURLs}
                imgWidth={580}
                imgHeight={670}
                videoId={videoId}
                status={status}
              />
              {/* product-details-thumb-wrapper end */}
            </div>
            <div className="col-xl-5 col-lg-6">
              {/* product-details-wrapper start */}
              <DetailsWrapper
                productItem={productItem}
                handleImageActive={handleImageActive}
                activeImg={activeImg}
                detailsBottom={true}
              />
              {/* product-details-wrapper end */}
            </div>
          </div>
        </div>
      </div>

      {/* product details description */}
      <div className="tp-product-details-bottom pb-140">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <DetailsTabNav product={productItem} />
            </div>
          </div>
        </div>
      </div>
      {/* product details description */}

      {/* related products start */}
      <section className="tp-related-product pt-95 pb-50">
        <div className="container">
          <div className="row">
            <div className="tp-section-title-wrapper-6 text-center mb-40">
              <span className="tp-section-title-pre-6">Next day Products</span>
              <h3 className="tp-section-title-6">Related Products</h3>
            </div>
          </div>
          <div className="row">
            <RelatedProducts id={_id} />
          </div>
        </div>
      </section>
      {/* related products end */}
    </section>
  );
};

export default ProductDetailsContent;