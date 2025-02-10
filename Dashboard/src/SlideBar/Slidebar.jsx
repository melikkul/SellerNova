import React from 'react'
import './Slidebar.css'
import "./slideAnimation.jsx"
import Order_icon from "../assets/order-icon.svg"
import Inventory_icon from "../assets/Inventory-icon.svg"
import Security_icon from "../assets/Security-icon.svg"
import Store_icon from "../assets/Store-icon.svg"
import Reports_icon from "../assets/Reports-icon.svg"
import NovaBridge_icon from "../assets/NovaBridge-icon.svg"
import Warehouse_icon from "../assets/Warehouse-icon.svg"
import Slidebar_close from "../assets/Slidebar-close.svg"

export default function Slidebar() {
  return (
    <div className='slidebar'>
        <div className='slidebar-button'>
                <button className='slidebar-close'><img src={Slidebar_close} alt="CLOSE" /></button>
        </div>
        <div className='slidebar-all-button'>
        <button className='slidebar-items' >
                <img src={Order_icon} alt="" className='slidebar-icon'/>Siparişlerim</button>
            <button className='slidebar-items'>
                <img src={Inventory_icon} alt="" className='slidebar-icon'/>Envanter</button>
            <button className='slidebar-items'>
                <img src={Security_icon} alt="" className='slidebar-icon'/>Güvenliklerim</button>
            <button className='slidebar-items'>
                <img src={Store_icon} alt="" className='slidebar-icon'/>Mağazam</button>
            <button className='slidebar-items'>
                <img src={Reports_icon} alt="" className='slidebar-icon'/>Raporlarım</button>
            <button className='slidebar-items'>
                <img src={NovaBridge_icon} alt="" className='slidebar-icon'/>NovaBridge</button>
            <button className='slidebar-items'>
                <img src={Warehouse_icon} alt="" className='slidebar-icon'/>Depolarım</button>
        </div>
    </div>
  )
}

