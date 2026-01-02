import ShopPageClient from "../shop/ShopPageClient";

export const metadata = {
  title: "Shofy - Shop Right Sidebar Page",
};

export default function ShopRightSidebarPage() {
  return (
    <ShopPageClient shop_right={true} />
  );
}
