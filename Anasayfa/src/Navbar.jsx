import React from 'react'
import './Navbar.css'
import logo from './assets/Logo.svg'
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
            if (window.innerWidth > 767) {
              setMenuVisible(false);
            };
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    }, []);
  return (
    <div className="Navbar">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="" />
          <h1>
            Seller <br />
            Nova
          </h1>
        </div>

        {!isMobile && (
          <div className="Menü">
            <div>Anasayfa</div>
            <div>Özellikler</div>
            <div>Paket Fiyatları</div>
            <div>SSS</div>
            <div>Destek</div>
            <div>Blog</div>
            <div>Forum</div>
            <div>Amazon Hesabı Aç</div>
          </div>
        )}

        <button>SellerNova Giriş</button>

        {isMobile && (
          <div
            className={`hamburger ${menuVisible ? "active" : ""}`}
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>

      {isMobile && (
        <div className={`mobile-menu ${menuVisible ? "open" : ""}`}>
          <div>Anasayfa</div>
          <div>Özellikler</div>
          <div>Paket Fiyatları</div>
          <div>SSS</div>
          <div>Destek</div>
          <div>Blog</div>
          <div>Forum</div>
          <div>Amazon Hesabı Aç</div>
        </div>
      )}
      <div className="line"></div>
    </div>
  );
}
