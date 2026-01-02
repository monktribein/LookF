import ShopPageClient from "../shop/ShopPageClient";
import { Suspense } from "react";

export const metadata = {
  title: "Shofy - Shop Hidden Sidebar Page",
};

export default function ShopHiddenSidebarPage() {
  return (
    <Suspense fallback={null}>
      <ShopPageClient hidden_sidebar={true} />
    </Suspense>
  );
}
