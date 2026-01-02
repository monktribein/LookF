'use client';
import React from "react";
import ErrorMsg from "../common/error-msg";
import { useGetCategoriesQuery } from "@/redux/features/categoryApi";
import { useRouter } from "next/navigation";
import ShopCategoryLoader from "../loader/shop/shop-category-loader";
import { slugify } from "@/utils/slugify";

const ShopCategoryArea = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery({ isActive: true });
  const router = useRouter();
  // handle category route
  const handleCategoryRoute = (title) => {
    router.push(`/shop?category=${slugify(title)}`);
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopCategoryLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  const categoryList = categories?.data || [];
  if (!isLoading && !isError && categoryList.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categoryList.length > 0) {
    const countsByParent = categoryList.reduce((acc, item) => {
      const p = item?.parent;
      if (!p) return acc;
      acc[p] = (acc[p] || 0) + 1;
      return acc;
    }, {});

    const parentNames = Object.keys(countsByParent).sort((a, b) => a.localeCompare(b));

    content = parentNames.map((parent) => (
      <div key={parent} className="col-lg-3 col-sm-6">
        <div
          className="tp-category-main-box mb-25 p-relative fix"
          style={{ backgroundColor: "#F3F5F7" }}
        >
          <div className="tp-category-main-content">
            <h3
              className="tp-category-main-title pb-1"
              onClick={() => handleCategoryRoute(parent)}
            >
              <a className="cursor-pointer">{parent}</a>
            </h3>
            <span className="tp-category-main-item">
              {countsByParent[parent]} Products
            </span>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <>
      <section className="tp-category-area pb-120">
        <div className="container">
          <div className="row">{content}</div>
        </div>
      </section>
    </>
  );
};

export default ShopCategoryArea;
