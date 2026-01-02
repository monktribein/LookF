import React from "react";
import { useRouter } from "next/navigation";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetCategoriesQuery } from "@/redux/features/categoryApi";
import CategoryListLoader from "@/components/loader/home/category-list-loader";

const PrdCategoryList = () => {
  const {
    data: categories,
    isError,
    isLoading,
  } = useGetCategoriesQuery({ isActive: true });
  const router = useRouter()

  // handle category route
  const handleCategoryRoute = (title) => {
    router.push(
      `/shop?category=${title
        .toLowerCase()
        .replace("&", "")
        .split(" ")
        .join("-")}`
    )
  }
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <CategoryListLoader loading={isLoading}/>;
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
      <li key={item._id}>
        <a onClick={()=>handleCategoryRoute(item.name)} className="cursor-pointer">{item.name}</a>
      </li>
    ));
  }
  return <ul>{content}</ul>;
};

export default PrdCategoryList;
