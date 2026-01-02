'use client';
import React from "react";
import Image from "next/image";

// instagram data
const instagram_data = [
  { id: 1, link: "https://www.instagram.com/lookfameofficial/", img: "/assets/Popular/img%201.jpg" },
  { id: 2, link: "https://www.instagram.com/lookfameofficial/", img: "/assets/Popular/img%202.jpg" },
  { id: 3, link: "https://www.instagram.com/lookfameofficial/", banner: true, img: "/assets/Popular/R.png" },
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
                        <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                        <span className="sr-only">Follow on Instagram</span>
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
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.55) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          padding: 12px;
        }
        .tp-instagram-overlay i {
          font-size: 42px;
          line-height: 1;
          background: rgba(0, 0, 0, 0.35);
          width: 72px;
          height: 72px;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(2px);
        }
        .tp-instagram-item-2:hover .tp-instagram-overlay {
          opacity: 1;
        }
        /* screen-reader only */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        @media (max-width: 767px) {
          .tp-instagram-overlay {
            opacity: 0.9;
          }
          .tp-instagram-overlay i {
            font-size: 36px;
            width: 64px;
            height: 64px;
          }
        }
      `}</style>
    </>
  );
};


export default InstagramAreaTwo;
