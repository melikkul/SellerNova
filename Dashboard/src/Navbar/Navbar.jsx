import React from 'react'
import "./Navbar.css";
import logo from '../assets/Logo.svg'
import calcucator from '../assets/calculator.svg'
import profile from '../assets/profile.svg'
import Dropdown from './Dropdown.jsx'
import Notification from './Notification.jsx'

export default function Navbar() {

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
    {
      id: 3,
      title: "Ödeme Bildirimi",
      description: "Faturan başarıyla ödendi.",
      date: "2024-02-07",
      read: false,
    },
    {
      id: 4,
      title: "Yeni Bildirim",
      description: "Uygulamada yeni özellikler mevcut!",
      date: "2024-02-06",
      read: false,
    },
    {
      id: 5,
      title: "Güvenlik Uyarısı",
      description: "Şifreniz 30 günde bir değiştirilmeli.",
      date: "2024-02-05",
      read: false,
    },
  ];

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
        <h1>
          Seller <br />
          Nova
        </h1>
      </div>
      <input type="text" placeholder="" className="search-input" />
      <Notification notifications={notifications} />
      <Dropdown />
      <button className="language">
        <img src="" alt="Language İcon" />
      </button>
      <button className="calculator">
        <img src={calcucator} alt="" />
      </button>
      <button className="profile">
        <img src={profile} alt="" />
      </button>
    </div>
  );
}
