import "./About.css";

// 💡 IMPOR LOGO DARI ASSETS
// (Sesuaikan jumlah titik "../" jika folder assets kamu berada di subfolder berbeda)
import logoArki from "../assets/logoarki.png"; 

const About = () => {
  return (
    <div className="about-page-container">
      
      {/* KONTEN UTAMA */}
      <div className="about-main-content">
        
        {/* KOLOM KIRI: LOGO BESAR */}
        <div className="about-logo-section">
          <img 
            src={logoArki} 
            alt="ARKI Tailor Logo" 
            className="about-large-logo" 
          />
        </div>

        {/* KOLOM KANAN: KOTAK PENJELASAN */}
        <div className="about-text-card">
          <p>
            ARKI Tailor hadir sebagai platform digital inovatif yang dirancang khusus 
            untuk memodernisasi cara pelanggan berinteraksi dengan keahlian tangan penjahit lokal. 
            Kami fokus menyelesaikan masalah utama pelanggan yang sering kali kesulitan menemukan penjahit 
            dengan spesialisasi khusus, seperti ahli kebaya, jas, atau busana kustom tertentu yang biasanya 
            sulit dicari lewat metode konvensional. Melalui sistem portofolio yang transparan dan mendetail, 
            pengguna dapat dengan mudah menilai kualitas serta karakter jahitan sebelum memutuskan untuk melakukan pemesanan. 
            Website ini bertindak sebagai penghubung cerdas yang memastikan setiap desain impian Anda dikerjakan oleh tangan yang paling tepat 
            dan kompeten di bidangnya. Dengan integrasi teknologi yang ramah pengguna, ARKI Tailor tidak hanya memudahkan 
            pencarian jasa, tetapi juga membantu pengrajin lokal memperluas jangkauan pasar mereka ke ranah digital secara lebih profesional.
          </p>
        </div>

      </div>

     

    </div>
  );
};

export default About;