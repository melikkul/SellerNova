import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Orders.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Orders() {
  const [selectedRange, setSelectedRange] = useState("Son 30 Gün");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chartData1, setChartData1] = useState(null);
  const [chartData2, setChartData2] = useState(null);
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [isCustomDate, setIsCustomDate] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const dropdownRef = useRef(null);

  const dateRanges = [
    "Bugün",
    "Son 7 Gün",
    "Son 30 Gün",
    "Son 3 Ay",
    "Son 6 Ay",
    "Geçen Yıl",
    "Özel",
  ];

  const comparisonOptions = {
    Bugün: [
      "Bugün şimdiye kadar",
      "Dün",
      "Geçen hafta aynı gün",
      "Geçen yıl aynı gün",
    ],
    "Son 7 Gün": [
      "Son 7 gün",
      "Geçen hafta aynı 7 gün",
      "Geçen ayın aynı 7 günü",
      "Geçen yılın aynı 7 günü",
    ],
    "Son 30 Gün": [
      "Son 30 gün",
      "Geçen ayın aynı 30 günü",
      "Geçen yılın aynı 30 günü",
    ],
    "Son 3 Ay": ["Son 3 ay", "Geçen yılın aynı 3 ayı"],
    "Son 6 Ay": ["Son 6 ay", "Geçen yılın aynı 6 ayı"],
    "Geçen Yıl": ["Geçen yıl", "Önceki yıl"],
    Özel: ["Özel tarih aralığı", "Geçen yıl aynı tarih aralığı"],
  };

  const productSalesColors = [
    "rgba(75, 192, 192, 1)", // Ürün Satışları için renk 1
    "rgba(54, 162, 235, 1)", // Ürün Satışları için renk 2
    "rgba(255, 206, 86, 1)", // Ürün Satışları için renk 3
    "rgba(153, 102, 255, 1)", // Ürün Satışları için renk 4
  ];

  const orderCountColors = [
    "rgba(75, 192, 192, 1)", // Ürün Satışları için renk 1
    "rgba(54, 162, 235, 1)", // Ürün Satışları için renk 2
    "rgba(255, 206, 86, 1)", // Ürün Satışları için renk 3
    "rgba(153, 102, 255, 1)", // Ürün Satışları için renk 4
  ];

  const generateRandomData = (length) =>
    Array.from({ length }, () => Math.floor(Math.random() * 15000));
  const generateRandomData2 = (length, max = 20) =>
    Array.from({ length }, () => Math.floor(Math.random() * (max + 1)));


  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  };

  useEffect(() => {
    let labels, dataLength;
    let datasets1 = [];
    let datasets2 = [];
    let legendColors = [];

    if (selectedRange === "Bugün") {
      dataLength = 24;
      labels = Array.from({ length: dataLength }, (_, i) => `${i}:00`);
    } else if (selectedRange === "Özel" && customStartDate && customEndDate) {
      const start = new Date(customStartDate);
      const end = new Date(customEndDate);
      const diffTime = Math.abs(end - start);
      dataLength = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      labels = Array.from({ length: dataLength }, (_, i) => {
        const date = new Date(start);
        date.setDate(date.getDate() + i);
        return date.toISOString().split("T")[0];
      });
    } else {
      switch (selectedRange) {
        case "Son 7 Gün":
          dataLength = 7;
          break;
        case "Son 30 Gün":
          dataLength = 30;
          break;
        case "Son 3 Ay":
          dataLength = 90;
          break;
        case "Son 6 Ay":
          dataLength = 180;
          break;
        case "Geçen Yıl":
          dataLength = 365;
          break;
        default:
          dataLength = 1;
      }
      labels = Array.from({ length: dataLength }, (_, i) => `Gün ${i + 1}`);
    }

    const productSalesColor = generateRandomColor();
    const orderCountColor = generateRandomColor();

    datasets1.push({
      label: `Ürün Satışları - ${selectedRange}`,
      data: generateRandomData(dataLength),
      borderColor: productSalesColors[0], // İlk renk kullanılıyor
      backgroundColor: productSalesColors[0].replace("1)", "0.2)"), // Şeffaf versiyon
      fill: false,
      tension: 0.4,
    });

    datasets2.push({
      label: `Sipariş Sayısı - ${selectedRange}`,
      data: generateRandomData2(dataLength),
      borderColor: orderCountColors[0], // İlk renk kullanılıyor
      backgroundColor: orderCountColors[0].replace("1)", "0.2)"),
      fill: false,
      tension: 0.4,
    });



   if (comparisonOptions[selectedRange]) {
     comparisonOptions[selectedRange].forEach((comp, index) => {
       const productComparisonColor =
         productSalesColors[index % productSalesColors.length];
       const orderComparisonColor =
         orderCountColors[index % orderCountColors.length];

       datasets1.push({
         label: comp,
         data: generateRandomData(dataLength),
         borderColor: productComparisonColor,
         fill: false,
         tension: 0.4,
       });

       datasets2.push({
         label: comp,
         data: generateRandomData2(dataLength),
         borderColor: orderComparisonColor,
         fill: false,
         tension: 0.4,
       });

       // Her karşılaştırma için sadece bir legend ekliyoruz (Ürün Satışları + Sipariş Sayısı)
       legendColors.push(
         { label: `${comp}`, color: productComparisonColor }
       );
     });
   }

    setChartData1({ labels, datasets: datasets1 });
    setChartData2({ labels, datasets: datasets2 });

    setLegendColors(
      datasets1.map((dataset, index) => ({
        label: dataset.label,
        color: productSalesColors[index % productSalesColors.length], // Burada manuel olarak belirlediğiniz renkten alıyoruz
      }))
    );

  }, [selectedRange, customStartDate, customEndDate]);

  const [legendColors, setLegendColors] = useState([]);


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="orders-graphs-container">
      <h3>Satış</h3>
      <p className="last-updated">Son Günc.: {today}</p>

      {/* Dropdown */}
      <div className="dropdown-time" ref={dropdownRef}>
        <button
          className="dropdown-time-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedRange}{" "}
          <span className="arrow">{isDropdownOpen ? "▲" : "▼"}</span>
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-time-menu">
            {dateRanges.map((range) => (
              <li
                key={range}
                className={`dropdown-time-item ${
                  selectedRange === range ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedRange(range);
                  setIsDropdownOpen(false); // Seçildiğinde menüyü kapat
                  setIsCustomDate(range === "Özel");
                }}
              >
                {range}
              </li>
            ))}
          </ul>
        )}
      </div>

      {isCustomDate && (
        <div className="custom-date-wrapper">
          <div className="custom-date-container">
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              max={customEndDate || today}
            />
          </div>
          <div className="custom-date-container">
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              min={customStartDate}
              max={today}
            />
          </div>
        </div>
      )}

      {/* Göstergeler */}
      <div className="stats-container">
        <div className="stat-box">
          <p className="stat-title">Siparişli Ürün Sayıları</p>
          <p className="stat-value">$0</p>
        </div>
        <div className="stat-box">
          <p className="stat-title">Ortalama Adet / Sipariş</p>
          <p className="stat-value">0</p>
        </div>
        <div className="stat-box">
          <p className="stat-title">Ortalama Satış / Sipariş</p>
          <p className="stat-value">$0</p>
        </div>
        <div className="stat-box">
          <p className="stat-title">Buybox Oranı</p>
          <p className="stat-value">%69</p>
        </div>
      </div>

      {/* Grafikler */}
      <div className="charts-container">
        <div className="chart">
          {chartData1 && (
            <Line
              data={chartData1}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          )}
        </div>
        <div className="chart">
          {chartData2 && (
            <Line
              data={chartData2}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: {
                    beginAtZero: true, // Y ekseni sıfırdan başlasın
                    min: 0, // Minimum değer 0
                    max: 20, // Maksimum değer 20
                    ticks: {
                      stepSize: 2, // 2'şer artan aralıklarla göster
                    },
                  },
                },
              }}
            />
          )}
        </div>
      </div>

      {/* Renk Açıklamaları Grafiklerin Altında */}
      <div className="comparison-info">
        {legendColors.map((item, index) => (
          <p className="comparison-item" key={index}>
            <span
              className="color-box"
              style={{ backgroundColor: item.color }} // Renkler artık datasets1’deki renkler olacak
            ></span>
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
}
