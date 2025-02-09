import React from 'react'
import "./Navbar.css";
import logo from '../assets/Logo.svg'
import bell from '../assets/bell.svg'
import calcucator from '../assets/calculator.svg'
import profile from '../assets/profile.svg'
import Dropdown from './Dropdown.jsx'

export default function Navbar() {
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
      <button className="notification">
        <img src={bell} alt="" />
      </button>
      <Dropdown />
      <button className="language">
        <img src="" alt="Language İcon" />
      </button>
      <button className='calculator'>
        <img src={calcucator} alt="" />
      </button>
      <button className='profile'>
        <img src={profile} alt="" />
      </button>
    </div>
  );
}
