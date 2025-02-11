import React, { useState } from "react";
import "./Screen.css";

export default function Screen({ navbarHeight, slidebarWidth }) {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div
      className="screen-container"
      style={{
        marginTop: `${navbarHeight}px`,
        marginLeft: `${slidebarWidth}px`,
      }}
    >
      {/* Butonlar */}
      <div className="button-container">
        <button
          className={`tab-button ${activeTab === "tab1" ? "active" : ""}`}
          onClick={() => setActiveTab("tab1")}
        >
          <h2>Satış</h2> 
          <p>Bugünki Satış</p>
        </button>
        <button
          className={`tab-button ${activeTab === "tab2" ? "active" : ""}`}
          onClick={() => setActiveTab("tab2")}
        >
          <h2>Envanter</h2>
          <p>Aktif</p>
        </button>
        <button
          className={`tab-button ${activeTab === "tab3" ? "active" : ""}`}
          onClick={() => setActiveTab("tab3")}
        >
          <h2>Siparişler</h2>
          <p>Son 30 Gün</p>
        </button>
        <button
          className={`tab-button ${activeTab === "tab4" ? "active" : ""}`}
          onClick={() => setActiveTab("tab4")}
        >
          <h2>Mesajlar</h2>
          <p>Aktif</p>
        </button>
        <button
          className={`tab-button ${activeTab === "tab5" ? "active" : ""}`}
          onClick={() => setActiveTab("tab5")}
        >
          <h2>Tahmini Kar</h2>
          <p>Son 30 Gün</p>
        </button>
        <button
          className={`tab-button ${activeTab === "tab6" ? "active" : ""}`}
          onClick={() => setActiveTab("tab6")}
        >
          <h2>Hesap Sağlığı</h2>
          <p>Son Güncelleme:</p> 
        </button>
      </div>

      {/* İçerik Alanı */}
      <div className="content">
        {activeTab === "tab1" && (
          <div className="tab-content">
            <h1>Satış</h1>
          </div>
        )}
        {activeTab === "tab2" && (
          <div className="tab-content">
            <h1>Envanter</h1>
          </div>
        )}
        {activeTab === "tab3" && (
          <div className="tab-content">
            <h1>Siperişler</h1>
          </div>
        )}
        {activeTab === "tab4" && (
          <div className="tab-content">
            <h1>Mesajlar</h1>
          </div>
        )}
        {activeTab === "tab5" && (
          <div className="tab-content">
            <h1>Tahmini Kar</h1>
          </div>
        )}
        {activeTab === "tab6" && (
          <div className="tab-content">
            <h1>Hesap Sağlığı</h1>
          </div>
        )}
      </div>
    </div>
  );
}
