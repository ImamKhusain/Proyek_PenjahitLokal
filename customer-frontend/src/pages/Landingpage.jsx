import { Link } from "react-router-dom";

import logoarki from "../assets/logoarki.png";

const Landingpage = () => {

  return (

    <>

      <div className="landing-page">

        {/* =========================================
            NAVBAR
        ========================================= */}

        <nav className="landing-navbar">

          {/* LEFT */}

          <div className="landing-logo-wrapper">

            <img
              src={logoarki}
              alt="ARKI Tailor"
              className="landing-logo"
            />

            <div className="landing-logo-text">

              <h2>
                ARKI TAILOR
              </h2>

              <span>
                Premium Tailoring Platform
              </span>

            </div>

          </div>

          {/* RIGHT */}

          <div className="landing-nav-right">

            <Link
              to="/login"
              className="landing-login-btn"
            >

              MASUK

            </Link>

          </div>

        </nav>

        {/* =========================================
            BACKGROUND ORNAMEN
        ========================================= */}

        <div className="bg-shape-one"></div>
        <div className="bg-shape-two"></div>
        <div className="bg-shape-three"></div>

        {/* =========================================
            HERO SECTION
        ========================================= */}

        <section
          className="hero-section"
          id="home"
        >

          {/* LEFT */}

          <div className="hero-left">

            <div className="hero-badge">

              PREMIUM CUSTOM TAILORING

            </div>

            <h1>

              Wujudkan
              <span>
                {" "}Pakaian Impian{" "}
              </span>

              Bersama Penjahit Profesional

            </h1>

            <p>

              ARKI Tailor menghadirkan pengalaman
              pemesanan jahit modern, cepat,
              terpercaya, dan elegan untuk berbagai
              kebutuhan fashion Anda.

            </p>

            <div className="hero-buttons">

              <Link
                to="/login"
                className="hero-primary-btn"
              >

                Mulai Sekarang

              </Link>

              <button
                className="hero-secondary-btn"

                onClick={() => {

                  document
                    .getElementById("features")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });

                }}
              >

                Pelajari Lebih Lanjut

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="hero-right">

            <div className="hero-image-card">

              <div className="hero-card-top">

                <div className="hero-dot red"></div>
                <div className="hero-dot yellow"></div>
                <div className="hero-dot green"></div>

              </div>

              <div className="hero-image-content">

                <img
                  src={logoarki}
                  alt="ARKI"
                  className="hero-main-logo"
                />

                <h2>
                  ARKI Tailor
                </h2>

                <p>
                  Elegant Modern Tailoring Experience
                </p>

                <div className="hero-mini-stats">

                  <div className="mini-stat-box">

                    <h3>
                      100+
                    </h3>

                    <span>
                      Tailor
                    </span>

                  </div>

                  <div className="mini-stat-box">

                    <h3>
                      24/7
                    </h3>

                    <span>
                      Support
                    </span>

                  </div>

                  <div className="mini-stat-box">

                    <h3>
                      Fast
                    </h3>

                    <span>
                      Service
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================
            FEATURES
        ========================================= */}

        <section
          className="features-section"
          id="features"
        >

          <div className="feature-card">

            <div className="feature-icon">
              ✂️
            </div>

            <h3>
              Penjahit Profesional
            </h3>

            <p>

              Temukan penjahit terpercaya dengan
              kualitas terbaik dan pengalaman tinggi.

            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              🚀
            </div>

            <h3>
              Pemesanan Cepat
            </h3>

            <p>

              Sistem modern yang memudahkan proses
              pemesanan pakaian custom Anda.

            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">
              💎
            </div>

            <h3>
              Premium Experience
            </h3>

            <p>

              Tampilan elegan dan pengalaman modern
              untuk kenyamanan pelanggan.

            </p>

          </div>

        </section>

        {/* =========================================
            ABOUT
        ========================================= */}

        <section
          className="about-section"
          id="about"
        >

          <div className="about-card">

            <h2>
              Tentang ARKI Tailor
            </h2>

            <p>

              ARKI Tailor merupakan platform modern
              yang membantu pelanggan menemukan
              penjahit profesional dengan pengalaman
              pemesanan yang lebih mudah, cepat,
              elegan, dan terpercaya.

            </p>

          </div>

        </section>

      </div>

      {/* =========================================
          CSS
      ========================================= */}

      <style>{`

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:sans-serif;
        }

        html{
          scroll-behavior:smooth;
        }

        body{
          overflow-x:hidden;
        }

        .landing-page{

          min-height:100vh;

          position:relative;

          overflow:hidden;

          background:
            linear-gradient(
              135deg,
              #f6f0cf 0%,
              #f8f7f3 45%,
              #ece8d8 100%
            );

        }

        /* =========================================
           NAVBAR
        ========================================= */

        .landing-navbar{

          width:100%;

          height:90px;

          display:flex;

          align-items:center;

          justify-content:space-between;

          padding:0 60px;

          position:fixed;

          top:0;
          left:0;

          z-index:1000;

          backdrop-filter:blur(10px);

          background:
            rgba(255,255,255,0.45);

          border-bottom:
            1px solid rgba(255,255,255,0.4);

        }

        .landing-logo-wrapper{

          display:flex;

          align-items:center;

          gap:14px;

        }

        .landing-logo{

          width:58px;
          height:58px;

          object-fit:contain;

        }

        .landing-logo-text h2{

          font-size:24px;

          color:#16345f;

          font-weight:800;

        }

        .landing-logo-text span{

          font-size:12px;

          color:#6b7280;

          letter-spacing:1px;

        }

        .landing-login-btn{

          padding:12px 28px;

          border-radius:14px;

          background:
            linear-gradient(
              135deg,
              #16345f 0%,
              #1f4b87 100%
            );

          color:white;

          text-decoration:none;

          font-weight:700;

          transition:0.3s ease;

          box-shadow:
            0 10px 20px rgba(22,52,95,0.18);

        }

        .landing-login-btn:hover{

          transform:translateY(-2px);

        }

        /* =========================================
           HERO
        ========================================= */

        .hero-section{

          width:100%;

          min-height:100vh;

          display:flex;

          align-items:center;

          justify-content:space-between;

          padding:120px 60px 60px;

          position:relative;

          z-index:2;

          gap:40px;

        }

        .hero-left{

          flex:1;

          max-width:650px;

        }

        .hero-badge{

          display:inline-flex;

          align-items:center;

          padding:10px 18px;

          border-radius:999px;

          background:
            rgba(22,52,95,0.08);

          color:#16345f;

          font-size:13px;

          font-weight:700;

          margin-bottom:24px;

          border:
            1px solid rgba(22,52,95,0.1);

        }

        .hero-left h1{

          font-size:68px;

          line-height:1.1;

          color:#111827;

          font-weight:900;

          margin-bottom:24px;

        }

        .hero-left h1 span{

          color:#a51c1c;

        }

        .hero-left p{

          font-size:18px;

          line-height:1.8;

          color:#4b5563;

          margin-bottom:36px;

          max-width:580px;

        }

        .hero-buttons{

          display:flex;

          align-items:center;

          gap:18px;

          flex-wrap:wrap;

        }

        .hero-primary-btn{

          padding:16px 32px;

          border-radius:16px;

          border:none;

          background:
            linear-gradient(
              135deg,
              #16345f 0%,
              #1f4b87 100%
            );

          color:white;

          text-decoration:none;

          font-weight:700;

          transition:0.3s ease;

          cursor:pointer;

          box-shadow:
            0 12px 22px rgba(22,52,95,0.22);

        }

        .hero-primary-btn:hover{

          transform:translateY(-3px);

        }

        .hero-secondary-btn{

          padding:16px 30px;

          border-radius:16px;

          border:none;

          background:
            rgba(255,255,255,0.7);

          color:#16345f;

          font-weight:700;

          border:
            1px solid rgba(22,52,95,0.12);

          transition:0.3s ease;

          cursor:pointer;

        }

        .hero-secondary-btn:hover{

          background:white;

        }

        /* =========================================
           HERO CARD
        ========================================= */

        .hero-right{

          flex:1;

          display:flex;

          justify-content:center;

        }

        .hero-image-card{

          width:100%;

          max-width:520px;

          background:
            rgba(255,255,255,0.72);

          backdrop-filter:blur(18px);

          border-radius:34px;

          padding:22px;

          border:
            1px solid rgba(255,255,255,0.5);

          box-shadow:
            0 18px 50px rgba(0,0,0,0.08);

        }

        .hero-card-top{

          display:flex;

          align-items:center;

          gap:10px;

          margin-bottom:28px;

        }

        .hero-dot{

          width:14px;
          height:14px;

          border-radius:50%;

        }

        .red{
          background:#ef4444;
        }

        .yellow{
          background:#facc15;
        }

        .green{
          background:#22c55e;
        }

        .hero-image-content{

          display:flex;

          flex-direction:column;

          align-items:center;

          text-align:center;

        }

        .hero-main-logo{

          width:150px;

          margin-bottom:20px;

        }

        .hero-image-content h2{

          font-size:42px;

          color:#16345f;

          margin-bottom:12px;

        }

        .hero-image-content p{

          color:#6b7280;

          margin-bottom:30px;

        }

        .hero-mini-stats{

          width:100%;

          display:grid;

          grid-template-columns:
            repeat(3,1fr);

          gap:14px;

        }

        .mini-stat-box{

          padding:20px 12px;

          border-radius:18px;

          background:
            rgba(255,255,255,0.8);

          border:
            1px solid rgba(22,52,95,0.08);

        }

        .mini-stat-box h3{

          color:#16345f;

          font-size:24px;

          margin-bottom:8px;

        }

        .mini-stat-box span{

          color:#6b7280;

          font-size:13px;

        }

        /* =========================================
           FEATURES
        ========================================= */

        .features-section{

          width:100%;

          padding:20px 60px 80px;

          display:grid;

          grid-template-columns:
            repeat(auto-fit,minmax(260px,1fr));

          gap:24px;

          position:relative;

          z-index:2;

        }

        .feature-card{

          padding:34px;

          border-radius:28px;

          background:
            rgba(255,255,255,0.7);

          backdrop-filter:blur(14px);

          border:
            1px solid rgba(255,255,255,0.4);

          box-shadow:
            0 10px 30px rgba(0,0,0,0.05);

          transition:0.3s ease;

        }

        .feature-card:hover{

          transform:translateY(-5px);

        }

        .feature-icon{

          font-size:42px;

          margin-bottom:20px;

        }

        .feature-card h3{

          font-size:24px;

          color:#16345f;

          margin-bottom:14px;

        }

        .feature-card p{

          color:#6b7280;

          line-height:1.8;

        }

        /* =========================================
           ABOUT
        ========================================= */

        .about-section{

          padding:0 60px 100px;

          position:relative;

          z-index:2;

        }

        .about-card{

          width:100%;

          padding:50px;

          border-radius:30px;

          background:
            rgba(255,255,255,0.7);

          backdrop-filter:blur(15px);

          border:
            1px solid rgba(255,255,255,0.4);

          box-shadow:
            0 10px 30px rgba(0,0,0,0.05);

          text-align:center;

        }

        .about-card h2{

          font-size:42px;

          color:#16345f;

          margin-bottom:20px;

        }

        .about-card p{

          max-width:800px;

          margin:auto;

          line-height:2;

          color:#6b7280;

          font-size:17px;

        }

        /* =========================================
           ORNAMEN
        ========================================= */

        .bg-shape-one{

          position:absolute;

          width:500px;
          height:500px;

          border-radius:50%;

          background:
            radial-gradient(
              circle,
              rgba(22,52,95,0.14) 0%,
              rgba(22,52,95,0.03) 65%,
              transparent 100%
            );

          top:-180px;
          right:-150px;

        }

        .bg-shape-two{

          position:absolute;

          width:450px;
          height:450px;

          border-radius:50%;

          background:
            radial-gradient(
              circle,
              rgba(165,28,28,0.12) 0%,
              rgba(165,28,28,0.03) 65%,
              transparent 100%
            );

          bottom:-180px;
          left:-140px;

        }

        .bg-shape-three{

          position:absolute;

          width:280px;
          height:280px;

          border-radius:50%;

          background:
            radial-gradient(
              circle,
              rgba(250,204,21,0.12) 0%,
              rgba(250,204,21,0.02) 65%,
              transparent 100%
            );

          top:40%;
          left:45%;

        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media screen and (max-width:1100px){

          .hero-section{

            flex-direction:column;

            text-align:center;

          }

          .hero-left{

            max-width:100%;

          }

          .hero-left p{

            margin:auto;
            margin-bottom:36px;

          }

          .hero-buttons{

            justify-content:center;

          }

        }

        @media screen and (max-width:768px){

          .landing-navbar{

            padding:0 20px;

          }

          .hero-section{

            padding:120px 20px 60px;

          }

          .hero-left h1{

            font-size:48px;

          }

          .features-section{

            padding:20px 20px 70px;

          }

          .about-section{

            padding:0 20px 80px;

          }

          .hero-mini-stats{

            grid-template-columns:1fr;

          }

          .about-card{

            padding:36px 24px;

          }

          .about-card h2{

            font-size:32px;

          }

        }

      `}</style>

    </>

  );

};

export default Landingpage;