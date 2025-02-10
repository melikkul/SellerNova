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
          Tab 1
        </button>
        <button
          className={`tab-button ${activeTab === "tab2" ? "active" : ""}`}
          onClick={() => setActiveTab("tab2")}
        >
          Tab 2
        </button>
        <button
          className={`tab-button ${activeTab === "tab3" ? "active" : ""}`}
          onClick={() => setActiveTab("tab3")}
        >
          Tab 3
        </button>
        <button
          className={`tab-button ${activeTab === "tab4" ? "active" : ""}`}
          onClick={() => setActiveTab("tab4")}
        >
          Tab 4
        </button>
        <button
          className={`tab-button ${activeTab === "tab5" ? "active" : ""}`}
          onClick={() => setActiveTab("tab5")}
        >
          Tab 5
        </button>
      </div>

      {/* İçerik Alanı */}
      <div className="content">
        {activeTab === "tab1" && (
          <div className="tab-content">
            <h1>Tab 1 İçeriği</h1>
          </div>
        )}
        {activeTab === "tab2" && (
          <div className="tab-content">
            <h1>Tab 2 İçeriği</h1>
          </div>
        )}
        {activeTab === "tab3" && (
          <div className="tab-content">
            <h1>Tab 3 İçeriği</h1>
          </div>
        )}
        {activeTab === "tab4" && (
          <div className="tab-content">
            <h1>Tab 4 İçeriği</h1>
          </div>
        )}
        {activeTab === "tab5" && (
          <div className="tab-content">
            <h1>Tab 5 İçeriği</h1>
          </div>
        )}
      </div>
    </div>
  );
}
