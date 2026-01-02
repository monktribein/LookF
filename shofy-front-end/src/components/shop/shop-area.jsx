'use client'
import React, { useState,useEffect } from "react";
import {useSearchParams} from 'next/navigation';
import Image from "next/image";
import ShopLoader from "../loader/shop/shop-loader";
import ErrorMsg from "../common/error-msg";
import ShopFilterOffCanvas from "../common/shop-filter-offcanvas";
import { useGetAllProductsQuery } from "@/redux/features/productApi";
import ShopContent from "./shop-content";
import { slugify } from "@/utils/slugify";
import ProductItem from "@/components/products/fashion/product-item";

const ShopArea = ({
  shop_right = false,
  hidden_sidebar = false,
  initialCategory,
  initialSubCategory,
  assetCategorySlug = null,
  assetImages = null,
}) => {
  const searchParams = useSearchParams();
  const parentParam = searchParams.get('parent');
  const categoryParam = searchParams.get('category');
  const subCategoryParam = searchParams.get('subcategory');
  const brand = searchParams.get('brand');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const filterColor = searchParams.get('color');
  const status = searchParams.get('status');

  const categorySlug = slugify(categoryParam || initialCategory || "");
  const subCategorySlug = slugify(subCategoryParam || initialSubCategory || "");
  const parentFilter = slugify(parentParam || "");

  const isAssetMode = Array.isArray(assetImages);
  const PRICE_BY_SLUG = {
    tshirts: 599,
    "plain-tshirts": 599,
    "printed-tshirts": 599,
    "regular-fit-t-shirt": 599,
    "polo-tshirts": 799,
    "full-sleeve-tshirts": 699,
    "oversized-tshirts": 699,
    trousers: 1099,
    cargos: 999,
    "cargo-joggers": 999,
    "cargo-pants": 999,
    "casual-shirts": 899,
    "checked-formal-shirts": 999,
    "floral-shirts": 899,
  };
  const prettyTitle = (slug = "") => {
    const s = String(slug || "");
    if (s === "tshirts") return "T-Shirts";
    if (s === "polo-tshirts") return "Polo T-Shirts";
    if (s === "full-sleeve-tshirts") return "Full Sleeve T-Shirts";
    if (s === "oversized-tshirts") return "Oversized T-Shirts";
    if (s === "regular-fit-t-shirt") return "Regular Fit T-Shirts";
    if (s === "cargos") return "Cargos";
    if (s === "cargo-joggers") return "Cargo Joggers";
    if (s === "cargo-pants") return "Cargo Pants";
    if (s === "casual-shirts") return "Casual Shirts";
    if (s === "checked-formal-shirts") return "Checked Formal Shirts";
    if (s === "floral-shirts") return "Floral Shirts";
    if (s === "plain-tshirts") return "Plain T-Shirts";
    if (s === "printed-tshirts") return "Printed T-Shirts";
    if (s === "trousers") return "Trousers";
    return s.replace(/-/g, " ");
  };

  const { data: products, isError, isLoading } = useGetAllProductsQuery({
    category: categorySlug || undefined,
    subcategory: subCategorySlug || undefined,
    parent: parentFilter || undefined,
    status: "active",
  }, { skip: isAssetMode });
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [selectValue, setSelectValue] = useState("");
  const [currPage, setCurrPage] = useState(1);

  // Load the maximum price once the products have been loaded
  useEffect(() => {
    if (!isLoading && !isError && products?.data?.length > 0) {
      const maxPrice = products.data.reduce((max, product) => {
        return product.price > max ? product.price : max;
      }, 0);
      setPriceValue([0, maxPrice]);
    }
  }, [isLoading, isError, products]);

  // handleChanges
  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  // selectHandleFilter
  const selectHandleFilter = (e) => {
    setSelectValue(e.value);
  };

  // other props
  const otherProps = {
    priceFilterValues: {
      priceValue,
      handleChanges,
      setPriceValue,
    },
    selectHandleFilter,
    currPage,
    setCurrPage,
  };
  // decide what to render
  let content = null;

  if (isAssetMode) {
    if (!assetImages || assetImages.length === 0) {
      content = (
        <div className="pb-80 text-center">
          <h3>No items found</h3>
        </div>
      );
    } else {
      const title = prettyTitle(assetCategorySlug || "");
      const price =
        PRICE_BY_SLUG[assetCategorySlug] ??
        PRICE_BY_SLUG[slugify(assetCategorySlug || "")] ??
        599;
      content = (
        <section className="tp-shop-area pb-120">
          <div className="container px-4 md:px-6 lg:px-8">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="tp-shop-main-wrapper">
                  <div className="tp-shop-items-wrapper tp-shop-item-primary">
                    <div className="row">
                      {assetImages.map((src, idx) => (
                        <div
                          key={src}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <ProductItem
                            product={{
                              _id: `asset-shop-${assetCategorySlug || "cat"}-${idx}`,
                              img: src,
                              title,
                              price,
                              tags: [],
                              status: "active",
                              href: assetCategorySlug
                                ? `/shop?navCategory=${assetCategorySlug}`
                                : "/shop",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return <>{content}</>;
  }

  if (isLoading) {
    content = <ShopLoader loading={isLoading}/>;
  }
  if (!isLoading && isError) {
    content = <div className="pb-80 text-center">
      <ErrorMsg msg="There was an error" />
    </div>;
  }
  if (!isLoading && !isError && (products?.data?.length || 0) === 0) {
    content = <ErrorMsg msg="No products found in this category" />;
  }
  if (!isLoading && !isError && (products?.data?.length || 0) > 0) {
    // products
    const rawProducts = products.data;
    let product_items = rawProducts;
    // select short filtering
    if (selectValue) {
      if (selectValue === "Default Sorting") {
        product_items = rawProducts;
      } else if (selectValue === "Low to High") {
        product_items = rawProducts
          .slice()
          .sort((a, b) => Number(a.price) - Number(b.price));
      } else if (selectValue === "High to Low") {
        product_items = rawProducts
          .slice()
          .sort((a, b) => Number(b.price) - Number(a.price));
      } else if (selectValue === "New Added") {
        product_items = rawProducts
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (selectValue === "On Sale") {
        product_items = rawProducts.filter((p) => p.discount > 0);
      } else {
        product_items = rawProducts;
      }
    }

    // status filter
    if (status) {
      if (status === "on-sale") {
        product_items = product_items.filter((p) => p.discount > 0);
      } else if (status === "active") {
        product_items = product_items.filter((p) => p.status === "active");
      }
    }

    // category filter (supports parent/children/mainCategory/subCategory/category.name)
    // color filter
    if (filterColor) {
      product_items = product_items.filter((product) => {
        for (let i = 0; i < product.imageURLs.length; i++) {
          const color = product.imageURLs[i]?.color;
          if (
            color &&
            color?.name.toLowerCase().split(" ").join("-") === filterColor
          ) {
            return true; // match found, include product in result
          }
        }
        return false; // no match found, exclude product from result
      });
    }

    // brand filter
    if (brand) {
      product_items = product_items.filter(
        (p) =>
          p.brand.name.toLowerCase().split(" ").join("-").replace("&", "") ===
          brand
      );
    }

    if(minPrice && maxPrice){
      product_items = product_items.filter((p) => Number(p.price) >= Number(minPrice) && 
      Number(p.price) <= Number(maxPrice))
    }

    // remove specific items by title
    const blockedTitles = [
      "plain crew neck tee - black",
      "plain round neck tee - navy",
      "men round neck t-shirt",
      "classic polo tee - white",
      "striped polo tee - navy",
      "boxers - cotton pack navy",
      "boxers - cotton pack grey",
      "casual shorts - khaki",
      "men casual shirt",
    ];
    product_items = product_items.filter(
      (p) => !blockedTitles.includes((p.title || "").toLowerCase())
    );
    

    content = (
      <>

      <ShopContent 
        all_products={products.data}
        products={product_items}
        otherProps={otherProps}
        shop_right={shop_right}
        hidden_sidebar={hidden_sidebar}
      />
        
         <ShopFilterOffCanvas
          all_products={products.data}
          otherProps={otherProps}
        /> 
      </>
    );
  }
   return (
    <>
      {content}
    </>
  );
};

export default ShopArea;
