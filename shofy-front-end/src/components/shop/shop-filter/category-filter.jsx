'use client'
import React from "react";
import { useRouter,useSearchParams, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetShowCategoryQuery } from "@/redux/features/categoryApi";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ShopCategoryLoader from "@/components/loader/shop/shop-category-loader";
import { slugify } from "@/utils/slugify";

const CategoryFilter = ({setCurrPage,shop_right=false}) => {
  const { data: categories, isLoading, isError } = useGetShowCategoryQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const category =
    searchParams.get('category') ||
    (pathname?.startsWith("/category/") ? pathname.replace("/category/", "") : "");
  const activeCategorySlug = slugify(category);

  // handle category route
  const handleCategoryRoute = (title) => {
    setCurrPage(1);
    const slug = slugify(title);
    router.push(`/category/${slug}`);
    dispatch(handleFilterSidebarClose());
  }
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopCategoryLoader loading={isLoading}/>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.result?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.result?.length > 0) {
    const category_items = categories.result;
    content = category_items.map((item) => (
      <li key={item._id}>
        <a
          onClick={() => handleCategoryRoute(item.parent)}
          style={{ cursor: "pointer" }}
          className={
            activeCategorySlug ===
            slugify(item.parent)
              ? "active"
              : ""
          }
        >
          {item.parent} <span>{item.products.length}</span>
        </a>
      </li>
    ));
  }
  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Categories</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-categories">
            <ul>{content}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
