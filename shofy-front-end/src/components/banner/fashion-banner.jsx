'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// 🖼️ Desktop/Mobile images (new banner assets)
import banner1 from '@assets/lookfame banners/1.jpg';
import banner2 from '@assets/lookfame banners/2.jpg';
import banner3 from '@assets/lookfame banners/3.jpg';
import banner4 from '@assets/lookfame banners/4.jpg';
import banner5 from '@assets/lookfame banners/5.jpg';

// Slider data with desktop + mobile versions
const slider_data = [
  { id: 1, imgDesktop: banner1, imgMobile: banner1, link: '/category/winter' },
  { id: 2, imgDesktop: banner2, imgMobile: banner2, link: '/category/pyjamas' },
  { id: 3, imgDesktop: banner3, imgMobile: banner3, link: '/category/korean' },
  { id: 4, imgDesktop: banner4, imgMobile: banner4, link: '/category/flannel' },
  { id: 5, imgDesktop: banner5, imgMobile: banner5, link: '/category/new-arrivals' },
];

const slider_setting = {
  slidesPerView: 1,
  spaceBetween: 0,
  effect: 'fade',
  loop: true,
  pagination: {
    el: '.tp-slider-2-dot',
    clickable: true,
  },
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  speed: 1000,
};

const FashionBanner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const secondaryBanners = [banner4, banner5];

  // ✅ Detect viewport size after mount
  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    
    const checkViewport = () => setIsMobile(window.innerWidth <= 768);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Prevent hydration mismatch by not rendering Swiper until mounted
  if (!mounted) {
    return (
      <section
        className="tp-slider-area relative z-[1] overflow-hidden"
        style={{
          padding: 0,
          margin: 0,
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="tp-slider-item-2 tp-slider-height-2 relative w-full flex items-center justify-center bg-gray-50"
          style={{ padding: 0, margin: 0, minHeight: isMobile ? "300px" : "500px" }}
        >
          <Image
            src={banner1}
            alt="slide-placeholder"
            width={banner1.width}
            height={banner1.height}
            className="w-full h-auto object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        className="tp-slider-area relative z-[1] overflow-hidden"
        style={{
          padding: 0,
          margin: 0,
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Swiper
          {...slider_setting}
          modules={[Pagination, EffectFade, Autoplay]}
          className="tp-slider-active-2 swiper-container relative"
        >
          {slider_data.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                href={item.link}
                className="block relative rounded-4 overflow-hidden shadow-sm"
                style={{ cursor: "pointer", width: "100%", maxWidth: "100%", margin: "0 auto" }}
              >
                <div
                  className="tp-slider-item-2 tp-slider-height-2 relative w-full flex items-center justify-center bg-gray-50 overflow-hidden"
                  style={{ padding: 0, margin: 0 }}
                >
                  <Image
                    src={isMobile ? item.imgMobile : item.imgDesktop}
                    alt={`slide-${item.id}`}
                    width={item.imgDesktop.width}
                    height={item.imgDesktop.height}
                    className="w-full h-auto object-cover"
                    sizes="100vw"
                    priority
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}

          {/* Pagination Dots */}
          <div className="tp-swiper-dot tp-slider-2-dot absolute bottom-6 left-1/2 -translate-x-1/2 z-[50] flex justify-center"></div>
        </Swiper>
      </section>

      {/* Secondary banner row
      <section className="tp-slider-area relative z-[1] overflow-hidden mt-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryBanners.map((imgSrc, idx) => (
              <div key={idx} className="relative w-full h-[220px] md:h-[320px] overflow-hidden rounded-lg">
                <Image
                  src={imgSrc}
                  alt={`secondary-banner-${idx + 1}`}
                  fill
                  className="object-cover w-full h-full"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
};

export default FashionBanner;