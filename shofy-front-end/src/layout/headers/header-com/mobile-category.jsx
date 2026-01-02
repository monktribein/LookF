'use client';
import { useRouter } from "next/navigation";
// internal
import { useGetCategoriesQuery } from "@/redux/features/categoryApi";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";

const MobileCategory = ({ isCategoryActive, categoryType }) => {
  const {data: categories,isError,isLoading} = useGetCategoriesQuery({
    parent: categoryType,
    isActive: true,
  });
  const router = useRouter();

  // handle category route
  const handleCategoryRoute = (title) => {
    router.push(`/category/${title}`);
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
        <a className="cursor-pointer" onClick={() => handleCategoryRoute(item.slug)}>
          {item.name}
        </a>
      </li>
    ));
  }
  return <ul className={isCategoryActive ? "active" : ""}>{content}</ul>;
};

export default MobileCategory;
