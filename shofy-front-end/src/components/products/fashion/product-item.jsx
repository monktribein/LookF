import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
import '@/styles/rating-fix.css';
// internal
import { Cart, CompareThree, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";

const ProductItem = ({ product, style_2 = false }) => {
  const { _id, img, category, title, reviews, price, discount, tags, status } = product || {};
  const [ratingVal, setRatingVal] = useState(0);
  const { cart_products } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  // Treat ONLY our generated "asset-" ids as asset-only.
  // Everything else should behave like a normal product (add-to-cart, details, purchase) like before.
  const isAssetProduct = typeof _id === "string" && _id.startsWith("asset-");

  const detailsHref = isAssetProduct
    ? typeof product?.href === "string" && product.href
      ? product.href
      : "/shop"
    : `/product-details/${_id}`;

  const isAddedToCart =
    _id != null &&
    cart_products.some((prd) => String(prd?._id) === String(_id));
  const isAddedToWishlist =
    _id != null &&
    wishlist.some((prd) => String(prd?._id) === String(_id));
  const dispatch = useDispatch();

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // handle compare product
  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };


  const imageWrapperClass = style_2
    ? "relative w-full h-[280px] overflow-hidden rounded-lg flex items-center justify-center bg-white"
    : "tp-product-thumb-2 p-relative z-index-1 fix";

  const cardClass = style_2 ? "tp-product-item-2 h-full flex flex-col gap-3" : "tp-product-item-2 mb-40";

  return (
    <div className={cardClass}>
      <div
        className={imageWrapperClass}
        style={
          style_2
            ? undefined
            : { height: 240, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }
        }
      >
        <Link href={detailsHref}>
          {style_2 ? (
            <Image
              src={img}
              alt="product img"
              fill
              sizes="(max-width: 768px) 60vw, 25vw"
              className="object-contain w-full h-full"
              priority
            />
          ) : (
            <Image
              src={img}
              alt="product img"
              width={200}
              height={240}
              className="w-full h-full object-cover rounded-lg"
              priority
            />
          )}
        </Link>
        <div className="tp-product-badge">
          {status === 'out-of-stock' && <span className="product-hot">out-stock</span>}
        </div>
        {/* product action */}
        {_id != null && (
          <div className="tp-product-action-2 tp-product-action-blackStyle">
            <div className="tp-product-action-item-2 d-flex flex-column">
              {isAddedToCart ? (
                <Link
                  href="/cart"
                  className={`tp-product-action-btn-2 ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn`}
                >
                  <Cart />
                  <span className="tp-product-tooltip tp-product-tooltip-right">
                    View Cart
                  </span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAddProduct(product)}
                  className={`tp-product-action-btn-2 ${isAddedToCart ? 'active' : ''} tp-product-add-cart-btn`}
                  disabled={status === 'out-of-stock'}
                >
                  <Cart />
                  <span className="tp-product-tooltip tp-product-tooltip-right">
                    Add to Cart
                  </span>
                </button>
              )}

              {/* Keep “before” behavior for real products; avoid broken quick actions for asset-only cards */}
              {!isAssetProduct && (
                <>
                  <button
                    onClick={() => dispatch(handleProductModal(product))}
                    className="tp-product-action-btn-2 tp-product-quick-view-btn"
                  >
                    <QuickView />
                    <span className="tp-product-tooltip tp-product-tooltip-right">
                      Quick View
                    </span>
                  </button>
                  <button
                    disabled={status === 'out-of-stock'}
                    onClick={() => handleWishlistProduct(product)}
                    className={`tp-product-action-btn-2 ${isAddedToWishlist ? 'active' : ''} tp-product-add-to-wishlist-btn`}
                  >
                    <Wishlist />
                    <span className="tp-product-tooltip tp-product-tooltip-right">
                      Add To Wishlist
                    </span>
                  </button>
                  <button
                    disabled={status === 'out-of-stock'}
                    onClick={() => handleCompareProduct(product)}
                    className="tp-product-action-btn-2 tp-product-add-to-compare-btn"
                  >
                    <CompareThree />
                    <span className="tp-product-tooltip tp-product-tooltip-right">
                      Add To Compare
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="tp-product-content-2 pt-15">
        <div className="tp-product-tag-2">
          {(tags || []).map((t, i) => (
            <span key={i}>
              {t}
              {i < tags.length - 1 && ","}
            </span>
          ))}
        </div>
        <h3 className="tp-product-title-2">
          <Link href={detailsHref}>{title}</Link>
        </h3>
        <div className="tp-product-rating-icon tp-product-rating-icon-2">
          <Rating allowFraction size={16} initialValue={ratingVal} readonly={true} />
        </div>
        <div className="tp-product-price-wrapper-2">
          <span className="tp-product-price-2 new-price">
            ₹{Number(price || 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
