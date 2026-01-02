import React from "react";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/redux/features/categoryApi";

export default function MobileNavbar() {
  const { data: categories } = useGetCategoriesQuery({ isActive: true });
  const items = categories?.data || [];

  const buildHref = (cat) => {
    const parent = (cat?.parent || "").toString().toLowerCase();
    const slug = (cat?.slug || "").toString();
    // If this item is a subcategory (has a parent + parentCategory), route to shop with subcategory filter.
    if (parent && cat?.parentCategory) {
      return `/shop?category=${encodeURIComponent(parent)}&subcategory=${encodeURIComponent(slug)}`;
    }
    // Otherwise treat it as a top-level category listing.
    return `/category/${encodeURIComponent(slug)}`;
  };

  return (
    <div className="bg-white py-6 w-full overflow-hidden">
      <div className="horizontal-scroll">
        {items.map((cat) => (
          <Link key={cat._id} href={buildHref(cat)} className="category-item">
            <div className="category-pill">
              <span className="text-sm font-medium">{cat.name}</span>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .horizontal-scroll {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          overflow-y: hidden;
          gap: 0.5rem;
          white-space: nowrap;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .horizontal-scroll::-webkit-scrollbar {
          display: none;
        }

        .category-item {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
        }

        .category-pill {
          padding: 0.65rem 1.2rem;
          border-radius: 9999px;
          border: 1px solid #e5e7eb;
          background: #fff;
          color: #111827;
        }

        .category-pill:hover {
          border-color: #111827;
        }
      `}</style>
    </div>
  );
}
