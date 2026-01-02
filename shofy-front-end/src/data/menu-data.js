// import home_1 from '@assets/img/menu/menu-home-1.jpg';
import home_2 from '@assets/img/menu/menu-home-2.jpg';
import { slugify } from "@/utils/slugify";
// import home_3 from '@assets/img/menu/menu-home-3.jpg';
// import home_4 from '@assets/img/menu/menu-home-4.jpg';

const menu_data = [
  {
    id: 1,
    homes: true,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    products: true,
    title: 'Men',
    link: '/shop',
    product_pages: [
      {
        title: 'TSHIRTS',
        link: '/shop',
        mega_menus: [
          { title: 'Plain T-shirts', link: `/shop?navCategory=${slugify('Plain T-shirts')}` },
          { title: 'Printed T-shirts', link: `/shop?navCategory=${slugify('Printed T-shirts')}` },
          { title: 'Regular Fit T-shirt', link: `/shop?navCategory=${slugify('Regular Fit T-shirt')}` },
          { title: 'Polo T-shirts', link: `/shop?navCategory=${slugify('Polo T-shirts')}` },
          { title: 'Full Sleeve Tshirts', link: `/shop?navCategory=${slugify('Full Sleeve Tshirts')}` },
          { title: 'OverSized Tshirts', link: `/shop?navCategory=${slugify('OverSized Tshirts')}` },
        ]
      },
      {
        title: 'SHIRTS',
        link: '/product-details',
        mega_menus: [
          { title: 'Formal Shirts', link: '/shop' },
          { title: 'Casual Shirts', link: '/shop' },
          { title: 'Polo Shirts', link: '/shop' },
          { title: 'Full Sleeve Tshirts', link: '/shop' },
          { title: 'Checked Formal Shirts', link: 'shop' },
          { title: 'Floral Shirts', link: '/shop' },
        ],
      },
      {
        title: 'BOTTOM WEAR',
        link: '/shop',
        mega_menus: [
          { title: 'Cargo Joggers', link: `/shop?navCategory=${slugify('Cargo Joggers')}` },
          { title: 'Cargo Pants', link: `/shop?navCategory=${slugify('Cargo Pants')}` },
          { title: 'Trousers', link: '/shop' },
          { title: 'Jeans', link: '/shop' },
          { title: 'Boxers', link: '/shop' },
          { title: 'Shorts', link: 'shop' },
        ]
      },
    ],
    // Special sections for the new layout
    special_offerings: [
      { title: '', image: '/assets/img/navbar/men/men-1.png', link: '/shop/anywhere-shorts' },
      { title: '', image: '/assets/img/navbar/men/men-2.png', link: '/shop/tank-tops' },
      { title: '', image: '/assets/img/navbar/men/men-3.png', link: '/shop/all-day-pants' }
    ],
    trending_collections: [
      { title: '', image: '/assets/img/navbar/men/men1.png', link: '/shop/moye-athleisure' },
      { title: '', image: '/assets/img/navbar/men/men2.png', link: '/shop/international' },
      { title: '', image: '/assets/img/navbar/men/men3.png', link: '/shop/move-international' }
    ],
    banner: {
      title: 'MENS FASHION',
      subtitle: 'EVERYTHING FOR MEN',
      discount: '50% OFF',
      image: '/assets/img/navbar/men/Accessories_Main_Banner.webp',
      contact: {
        website: 'www.craftyart.com',
        social: '@craftyfashionsite',
        phone: '123-456-789'
      }
    }
  },
  {
    id: 3,
    products: true,
    title: 'Women',
    link: '/shop',
    product_pages: [
      {
        title: 'Tshirts',
        link: '/shop',
        mega_menus: [
          { title: 'Plain T-shirts', link: '/shop' },
          { title: 'Printed T-shirts', link: '/shop' },
          { title: 'Regular Fit T-shirt', link: '/shop' },
          { title: 'Polo T-shirts', link: '/shop' },
          { title: 'Full Sleeve Tshirts', link: '/shop' },
          { title: 'OverSized Tshirts', link: 'shop' },
        ]
      },
      {
        title: 'Shirts',
        link: '/product-details',
        mega_menus: [
          { title: 'Formal Shirts', link: '/shop' },
          { title: 'Casual Shirts', link: '/shop' },
          { title: 'Polo Shirts', link: '/shop' },
          { title: 'Full Sleeve Tshirts', link: '/shop' },
          { title: 'Checked Formal Shirts', link: 'shop' },
          { title: 'Floral Shirts', link: '/shop' },
        ],
      },
      {
        title: 'Bottom Wear',
        link: '/shop',
        mega_menus: [
          { title: 'Cargo Joggers', link: '/shop' },
          { title: 'Cargo Pants', link: '/shop' },
          { title: 'Trousers', link: '/shop' },
          { title: 'Jeans', link: '/shop' },
          { title: 'Boxers', link: '/shop' },
          { title: 'Shorts', link: 'shop' },
        ]
      },
      {
        title: 'Athleisure Mode',
        link: '/shop',
        mega_menus: [
          { title: 'Track Pants', link: '/shop' },
          { title: 'Track Suits', link: '/shop' },
          { title: 'Joggers', link: '/shop' },
          { title: 'Sweatshirts', link: '/shop' },
          { title: 'Yoga Pants', link: '/shop' },
          { title: 'Zip-Up Jackets ', link: 'shop' },
        ]
      },
    ],
    // Special sections for Women layout
    special_offerings: [
      { title: '', image: '/assets/img/navbar/women/women-1.png', link: '/shop/summer-dresses' },
      { title: '', image: '/assets/img/navbar/women/women-2.png', link: '/shop/casual-tops' },
      { title: '', image: '/assets/img/navbar/women/women-2.png', link: '/shop/work-wear' }
    ],

    trending_collections: [
      { title: '', image: '/assets/img/navbar/women/women1.png', link: '/shop/evening-gowns' },
      { title: '', image: '/assets/img/navbar/women/women2.png', link: '/shop/festive' },
      { title: '', image: '/assets/img/navbar/women/women2.png', link: '/shop/active' }
    ],

    banner: {
      title: 'WOMEN’S FASHION',
      subtitle: 'STYLE FOR EVERY OCCASION',
      discount: '40% OFF',
      image: '/assets/img/navbar/men/Accessories_Main_Banner.webp',
      contact: {
        website: 'www.craftyart.com',
        social: '@craftywomensite',
        phone: '987-654-321'
      }
    }
  },
  {
    id: 4,
    products: true,
    title: 'Junior',
    link: '/shop',
    product_pages: [
      {
        title: 'Boys',
        link: '/shop',
        mega_menus: [
          { title: 'T-shirts', link: '/shop' },
          { title: 'Shirts', link: '/shop' },
          { title: 'Jeans & Trousers', link: '/shop' },
          { title: 'Sweatshirts & Hoodies', link: '/shop' },
          { title: 'Ethnic Wear (Kurta, Sherwani)', link: '/shop' },
          { title: 'Shorts', link: 'shop' },
        ]
      },
      {
        title: 'Girls',
        link: '/product-details',
        mega_menus: [
          { title: 'Tops & T-Shirts', link: '/shop' },
          { title: 'Dresses & Frocks', link: '/shop' },
          { title: 'Skirts & Shorts', link: '/shop' },
          { title: 'Jeans & Leggings', link: '/shop' },
          { title: 'Sweatshirts & Hoodies', link: 'shop' },
          { title: 'Ethnic Wear (Lehenga, Kurti)', link: '/shop' },
        ],
      },
    ],

    special_offerings: [
      { title: '', image: '/assets/img/navbar/women/women-1.png', link: '/shop/summer-dresses' },
      { title: '', image: '/assets/img/navbar/women/women-2.png', link: '/shop/casual-tops' },
      { title: '', image: '/assets/img/navbar/women/women-2.png', link: '/shop/work-wear' }
    ],

    // Trending Collections
    trending_collections: [
      { title: '', image: '/assets/img/navbar/women/women2.png', link: '/junior/winter' },
      { title: '', image: '/assets/img/navbar/women/women2.png', link: '/junior/summer' },
      { title: '', image: '/assets/img/navbar/women/women2.png', link: '/junior/sportswear' }
    ],

    // Banner
    banner: {
      title: 'KIDS FASHION',
      subtitle: 'TRENDY & COMFY FOR LITTLE ONES',
      image: '/assets/img/navbar/men/Accessories_Main_Banner.webp',
     
    }
  },
  {
    id: 5,
    products: true,
    title: 'Accessories',
    link: '/shop',
    product_pages: [
      {
        title: 'Headwear',
        link: '/shop',
        mega_menus: [
          { title: 'Caps & Hats', link: '/shop' },
          { title: 'Bandanas', link: '/shop' },
          { title: 'Regular Fit T-shirt', link: '/shop' },
          { title: 'Headbands', link: '/shop' },
        ]
      },
      {
        title: 'Fashion Accessories',
        link: '/product-details',
        mega_menus: [
          { title: 'Belts', link: '/shop' },
          { title: 'Cufflinks & Brooches', link: '/shop' },
          { title: 'Wallets & Card Holders', link: '/shop' },
          { title: 'Ties & Bow Ties', link: '/shop' },
          { title: 'Socks', link: '/shop' },
        ],
      },
      {
        title: 'Bags & Carriers',
        link: '/shop',
        mega_menus: [
          { title: 'Backpacks', link: '/shop' },
          { title: 'Sling Bags', link: '/shop' },
          { title: 'Laptop Bags', link: '/shop' },
          { title: 'Tote Bags', link: '/shop' },
        ]
      },

    ],
    // Special Offerings
    special_offerings: [
      { title: '', image: '/assets/img/navbar/women/women-1.png', link: '/shop/caps' },
      { title: '', image: '/assets/img/navbar/women/women-1.png', link: '/shop/belts' },
      { title: '', image: '/assets/img/navbar/women/women-1.png', link: '/shop/wallets' }
    ],

    // Trending Collections
    trending_collections: [
      { title: '', image: '/assets/img/navbar/women/women2.png', link: '/junior/winter' },
      { title: '', image: '/assets/img/navbar/women/women2.png', link: '/junior/summer' },
      { title: '', image: '/assets/img/navbar/women/women2.png', link: '/junior/sportswear' }
    ],

    // Banner
    banner: {
      title: 'ACCESSORIES',
      subtitle: 'STYLE THAT COMPLETES YOU',
      discount: '25% OFF',
      image: '/assets/img/navbar/men/Accessories_Main_Banner.webp',
    }

  },
  {
    id: 6,
    products: true,
    // sub_menu: true,
    title: 'Cosmetic',
    link: '/shop',
    product_pages: [
      {
        title: 'Skincare',
        link: '/shop',
        mega_menus: [
          { title: 'Primer', link: '/shop' },
          { title: 'Sunscreen', link: '/shop' },
          { title: 'Moisturizers', link: '/shop' },
          { title: 'Day Cream', link: '/shop' },
          { title: 'Night Cream', link: '/shop' },
          { title: 'Face Wash/Cleanser', link: '/shop' },
          { title: 'Face Mask', link: '/shop' },
          { title: 'Sheet Mask', link: '/shop' },
          { title: 'Face Pack', link: '/shoP' },
          { title: 'Lip Balm', link: '/shop' },
          { title: 'Wet Tissue', link: '/shop' },
          { title: 'Makeup Remover', link: '/shop' },
        ]
      },
      {
        title: 'Color Cosmetic',
        link: '/shop',
        mega_menus: [
          { title: 'Concealer/Foundation', link: '/shop-category/foundations' },
          { title: 'Compact', link: '/shop-category/concealers' },
          { title: 'Face Powder', link: '/shop-category/blush-bronzer' },
          { title: 'Blush', link: '/shop-category/highlighters' },
          { title: 'Highlighter', link: '/shop-category/eyeshadows' },
          { title: 'Contour', link: '/shop-category/lipsticks' },
          { title: 'Bronzer', link: '/shop-category/mascaras' },
          { title: 'Eye Shadow', link: '/shop-category/mascaras' },
          { title: 'Eyeliner', link: '/shop-category/mascaras' },
          { title: 'Kajal', link: '/shop-category/mascaras' },
          { title: 'Mascara', link: '/shop-category/mascaras' },
          { title: 'Eyebrow Pencil', link: '/shop-category/mascaras' },
          { title: 'Lipstick/Lip Color', link: '/shop-category/mascaras' },
          { title: 'Lip Liner', link: '/shop-category/mascaras' },
          { title: 'Nail Polish', link: '/shop-category/mascaras' },
          { title: 'Nail Paint Remover', link: '/shop-category/mascaras' },
          { title: 'Bindi', link: '/shop-category/mascaras' },
          { title: 'Sindur', link: '/shop-category/mascaras' },
          { title: 'Perfume', link: '/shop-category/mascaras' },
        ]
      }
    ],

    // special offering
    special_offerings: [
      { title: '', image: '/assets/img/navbar/women/women-1.png', link: '/shop/caps' },
      { title: '', image: '/assets/img/navbar/women/women-1.png', link: '/shop/belts' },
      { title: '', image: '/assets/img/navbar/women/women-1.png', link: '/shop/wallets' }
    ],


    // Trending Collections
    trending_collections: [
      { title: '', image: '/assets/img/navbar/women/women2.png', link: '/junior/winter' },
      { title: '', image: '/assets/img/navbar/women/women2.png', link: '/junior/summer' },
      { title: '', image: '/assets/img/navbar/women/women2.png', link: '/junior/sportswear' }
    ],

    // Banner
    banner: {
      title: 'ACCESSORIES',
      subtitle: 'STYLE THAT COMPLETES YOU',
      link: '/cosmetic',
      image: '/assets/img/navbar/men/Accessories_Main_Banner.webp',
    }
  }

]


