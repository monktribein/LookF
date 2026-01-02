import Wrapper from "@/layout/wrapper";
import HeaderTwo from '@/layout/headers/header-2';
import FashionBanner from '@/components/banner/fashion-banner';
// import BeyoungCategories from '@/components/categories/beyoung-categories';
import PopularProducts from '@/components/products/fashion/popular-products';
import CouponBanner from '@/components/coupon/coupon-banner';
import ProductArea from '@/components/products/fashion/product-area';
// import WeeksFeatured from '@/components/products/fashion/weeks-featured';
import TrendingProducts from '@/components/products/fashion/trending-products';
// import BestSellerProducts from '@/components/products/fashion/best-seller-products';
import FashionTestimonial from '@/components/testimonial/fashion-testimonial';
// import BlogArea from '@/components/blog/fashion/blog-area';
import FeatureAreaTwo from '@/components/features/feature-area-2';
import InstagramAreaTwo from '@/components/instagram/instagram-area-2';
import Footer from '@/layout/footers/footer';
import FashionCategory from "@/components/categories/fashion-category";
import JuniorBanner from "@/components/banner/JuniorBanner";
import AdBanner from '@/components/banner/ad-Banner';
import SuperSavingCombos from "@/components/categories/superSavingCombos";
import AutoSlider from "@/components/autoslider/autoslider";
import path from "path";
import fs from "fs/promises";

export const metadata = {
  title: 'LookFame',
  description: 'LookFame – Discover, shop, and stay in style with the latest fashion trends online.',
}

const listImagesInDir = async (absDir) => {
  try {
    const entries = await fs.readdir(absDir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => /\.(png|jpg|jpeg|webp|avif|gif)$/i.test(name))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
};

const listNavbarCategoryImages = async (dirName) => {
  if (!dirName) return [];
  const absDir = path.join(
    process.cwd(),
    "public",
    "assets",
    "Nav bar category",
    "Men",
    dirName
  );
  const files = await listImagesInDir(absDir);
  return files.map((name) => encodeURI(`/assets/Nav bar category/Men/${dirName}/${name}`));
};

export default async function HomePageTwo() {
  // Provide local, static assets for the "Customer Favorite Style Product" tabs.
  // This keeps everything frontend-only and avoids external image URLs.
  const [tshirts, polo, fullSleeve, oversized, regularFit, trousers, casualShirt, checkedFormal, floral] =
    await Promise.all([
      listNavbarCategoryImages("T-shirt"),
      listNavbarCategoryImages("Polo T-shirt"),
      listNavbarCategoryImages("full sleeve t-shirt"),
      listNavbarCategoryImages("over sized t-shirt"),
      listNavbarCategoryImages("regular fit t-shirt"),
      listNavbarCategoryImages("trousers"),
      listNavbarCategoryImages("casual shirt"),
      listNavbarCategoryImages("checked formal shirt"),
      listNavbarCategoryImages("Flora shirt"),
    ]);

  const assetImagesByTab = {
    "All Collection": [
      ...tshirts,
      ...polo,
      ...fullSleeve,
      ...oversized,
      ...regularFit,
      ...trousers,
      ...casualShirt,
      ...checkedFormal,
      ...floral,
    ],
    Shirts: [...casualShirt, ...checkedFormal, ...floral],
    "T-Shirts": [...tshirts, ...regularFit, ...fullSleeve, ...oversized],
    "Polo T-Shirts": [...polo],
    Trousers: [...trousers],
  };

  const assetNewArrivalsImages = [
    ...tshirts,
    ...polo,
    ...fullSleeve,
    ...oversized,
    ...regularFit,
    ...trousers,
    ...casualShirt,
    ...checkedFormal,
    ...floral,
  ];

  const assetNewArrivalsByTab = {
    "View All": assetNewArrivalsImages,
    Shirts: [...casualShirt, ...checkedFormal, ...floral],
    Trousers: [...trousers],
    "T-shirts": [...tshirts, ...regularFit, ...fullSleeve, ...oversized],
    "Polo T-shirts": [...polo],
  };

  const popularFiles = await listImagesInDir(
    path.join(process.cwd(), "public", "assets", "Popular")
  );
  const assetPopularImages = popularFiles.map((name) =>
    encodeURI(`/assets/Popular/${name}`)
  );

  return (
    <Wrapper>
      <HeaderTwo/>
      <FashionBanner/>
      <FashionCategory/>
      <SuperSavingCombos/>
       <AdBanner />
      {/* <BeyoungCategories/> */}
      <PopularProducts assetImages={assetPopularImages} />
      <AutoSlider/>
      <CouponBanner/>
      <ProductArea assetImagesByTab={assetImagesByTab} />
      {/* <WeeksFeatured/> */}
      <TrendingProducts
        assetImages={assetNewArrivalsImages}
        assetImagesByTab={assetNewArrivalsByTab}
      />
       <JuniorBanner /> 
      {/* <BestSellerProducts/> */}
      <FashionTestimonial/>
      {/* <BlogArea/> */}
      {/* <FeatureAreaTwo/> */}
      <InstagramAreaTwo/>
      <Footer style_2={true} />
    </Wrapper>
  )
}
