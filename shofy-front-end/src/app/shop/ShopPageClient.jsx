"use client";

import { useSearchParams } from "next/navigation";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import CustomTopDesigner from "@/components/custom/CustomTopDesigner";

const toTitle = (value = "") =>
  value
    .split("-")
    .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
    .join(" ");

export default function ShopPageClient({ initialCategory, hidden_sidebar = false, shop_right = false }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const subCategoryParam = searchParams.get("subCategory");

  const rawTitle =
    categoryParam || subCategoryParam || initialCategory || "Shop Grid";
  const titleText = rawTitle.toLowerCase() === "shop grid" ? "Shop Grid" : `${toTitle(rawTitle)} Shop`;
  const isCustomized = (categoryParam || "").toLowerCase() === "customized-tops";

  return (
    <Wrapper>
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb title={titleText} subtitle={titleText} />
      {isCustomized ? (
        <CustomTopDesigner />
      ) : (
        <ShopArea
          initialCategory={initialCategory}
          hidden_sidebar={hidden_sidebar}
          shop_right={shop_right}
        />
      )}
      <Footer primary_style={true} />
    </Wrapper>
  );
}

