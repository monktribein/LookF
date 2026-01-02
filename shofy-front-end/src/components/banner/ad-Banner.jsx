"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AdBanner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Detect mobile vs desktop
  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  const desktopImg = "/assets/banners/cosmetic%20ad%20banner.jpeg";
  const mobileImg = "/assets/banners/cosmetic%20ad%20banner.jpeg";

  // ✅ Manual dimensions
  const desktopDimensions = { width: 1500, height: 500 };
  const mobileDimensions = { width: 330, height: 150 };

  return (
    <section
      className="ad-banner-area"
      style={{
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Link
        href="/ad"
        className="block relative rounded-4 overflow-hidden shadow-sm"
        style={{
          cursor: "pointer",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Image
          src={isMobile ? mobileImg : desktopImg}
          alt="Cosmetic Ad Banner"
          width={isMobile ? mobileDimensions.width : desktopDimensions.width}
          height={isMobile ? mobileDimensions.height : desktopDimensions.height}
          className="rounded-4 w-full h-auto object-cover"
          sizes="100vw"
          priority
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Link>
    </section>
  );
};

export default AdBanner;