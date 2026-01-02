import React from "react";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/redux/features/categoryApi";

export default function MobileNavbar() {
  const { data: categories } = useGetCategoriesQuery({ isActive: true });
  const items = categories?.data || [];

  return (
    <div className="bg-white py-6 w-full overflow-hidden">
      <div className="horizontal-scroll">
        {items.map((cat) => (
          <Link key={cat._id} href={`/category/${cat.slug}`} className="category-item">
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