const mapCategoryLink = (title = "") => {
  const s = slugify(title || "");

  // Normalize common mobile labels to the category keys the products API expects
  // For top-level groups, match desktop behavior: go to Shop (all products) instead of applying a category filter
  // (category-filtered endpoints vary by backend data shape and can return empty on some setups).
  if (s === "mens" || s === "men") return "/shop";
  if (s === "womens" || s === "women") return "/shop";
  if (s === "lookfame-juniors" || s === "juniors" || s === "junior") return "/shop";
  if (s === "accessories") return "/shop";

  // Cosmetics naming varies; keep it consistent
  if (s === "cosmetic" || s === "cosmetics") return "/shop";

  // Default: keep existing behavior
  return `/shop?category=${s}`;
};

const mappedMenu = menu_data.map((item) => {
  const clone = { ...item };
  if (clone.product_pages) {
    clone.product_pages = clone.product_pages.map((pp) => {
      const ppClone = { ...pp };
      if (ppClone.link && ppClone.link.includes("shop")) {
        ppClone.link = mapCategoryLink(ppClone.title);
      }
      if (ppClone.mega_menus) {
        ppClone.mega_menus = ppClone.mega_menus.map((mm) => {
          const mmClone = { ...mm };
          if (mmClone.link && mmClone.link.includes("shop")) {
            mmClone.link = mapCategoryLink(mmClone.title);
          }
          return mmClone;
        });
      }
      return ppClone;
    });
  }
  return clone;
});

