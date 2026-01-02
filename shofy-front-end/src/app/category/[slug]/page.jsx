import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import { formatFromSlug } from "@/utils/slugify";

export const metadata = {
  title: "Shofy - Category",
};

export default async function CategoryListingPage({ params }) {
  const { slug } = await params;
  const raw = (slug || "").toString();
  // Back-compat for old links like /category/mens
  const canonicalSlug =
    raw === "mens" ? "men" :
    raw === "womens" ? "women" :
    raw === "lookfame-juniors" ? "junior" :
    raw === "juniors" ? "junior" :
    raw;

  const title = formatFromSlug(canonicalSlug || "");

  return (
    <Wrapper>
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb title={title || "Category"} subtitle={title || "Category"} />
      <ShopArea initialCategory={canonicalSlug} />
      <Footer primary_style={true} />
    </Wrapper>
  );
}

