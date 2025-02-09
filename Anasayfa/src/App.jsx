import './App.css'
import Navbar from './Navbar.jsx'
import Cards from './Cards.jsx'
import anasayfa from './assets/anasayfa.svg'
import vector from './assets/sn-vector.svg'
import hizli from './assets/hizli.svg'
import yediyirmidört from './assets/724.svg'
import ai from './assets/ai.svg'
import yenilik from './assets/yenilik.svg'
import { useState } from'react';
import Flag from './Flag.jsx'
import "./Flag.css";

function App() {
  const totalFlags = 15; // Toplam bayrak sayısı
  const flagsPerRow = 8; // İlk satırda 8, ikinci satırda kalanlar olacak
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // X ve Y ekseninde hareketi hesapla
    const rotateX = (clientY - centerY) / 50;
    const rotateY = (clientX - centerX) / 50;

    setRotation({ x: rotateX, y: rotateY });
  };

  return (
    <div className="Anasayfa">
      <Navbar />
      <div className="part1">
        <div className="ilkbaslik">
          <h3>YAPAY ZEKA DESTEKLİ, GÜVENLİ, KÂRLI</h3>
          <h1>YAPAY ZEKA DESTEKLİ AMAZON DROPSHİPİNG OTOMASYONU</h1>
          <h4>
            Dünyanın dört bir yanında kârınızı artırmak ve risklerinizi azaltmak
            için tasarlanmış e-ticaret platformu. <br />
            <span className="light-text">
              SellerNova’nın yapay zekâ gücü ile güvenli, hızlı ve kazançlı bir
              e-ticaret deneyimi yaşayın!
            </span>
          </h4>
          <div className="risk-container">
            <ul className="risk-list">
              <li>Yapay Zekâ ile Risk Tespiti</li>
              <li>1 Dakikada Repricer</li>
              <li>İhlal Riski Yönetimi</li>
              <li>Uzman Suspend Ekibi</li>
              <li>7/24 Destek</li>
            </ul>
            <p className="more-info">ve Daha Fazlası...</p>
          </div>
          <button className="paket-button">
            <img src={vector} alt="SellerNova İkon" className="button-img" />
            Paketleri İncele
          </button>
        </div>
        <div onMouseMove={handleMouseMove}>
          <img
            src={anasayfa}
            alt="Amazon Dropshipping"
            className="anasayfa-img"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}
          />
        </div>
      </div>
      <div className="part2">
        <h2>
          “Stoksuz Ticaretin Geleceği: SellerNova ile Hayatınızı Kolaylaştırın!”
        </h2>
        <h1>Neden SellerNova ?</h1>
        <div className="all-cards">
          <Cards
            image={hizli}
            title="Kesinlik ve Hızlı Adaptasyon"
            description={
              <>
                SellerNova’nın yapay zekâ destekli sistemleri, Amazon’un süreç
                ve yapısal değişikliklerini anında tespit eder. Siz farkına
                varmadan aksiyon alır ve işinizi güvenle sürdürmenizi sağlar.
                Tüm süreçlerinizde %100 uyum ve kesintisizlik garantisi!
              </>
            }
          />
          <Cards
            image={yediyirmidört}
            title="7/24 Kesintisiz Destek"
            description={
              <>
                Ne zaman ihtiyacınız olursa olsun yanınızdayız! 7 gün 24 saat
                hizmet veren profesyonel ekibimizle tüm sorunlarınıza 1 saat
                içinde çözüm sunuyoruz. Sorunsuz bir e-ticaret deneyimi için
                <span className="bold-text">her zaman buradayız.</span>
              </>
            }
          />
          <Cards
            image={ai}
            title="Yapay Zekâ ile Güvenle Büyüyün"
            description={
              <>
                SellerNova’nın
                <span className="bold-text">Yasaklı Ürün Tespit Sistemi</span>,
                Amazon politikalarına aykırı ürünleri anında belirler ve
                engeller. Yapay zekâ destekli teknolojilerimizle hesabınızı
                güvende tutarken satışlarınızı hızla artırabilirsiniz. Güvenli
                ve sürdürülebilir büyüme için SellerNova yanınızda!
              </>
            }
          />
          <Cards
            image={yenilik}
            title="Yeniliklerle Dolu Bir Gelecek"
            description={
              <>
                Sadece mevcut işinizi mükemmelleştirmekle kalmıyoruz, aynı
                zamanda <span className="bold-text">yenilikçi iş birliği</span>
                fırsatları ile ticaretinizi çeşitlendirmenize yardımcı oluyoruz.
                <span className="bold-text">
                  Gelişmiş tedarik süreçlerimizle
                </span>
                başarıyı bir adım öteye taşıyın.
              </>
            }
          />
        </div>
      </div>
      <div className="part3">
        <h1 className="baslik">
          16 Farklı Ülkede Satış Yapın ve Gelirinizi Katlayın!
        </h1>
        <div className="flags-container">
          {/* Üst satır */}
          <div className="row-wrapper">
            <div className="row">
              {Array.from({ length: flagsPerRow }).map((_, index) => (
                <Flag key={index} index={index} />
              ))}
            </div>
            <div className="row">
              {Array.from({ length: flagsPerRow }).map((_, index) => (
                <Flag key={index + flagsPerRow} index={index} />
              ))}
            </div>
          </div>

          {/* 🔥 Yeni eklenen alt satır */}
          <div className="row-wrapper new-row">
            <div className="row">
              {Array.from({ length: totalFlags - flagsPerRow }).map(
                (_, index) => (
                  <Flag key={index + flagsPerRow} index={index + flagsPerRow} />
                )
              )}
            </div>
            {/* 🔥 İkinci satırın yeni kopyasını daha erkenden getirme */}
            <div className="row" style={{ transform: "translateX(30%)" }}>
              {Array.from({ length: totalFlags - flagsPerRow }).map(
                (_, index) => (
                  <Flag key={index + totalFlags} index={index + flagsPerRow} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
