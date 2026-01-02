"use client"
import React, { useState } from "react";
import Link from "next/link";
import { mobile_menu } from "@/data/menu-data";

const MobileMenus = () => {
  const [isActiveMenu, setIsActiveMenu] = useState("");

  // toggle sub menu open/close
  const handleOpenSubMenu = (title) => {
    if (title === isActiveMenu) {
      setIsActiveMenu("");
    } else {
      setIsActiveMenu(title);
    }
  };

  return (
    <nav className="tp-main-menu-content">
      <ul>
        {mobile_menu.map((menu) => (
          <li
            key={menu.id}
            className={`${menu.sub_menu ? "has-dropdown" : ""} ${
              isActiveMenu === menu.title ? "dropdown-opened" : ""
            }`}
          >
            {menu.sub_menu ? (
              <>
                <div
                  className={`tp-mobile-link-wrap ${
                    isActiveMenu === menu.title ? "expanded" : ""
                  }`}
                >
                  <Link href={menu.link} className="tp-mobile-link">
                    {menu.title}
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpenSubMenu(menu.title)}
                    className={`dropdown-toggle-btn ${
                      isActiveMenu === menu.title ? "dropdown-opened" : ""
                    }`}
                    aria-label={`Toggle ${menu.title} submenu`}
                  >
                    <i className="fa-regular fa-angle-right"></i>
                  </button>
                </div>

                <ul className={`tp-submenu ${isActiveMenu === menu.title ? "active" : ""}`}>
                  {menu.sub_menus.map((sub, i) => (
                    <li key={i}>
                      <Link href={sub.link}>{sub.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link href={menu.link}>{menu.title}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenus;
