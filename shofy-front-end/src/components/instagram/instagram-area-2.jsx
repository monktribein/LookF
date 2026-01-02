'use client';
import React from "react";
import Image from "next/image";

// instagram data
const instagram_data = [
  { id: 1, link: "https://www.instagram.com/lookfameofficial/", img: "/assets/Popular/img%201.jpg" },
  { id: 2, link: "https://www.instagram.com/lookfameofficial/", img: "/assets/Popular/img%202.jpg" },
  { id: 3, link: "https://www.instagram.com/lookfameofficial/", banner: true, img: "/assets/Popular/img%206.jpg" },
  { id: 4, link: "https://www.instagram.com/lookfameofficial/", img: "/assets/Popular/img%203.jpg" },
  { id: 5, link: "https://www.instagram.com/lookfameofficial/", img: "/assets/Popular/img%204.jpg" },
];

const InstagramAreaTwo = () => {
  return (
    <>
      <section className="tp-instagram-area">
        <div className="container-fluid pl-20 pr-20">
          <div className="row row-cols-lg-5 row-cols-sm-2 row-cols-1 gx-2 gy-2 gy-lg-0">
            {instagram_data.map((item) =>
              item.banner ? (
                <div key={item.id} className="col">
                  <div className="tp-instagram-item-2 relative overflow-hidden" style={{ position: "relative" }}>
                    <a href={item.link} target="_blank">
                      <Image
                        src={item.img}
                        alt="instagram img"
                        width={400}
                        height={400}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      <div className="tp-instagram-overlay">
                        <span>Follow on Instagram</span>
                      </div>
                    </a>
                  </div>
                </div>
              ) : (
                <div key={item.id} className="col">
                  <div className="tp-instagram-item-2 relative overflow-hidden" style={{ position: "relative" }}>
                    <a href={item.link} target="_blank" className="popup-image">
                      <Image
                        src={item.img}
                        alt="user image"
                        width={400}
                        height={400}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      <div className="tp-instagram-overlay">
                        <span>Follow on Instagram</span>
                      </div>
                    </a>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <style jsx>{`
        .tp-instagram-item-2 {
          position: relative;
        }
        .tp-instagram-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          text-align: center;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.55) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          padding: 12px;
        }
        .tp-instagram-item-2:hover .tp-instagram-overlay {
          opacity: 1;
        }
        @media (max-width: 767px) {
          .tp-instagram-overlay {
            opacity: 0.9;
          }
        }
      `}</style>
    </>
  );
};


export default InstagramAreaTwo;
