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
  const [selectedRange, setSelectedRange] = useState("Bugün");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chartData1, setChartData1] = useState(null);
  const [chartData2, setChartData2] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCustomDate, setIsCustomDate] = useState(false);
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const dropdownRef = useRef(null); // Dropdown menü referansı
  

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
  };

  const generateRandomData = (length) =>
    Array.from({ length }, () => Math.floor(Math.random() * 15000));

  useEffect(() => {
    let labels, dataLength;
    let datasets1 = [];
    let datasets2 = [];

    if (selectedRange === "Özel" && customStartDate && customEndDate) {
      // Özel tarih aralığında kaç gün var hesaplanıyor
      const start = new Date(customStartDate);
      const end = new Date(customEndDate);
      const diffTime = Math.abs(end - start);
      dataLength = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Gün farkı +1 ekliyoruz
      labels = Array.from({ length: dataLength }, (_, i) => {
        const date = new Date(start);
        date.setDate(date.getDate() + i);
        return date.toISOString().split("T")[0]; // YYYY-MM-DD formatı
      });
    } else {
      // Önceden tanımlı tarih aralıkları için
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

    datasets1.push({
      label: `Ürün Satışları - ${selectedRange}`,
      data: generateRandomData(dataLength),
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: false,
      tension: 0.4,
    });

    datasets2.push({
      label: `Sipariş Sayısı - ${selectedRange}`,
      data: generateRandomData(dataLength),
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      fill: false,
      tension: 0.4,
    });

    if (comparisonOptions[selectedRange]) {
      comparisonOptions[selectedRange].forEach((comp, index) => {
        datasets1.push({
          label: comp,
          data: generateRandomData(dataLength),
          borderColor: `rgba(${index * 50}, ${200 - index * 30}, ${
            index * 70
          }, 1)`,
          fill: false,
          tension: 0.4,
        });

        datasets2.push({
          label: comp,
          data: generateRandomData(dataLength),
          borderColor: `rgba(${index * 70}, ${index * 50}, ${
            200 - index * 30
          }, 1)`,
          fill: false,
          tension: 0.4,
        });
      });
    }

    setChartData1({
      labels,
      datasets: [
        {
          label: `Ürün Satışları - ${selectedRange}`,
          data: generateRandomData(labels.length),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
          tension: 0.4,
        },
      ],
    });
    setChartData2({
      labels,
      datasets: [
        {
          label: `Sipariş Sayısı - ${selectedRange}`,
          data: generateRandomData(labels.length),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: false,
          tension: 0.4,
        },
      ],
    });
  }, [selectedRange, customStartDate, customEndDate]);

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
              }}
            />
          )}
        </div>
      </div>

      {/* Renk Açıklamaları Grafiklerin Altında */}
      <div className="comparison-info">
        {comparisonOptions[selectedRange]?.map((comp, index) => (
          <p key={index} className="comparison-item">
            <span
              className="color-box"
              style={{
                backgroundColor: `rgba(${index * 50}, ${200 - index * 30}, ${
                  index * 70
                }, 1)`,
              }}
            ></span>
            {comp}
          </p>
        ))}
      </div>
    </div>
  );
}
