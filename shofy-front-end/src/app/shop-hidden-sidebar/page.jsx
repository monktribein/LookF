import ShopPageClient from "../shop/ShopPageClient";

export const metadata = {
  title: "Shofy - Shop Hidden Sidebar Page",
};

export default function ShopHiddenSidebarPage() {
  return (
    <ShopPageClient hidden_sidebar={true} />
  );
}
