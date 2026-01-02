'use client';
import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import { add_cart_product, quantityDecrement, remove_product } from "@/redux/features/cartSlice";

const imageOverrideMap = {
  "boxers - cotton pack grey":
    "https://www.cottontraders.com/dw/image/v2/BCDM_PRD/on/demandware.static/-/Sites-cotton-master-catalog/default/dweb0d79c0/images/original/AJ10592W_original_neutral_charcoal_278091.jpg?sw=549",
  "boxers - cotton pack navy":
    "https://savys.pk/cdn/shop/files/men-cotton-boxer-587701.png?v=1745098410&width=1000",
  "denim jeans - dark wash":
    "https://tse3.mm.bing.net/th/id/OIP.iDTGVM3-q1aRGcMnjpoLggAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
  "denim jeans - light wash":
    "https://peppermayo.co.uk/cdn/shop/files/BackAgainStraightLegDenimJeansLightWashBlue4.jpg?v=1749598102",
  "casual shorts - khaki": "https://m.media-amazon.com/images/I/41QCeJzhL-L.jpg",
  "casual shorts - navy": "https://www.careofcarl.com/bilder/artiklar/zoom/24233311r_3.jpg?m=1678800351",
  "flat front trousers - navy": "https://d3n4hccmbcfj87.cloudfront.net/uploads/2017/08/4PEP1.jpg",
};

const resolveImage = (product = {}) => {
  const title = (product.title || "").toLowerCase();
  const slug = (product.slug || "").toLowerCase();
  const override = Object.entries(imageOverrideMap).find(
    ([key]) => title.includes(key) || slug.includes(key.replace(/\s+/g, "-"))
  );
  if (override) return override[1];
  if (product.img) return product.img;
  if (Array.isArray(product.imageURLs) && product.imageURLs[0]?.img) return product.imageURLs[0].img;
  return "/assets/img/placeholder.png";
};

const CartItem = ({ product }) => {
  const { _id, title, price = 0, orderQuantity = 0 } = product || {};
  const displayImg = resolveImage(product);

  const dispatch = useDispatch();

  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };
  const handleDecrement = (prd) => {
    dispatch(quantityDecrement(prd));
  };
  const handleRemovePrd = (prd) => {
    dispatch(remove_product(prd));
  };

  return (
    <tr>
      {/* img */}
      <td className="tp-cart-img" data-label="">
        <Link href={`/product-details/${_id}`}>
          <Image src={displayImg} alt={title || "product img"} width={70} height={100} />
        </Link>
      </td>
      {/* title */}
      <td className="tp-cart-title" data-label="Product">
        <Link href={`/product-details/${_id}`}>{title}</Link>
      </td>
      {/* price */}
      <td className="tp-cart-price" data-label="Price">
        <span>₹{(price * orderQuantity).toFixed(2)}</span>
      </td>
      {/* quantity */}
      <td className="tp-cart-quantity" data-label="Quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span onClick={() => handleDecrement(product)} className="tp-cart-minus">
            <Minus />
          </span>
          <input className="tp-cart-input" type="text" value={orderQuantity} readOnly />
          <span onClick={() => handleAddProduct(product)} className="tp-cart-plus">
            <Plus />
          </span>
        </div>
      </td>
      {/* action */}
      <td className="tp-cart-action" data-label="">
        <button onClick={() => handleRemovePrd({ title, id: _id })} className="tp-cart-action-btn">
          <Close />
          <span> Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;




