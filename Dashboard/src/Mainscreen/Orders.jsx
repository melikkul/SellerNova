import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import "./Orders.css";

// Chart.js bileşenlerini kaydediyoruz
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function Orders() {
  const [selectedRange, setSelectedRange] = useState("Bugün");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null); // Hover durumunu tutuyoruz
  const [chartData1, setChartData1] = useState(null);
  const [chartData2, setChartData2] = useState(null);

  const dateRanges = [
    "Bugün",
    "Son 7 Gün",
    "Son 30 Gün",
    "Son 3 Ay",
    "Son 6 Ay",
    "Geçen Yıl",
    "Özel",
  ];

  useEffect(() => {
    const generateRandomData = () =>
      Array.from({ length: 7 }, () => Math.floor(Math.random() * 15000));

    setChartData1({
      labels: [
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi",
        "Pazar",
      ],
      datasets: [
        {
          label: `Ürün Satışları ($) - ${selectedRange}`,
          data: generateRandomData(),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    });

    setChartData2({
      labels: [
        "Pazartesi",
        "Salı",
        "Çarşamba",
        "Perşembe",
        "Cuma",
        "Cumartesi",
        "Pazar",
      ],
      datasets: [
        {
          label: `Sipariş Sayısı - ${selectedRange}`,
          data: generateRandomData(),
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    });
  }, [selectedRange]);

  const handleSelect = (range) => {
    setSelectedRange(range);
    setIsDropdownOpen(false);
  };

  return (
    <div className="orders-graphs-container">
      <h3>Satış</h3>

      {/* Dropdown Menü */}
      <div className="dropdown">
        <button
          className="dropdown-button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedRange}{" "}
          <span className="arrow">{isDropdownOpen ? "▲" : "▼"}</span>
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            {dateRanges.map((range) => (
              <li
                key={range}
                className={`dropdown-item ${
                  selectedRange === range ? "selected" : ""
                } ${
                  hoveredItem === "Son 30 Gün" && range === "Son 30 Gün"
                    ? "hovered"
                    : ""
                }`}
                onClick={() => handleSelect(range)}
                onMouseEnter={() => setHoveredItem(range)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {range}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Grafikler */}
      <div className="charts-container">
        <div className="chart">
          {chartData1 && (
            <Line
              data={chartData1}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          )}
        </div>
        <div className="chart">
          {chartData2 && (
            <Line
              data={chartData2}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
