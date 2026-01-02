'use client';
import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import menu_data from "@/data/menu-data";
import { useGetCategoriesQuery } from "@/redux/features/categoryApi";
import { slugify } from "@/utils/slugify";

const groupKey = (g = "") => g.trim().toLowerCase();
const parentKey = (p = "") => p.trim().toLowerCase();

const Menus = () => {
  const router = useRouter();
  const { data: categories, isError } = useGetCategoriesQuery({ isActive: true });

  const grouped = useMemo(() => {
    const map = {};
    (categories?.data || []).forEach((cat) => {
      const p = parentKey(cat.parent);
      const g = groupKey(cat.group);
      if (!p || !g) return;
      // Only use sub-categories (those that have a parentCategory)
      if (!cat.parentCategory) return;
      if (!map[p]) map[p] = {};
      if (!map[p][g]) map[p][g] = [];
      map[p][g].push(cat);
    });
    if ((categories?.data?.length || 0) === 0) {
      console.warn("[menus] No categories returned from /api/categories");
    }
    return map;
  }, [categories]);

  if (isError) {
    console.warn("[menus] Failed to load categories from /api/categories");
  }

  const buildCategoryHref = (parent, slug) =>
    `/shop?category=${parentKey(parent)}&subcategory=${slugify(slug || "", {
      lower: true,
      strict: true,
    })}`;

  const renderColumnItems = (parent, column, fallbackMenus = []) => {
    const pKey = parentKey(parent);
    const gKey = groupKey(column?.title);
    const dynamicItems = grouped[pKey]?.[gKey];

    if (dynamicItems && dynamicItems.length) {
      return dynamicItems.map((item) => (
        <li key={item._id}>
          <Link href={buildCategoryHref(pKey, item.slug || item.name)}>
            {item.name}
          </Link>
        </li>
      ));
    }

    if (!grouped[pKey]) {
      console.warn(`[menus] No categories for parent=${pKey}`);
    }

    return fallbackMenus?.map((item, j) => (
      <li key={j}>
        <Link href={buildCategoryHref(pKey, slugify(item.title, { lower: true }))}>
          {item.title}
        </Link>
      </li>
    ));
  };

  const handleMenuItemClick = (menu) => {
    if (menu?.link) {
      router.push(menu.link);
    }
  };

  return (
    <ul>
      {menu_data.map((menu) => {
        if (!menu) return null;

        if (menu.products && menu.product_pages) {
          const parent = parentKey(menu.title);

          return (
            <li key={menu.id} className="has-dropdown has-mega-menu jockey-style-mega">
              <Link href={menu.link}>{menu.title}</Link>
              <div className="tp-submenu tp-mega-menu jockey-mega-menu">
                <div className="jockey-mega-wrapper">
                  {/* Left Section: Categories + Banner */}
                  <div className="jockey-left-section">
                    <div className="jockey-categories-section">
                      {menu.product_pages.map((category, i) => (
                        <div key={i} className="jockey-category-column">
                          <h4 className="jockey-category-title">{category.title}</h4>
                          <ul className="jockey-category-items">
                            {renderColumnItems(parent, category, category.mega_menus)}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {menu.banner && (
                      <div className="jockey-banner-right">
                        <div className="jockey-banner-container">
                          <div className="jockey-banner-image">
                            <button onClick={() => handleMenuItemClick(menu)}>
                              <Image
                                src={menu.banner.image}
                                alt={menu.banner.title}
                                width={400}
                                height={600}
                                className="banner-img"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Section: Offers + Trending */}
                  <div className="jockey-offers-section">
                    {menu.special_offerings && (
                      <div className="jockey-special-offerings">
                        <h4 className="jockey-section-title">OUR SPECIAL OFFERINGS</h4>
                        <div className="jockey-offerings-grid">
                          {menu.special_offerings.map((offering, i) => (
                            <Link key={i} href={offering.link} className="jockey-offering-item">
                              <div className="jockey-offering-image">
                                <Image
                                  src={offering.image}
                                  alt={offering.title}
                                  width={80}
                                  height={80}
                                  className="offering-img"
                                />
                              </div>
                              <span className="jockey-offering-text">{offering.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {menu.trending_collections && (
                      <div className="jockey-trending-collections">
                        <h4 className="jockey-section-title">TRENDING COLLECTIONS</h4>
                        <div className="jockey-trending-grid">
                          {menu.trending_collections.map((trend, i) => (
                            <Link key={i} href={trend.link} className="jockey-trending-item">
                              <div className="jockey-trending-image">
                                <Image
                                  src={trend.image}
                                  alt={trend.title}
                                  width={60}
                                  height={60}
                                  className="trending-img"
                                />
                              </div>
                              <span className="jockey-trending-text">{trend.title}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        }

        if (menu.sub_menu && menu.sub_menus) {
          return (
            <li key={menu.id} className="has-dropdown">
              <Link href={menu.link}>{menu.title}</Link>
              <ul className="tp-submenu">
                {menu.sub_menus.map((b, i) => (
                  <li key={i}>
                    <Link href={b.link}>{b.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        }

        return (
          <li key={menu.id}>
            <Link href={menu.link}>{menu.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menus;
