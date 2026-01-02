'use client';
import React from "react";
import { useRouter } from "next/navigation";
// internal
import { useGetCategoriesQuery } from "@/redux/features/categoryApi";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";

const HeaderCategory = ({ isCategoryActive, categoryType = "men" }) => {
  const {data:categories,isError,isLoading} = useGetCategoriesQuery({
    parent: (categoryType || "").toLowerCase(),
    isActive: true,
  });
  const router = useRouter();

  // handle category route
  const handleCategoryRoute = (slug) => {
    const parent = (categoryType || "").toLowerCase();
    // These are sub-categories under a parent (men/women/etc). Use subcategory filter so products load.
    router.push(`/shop?category=${encodeURIComponent(parent)}&subcategory=${encodeURIComponent(slug)}`);
  };
  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <div className="py-5">
        <Loader loading={isLoading} />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && (categories?.data?.length || 0) === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && (categories?.data?.length || 0) > 0) {
    const category_items = categories.data;
    content = category_items.map((item) => (
      <li className="has-dropdown" key={item._id}>
        <a
          className="cursor-pointer"
          onClick={() => handleCategoryRoute(item.slug)}
        >
          {item.name}
        </a>
      </li>
    ));
  }
  return <ul className={isCategoryActive ? "active" : ""}>{content}</ul>;
};

export default HeaderCategory;
