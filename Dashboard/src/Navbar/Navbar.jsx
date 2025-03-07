import React, { useRef, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/Logo.svg";
import calcucatorIcon from "../assets/calculator.svg";
import profile from "../assets/profile.svg";
import Dropdown from "./Dropdown.jsx";
import Notification from "./Notification.jsx";
import calculator from "./calculator.jsx"

export default function Navbar({ setNavbarHeight }) {
  const navbarRef = useRef(null);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setNavbarHeight]);

  const notifications = [
  {
    id: 1,
    title: "Yeni Mesaj",
    description: "Sana yeni bir mesaj geldi!",
    date: "2024-02-09",
    read: false,
  },
  {
    id: 2,
    title: "Sistem Güncellemesi",
    description: "Yarın planlı bakım yapılacaktır.",
    date: "2024-02-08",
    read: true,
  },
];

  return (
    <div className="navbar" ref={navbarRef}>
      <div className="logo">
        <img src={logo} alt="" />
        <h1>
          Seller <br /> Nova
        </h1>
      </div>
      <input type="text" placeholder="" className="search-input" />
      <Notification notifications={ notifications } />
      <Dropdown />
      <button className="language">
        <img src="" alt="Language İcon" />
      </button>
      <button className="calculator" onClick={() => setShowCalculator(!showCalculator)}>
        <img src={calcucatorIcon} alt="Calculator" />
      </button>
      <button className="profile">
        <img src={profile} alt="" />
      </button>
      {showCalculator && (
        <div className="calculator-modal">
          <div className="calculator-overlay" onClick={() => setShowCalculator(false)}></div>
          <div className="calculator-container">
            <calculator />
            <button className="close-btn" onClick={() => setShowCalculator(false)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}