export default mappedMenu;

// mobile_menu
const raw_mobile_menu = [
  {
    id: 1,
    homes: true,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    sub_menu: true,
    title: 'Products',
    link: '/shop',
    sub_menus: [
      { title: 'Mens', link: '/shop' },
      { title: 'Womens', link: '/shop' },
      { title: 'Lookfame Juniors', link: '/shop' },
      { title: 'Accessories', link: '/shop' },
    ],
  },
  {
    id: 6,
    sub_menu: true,
    title: 'Cosmetic',
    link: '/shop',
    sub_menus: [
      { title: 'Skincare', link: '/shop' },
      { title: 'Color cosmetic', link: '/shop' },
    ]
  },
  {
    id: 7,
    single_link: true,
    title: 'Contact',
    link: '/contact',
  },
];

export const mobile_menu = raw_mobile_menu.map((m) => {
  const clone = { ...m };
  if (clone.link && clone.link.includes("/shop") && clone.title) {
    clone.link = mapCategoryLink(clone.title);
  }
  if (clone.sub_menus) {
    clone.sub_menus = clone.sub_menus.map((s) => {
      const sClone = { ...s };
      if (sClone.link && sClone.link.includes("/shop")) {
        sClone.link = mapCategoryLink(sClone.title);
      }
      return sClone;
    });
  }
  return clone;
});