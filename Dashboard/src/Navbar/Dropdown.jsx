import React, { useState } from "react";
import chevronDown from "../assets/chevron-down.svg"; // Aç/Kapa ikonu
import "./Dropdown.css";

// 📌 Ülke bayraklarını React içinden import et
import CanadaFlag from "../assets/flags/canada.svg";
import UKFlag from "../assets/flags/uk.svg";
import GermanyFlag from "../assets/flags/germany.svg";
import FranceFlag from "../assets/flags/france.svg";
import SpainFlag from "../assets/flags/spain.svg";
import ItalyFlag from "../assets/flags/italy.svg";
import JapanFlag from "../assets/flags/japan.svg";
import AustraliaFlag from "../assets/flags/australia.svg";
import MexicoFlag from "../assets/flags/mexico.svg";
import BAEFlag from "../assets/flags/bae.svg";
import NetherlandsFlag from "../assets/flags/netherlands.svg";
import PolandFlag from "../assets/flags/poland.svg";
import SaudiArabiaFlag from "../assets/flags/saudi_arabia.svg";
import SingaporeFlag from "../assets/flags/singapore.svg";
import SwedishFlag from "../assets/flags/swedish.svg";

// 📌 Bayrakları country code ile eşleştiriyoruz
const countryFlags = {
  CA: CanadaFlag,
  GB: UKFlag,
  DE: GermanyFlag,
  FR: FranceFlag,
  ES: SpainFlag,
  IT: ItalyFlag,
  JP: JapanFlag,
  AU: AustraliaFlag,
  MX: MexicoFlag,
  AE: BAEFlag,
  NL: NetherlandsFlag,
  PL: PolandFlag,
  SA: SaudiArabiaFlag,
  SG: SingaporeFlag,
  SE: SwedishFlag,
};

// 📌 API yerine geçici ülke listesi
const tempCountries = [
  { name: "Kanada", code: "CA" },
  { name: "İngiltere", code: "GB" },
  { name: "Almanya", code: "DE" },
  { name: "Fransa", code: "FR" },
  { name: "İspanya", code: "ES" },
  { name: "İtalya", code: "IT" },
  { name: "Japonya", code: "JP" },
  { name: "Avustralya", code: "AU" },
  { name: "Meksika", code: "MX" },
  { name: "BAE", code: "AE" },
  { name: "Hollanda", code: "NL" },
  { name: "Polonya", code: "PL" },
  { name: "Suudi Arabistan", code: "SA" },
  { name: "Singapur", code: "SG" },
  { name: "İsveç", code: "SE" },
];

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Kanada",
    code: "CA",
  }); // Varsayılan olarak Kanada seçili

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false); // Seçim yapıldığında dropdown'ı kapat
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        <img
          src={countryFlags[selectedCountry.code]}
          alt={selectedCountry.name}
          className="dropdown-flag"
        />
        <p>{selectedCountry.name}</p>
        <img
          src={chevronDown}
          alt="Aç/Kapa"
          className={`dropdown-icon-right ${isOpen ? "rotate" : ""}`}
        />
      </button>

      {/* Dropdown Menüsü */}
      {isOpen && (
        <div className="dropdown-menu">
          {tempCountries.map((country, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(country)}
            >
              <img
                src={countryFlags[country.code]}
                alt={country.name}
                className="dropdown-flag"
              />
              {country.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
