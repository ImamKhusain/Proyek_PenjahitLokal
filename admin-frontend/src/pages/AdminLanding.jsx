import { Link } from "react-router-dom";

import logoarki from "../assets/logo.png";

const AdminLanding = () => {

  return (

    <>

      <div className="admin-landing-page">

        {/* =========================================
            NAVBAR
        ========================================= */}

        <nav className="admin-navbar">

          <div className="admin-logo-wrapper">

            <img
              src={logoarki}
              alt="ARKI Admin"
              className="admin-logo"
            />

            <div className="admin-logo-text">

              <h2>
                ARKI ADMIN
              </h2>

              <span>
                Smart Management Dashboard
              </span>

            </div>

          </div>

          <div className="admin-nav-right">

            <Link
              to="/login"
              className="admin-login-btn"
            >

              LOGIN

            </Link>

          </div>

        </nav>

        {/* =========================================
            BACKGROUND
        ========================================= */}

        <div className="admin-bg-one"></div>
        <div className="admin-bg-two"></div>

        {/* =========================================
            HERO
        ========================================= */}

        <section className="admin-hero-section">

          {/* LEFT */}

          <div className="admin-hero-left">

            <div className="admin-badge">

              ADMIN MANAGEMENT SYSTEM

            </div>

            <h1>

              Kelola Platform
              <span>
                {" "}ARKI Tailor{" "}
              </span>

              Dengan Mudah

            </h1>

            <p>

              Dashboard admin modern untuk
              mengelola penjahit, transaksi,
              pembayaran, pelanggan, dan sistem
              ARKI Tailor secara realtime.

            </p>

            <div className="admin-hero-buttons">

              <Link
                to="/login"
                className="admin-primary-btn"
              >

                Mulai Admin

              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="admin-hero-right">

            <div className="admin-dashboard-card">

              <div className="admin-card-top">

                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>

              </div>

              <div className="admin-card-content">

                <img
                  src={logoarki}
                  alt="ARKI"
                  className="admin-main-logo"
                />

                <h2>
                  ARKI Admin
                </h2>

                <p>
                  Smart Tailor Dashboard
                </p>

                <div className="admin-stats">

                  <div className="admin-stat-box">

                    <h3>
                      100+
                    </h3>

                    <span>
                      Tailor
                    </span>

                  </div>

                  <div className="admin-stat-box">

                    <h3>
                      500+
                    </h3>

                    <span>
                      Orders
                    </span>

                  </div>

                  <div className="admin-stat-box">

                    <h3>
                      24/7
                    </h3>

                    <span>
                      Monitor
                    </span>

                  </div>

                </div>

              </div>

            </div>

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

        body{
          overflow-x:hidden;
        }

        .admin-landing-page{

          min-height:100vh;

          position:relative;

          overflow:hidden;

          background:
            linear-gradient(
              135deg,
              #f7f5eb 0%,
              #f4f4f4 50%,
              #ece8d8 100%
            );

        }

        /* =========================================
           NAVBAR
        ========================================= */

        .admin-navbar{

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

        .admin-logo-wrapper{

          display:flex;

          align-items:center;

          gap:14px;

        }

        .admin-logo{

          width:58px;
          height:58px;

          object-fit:contain;

        }

        .admin-logo-text h2{

          font-size:24px;

          color:#16345f;

          font-weight:800;

        }

        .admin-logo-text span{

          font-size:12px;

          color:#6b7280;

          letter-spacing:1px;

        }

        .admin-login-btn{

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

        .admin-login-btn:hover{

          transform:translateY(-2px);

        }

        /* =========================================
           HERO
        ========================================= */

        .admin-hero-section{

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

        .admin-hero-left{

          flex:1;

          max-width:650px;

        }

        .admin-badge{

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

        .admin-hero-left h1{

          font-size:70px;

          line-height:1.1;

          color:#111827;

          font-weight:900;

          margin-bottom:24px;

        }

        .admin-hero-left h1 span{

          color:#a51c1c;

        }

        .admin-hero-left p{

          font-size:18px;

          line-height:1.8;

          color:#4b5563;

          margin-bottom:36px;

          max-width:580px;

        }

        .admin-hero-buttons{

          display:flex;

          align-items:center;

          gap:18px;

          flex-wrap:wrap;

        }

        .admin-primary-btn{

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

        .admin-primary-btn:hover{

          transform:translateY(-3px);

        }

        .admin-secondary-btn{

          padding:16px 30px;

          border-radius:16px;

          border:none;

          background:white;

          color:#16345f;

          text-decoration:none;

          font-weight:700;

          border:
            1px solid rgba(22,52,95,0.12);

        }

        /* =========================================
           CARD
        ========================================= */

        .admin-hero-right{

          flex:1;

          display:flex;

          justify-content:center;

        }

        .admin-dashboard-card{

          width:100%;

          max-width:500px;

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

        .admin-card-top{

          display:flex;

          align-items:center;

          gap:10px;

          margin-bottom:28px;

        }

        .dot{

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

        .admin-card-content{

          display:flex;

          flex-direction:column;

          align-items:center;

          text-align:center;

        }

        .admin-main-logo{

          width:140px;

          margin-bottom:20px;

        }

        .admin-card-content h2{

          font-size:42px;

          color:#16345f;

          margin-bottom:10px;

        }

        .admin-card-content p{

          color:#6b7280;

          margin-bottom:30px;

        }

        .admin-stats{

          width:100%;

          display:grid;

          grid-template-columns:
            repeat(3,1fr);

          gap:14px;

        }

        .admin-stat-box{

          padding:20px 12px;

          border-radius:18px;

          background:
            rgba(255,255,255,0.8);

          border:
            1px solid rgba(22,52,95,0.08);

        }

        .admin-stat-box h3{

          color:#16345f;

          font-size:24px;

          margin-bottom:8px;

        }

        .admin-stat-box span{

          color:#6b7280;

          font-size:13px;

        }

        /* =========================================
           BACKGROUND
        ========================================= */

        .admin-bg-one{

          position:absolute;

          width:500px;
          height:500px;

          border-radius:50%;

          background:
            radial-gradient(
              circle,
              rgba(22,52,95,0.12) 0%,
              rgba(22,52,95,0.02) 70%,
              transparent 100%
            );

          top:-180px;
          right:-120px;

        }

        .admin-bg-two{

          position:absolute;

          width:400px;
          height:400px;

          border-radius:50%;

          background:
            radial-gradient(
              circle,
              rgba(165,28,28,0.12) 0%,
              rgba(165,28,28,0.02) 70%,
              transparent 100%
            );

          bottom:-150px;
          left:-120px;

        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media screen and (max-width:1100px){

          .admin-hero-section{

            flex-direction:column;

            text-align:center;

          }

          .admin-hero-left{

            max-width:100%;

          }

          .admin-hero-left p{

            margin:auto;
            margin-bottom:36px;

          }

          .admin-hero-buttons{

            justify-content:center;

          }

        }

        @media screen and (max-width:768px){

          .admin-navbar{

            padding:0 20px;

          }

          .admin-hero-section{

            padding:120px 20px 60px;

          }

          .admin-hero-left h1{

            font-size:46px;

          }

          .admin-stats{

            grid-template-columns:1fr;

          }

        }

      `}</style>

    </>

  );

};

export default AdminLanding;