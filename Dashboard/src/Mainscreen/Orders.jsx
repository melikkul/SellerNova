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

    // Ana grafik verisi
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

    // **Diğer çizgiler (karşılaştırma verileri) geri eklendi**
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

    setChartData1({ labels, datasets: datasets1 });
    setChartData2({ labels, datasets: datasets2 });
  }, [selectedRange, customStartDate, customEndDate]);

  useEffect(() => {
    // Tıklama dışı kontrolü
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    // Grafik verilerini oluşturma
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

    // Event listener'ı ekle
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup fonksiyonu
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedRange, customStartDate, customEndDate]); // <-- Buradaki noktalı virgül doğru

  const handleSelect = (range) => {
    setSelectedRange(range);
    setIsDropdownOpen(false);
  };

  return (
    <div className="orders-graphs-container">
      <h3>Satış</h3>

      {/* Dropdown Menü */}
      <div className="dropdown-time">
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
