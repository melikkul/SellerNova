import React, { useState, useRef, useEffect } from "react";
import bell from "../assets/bell.svg";
import "./Notification.css";

export default function Notification({ notifications }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Bildirim menüsü referansı

  // Okunmamış bildirim sayısını hesapla
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Bildirim menüsünü aç/kapat
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Dışarıya tıklanınca menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Tıklama olayını dinle
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Komponent kaldırıldığında temizle
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="notification-container" ref={menuRef}>
      <button className="notification" onClick={toggleMenu}>
        <img src={bell} alt="Notification Bell" />
        <span className="notification-badge">
          {unreadCount > 0 ? unreadCount : "0"}
        </span>
      </button>

      {/* Bildirim Menüsü */}
      {isOpen && (
        <div className="notification-menu">
          <h3>Bildirimler</h3>
          {notifications.length === 0 ? (
            <p>Hiç bildiriminiz yok.</p>
          ) : (
            <ul className="notification-list">
              {notifications.map((notif) => (
                <li key={notif.id} className={notif.read ? "read" : "unread"}>
                  <h4>{notif.title}</h4>
                  <p>{notif.description}</p>
                  <span className="notif-date">{notif.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
