import ShopPageClient from "../shop/ShopPageClient";
import { Suspense } from "react";

export const metadata = {
  title: "Shofy - Shop Right Sidebar Page",
};

export default function ShopRightSidebarPage() {
  return (
    <Suspense fallback={null}>
      <ShopPageClient shop_right={true} />
    </Suspense>
  );
}
