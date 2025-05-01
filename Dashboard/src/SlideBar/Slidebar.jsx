import React, { useRef, useEffect, useState } from "react";
import "./Slidebar.css";
import Order_icon from "../assets/order-icon.svg";
import Inventory_icon from "../assets/inventory-icon.svg";
import Security_icon from "../assets/security-icon.svg";
import Store_icon from "../assets/store-icon.svg";
import Reports_icon from "../assets/reports-icon.svg";
import NovaBridge_icon from "../assets/NovaBridge-icon.svg";
import Warehouse_icon from "../assets/warehouse-icon.svg";
import Slidebar_close from "../assets/Slidebar-close.svg";

export default function Slidebar({ navbarHeight, setSlidebarWidth }) {
  const sidebarRef = useRef(null);
  const [activeButton, setActiveButton] = useState(null); // Seçili buton

  useEffect(() => {
    if (sidebarRef.current) {
      setSlidebarWidth(sidebarRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (sidebarRef.current) {
        setSlidebarWidth(sidebarRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSlidebarWidth]);

  const buttons = [
    { icon: Order_icon, text: "Siparişlerim" },
    { icon: Inventory_icon, text: "Envanter" },
    { icon: Security_icon, text: "Güvenliklerim" },
    { icon: Store_icon, text: "Mağazam" },
    { icon: Reports_icon, text: "Raporlarım" },
    { icon: NovaBridge_icon, text: "NovaBridge" },
    { icon: Warehouse_icon, text: "Depolarım" },
  ];

  return (
    <div
      className="slidebar"
      ref={sidebarRef}
      style={{ top: `${navbarHeight}px` }}
    >
      <div className="slidebar-button">
        <button className="slidebar-close">
          <img src={Slidebar_close} alt="CLOSE" />
        </button>
      </div>
      <div className="slidebar-all-button">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className={`slidebar-items ${
              activeButton === index ? "active" : ""
            }`}
            onClick={() => setActiveButton(index)}
          >
            <img src={btn.icon} alt="" className="slidebar-icon" />
            {btn.text}
          </button>
        ))}
      </div>
    </div>
  );
}
