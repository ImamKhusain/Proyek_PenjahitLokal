import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

const TailorForm = ({ photo }) => {

  const navigate =
    useNavigate();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState({

    name: "",

    email: "",

    specialization: "",

    category: "",

    address: "",

    phone: "",

    description: "",

  });


  // HANDLE INPUT

  const handleChange = (
    e
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };


  // SUBMIT

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const submitData =
          new FormData();

        submitData.append(
          "name",
          formData.name
        );

        submitData.append(
          "email",
          formData.email
        );

        submitData.append(
          "specialization",
          formData.specialization
        );

        submitData.append(
          "category",
          formData.category
        );

        submitData.append(
          "address",
          formData.address
        );

        submitData.append(
          "phone",
          formData.phone
        );

        submitData.append(
          "description",
          formData.description
        );

        // IMAGE

        if (photo) {

          submitData.append(
            "photo",
            photo
          );

        }

        const token =
          localStorage.getItem(
            "token"
          );

        await api.post(

          "/tailors",

          submitData,

          {

            headers: {

              "Content-Type":
                "multipart/form-data",

              Authorization:
                `Bearer ${token}`,

            },

          }

        );


        // SUCCESS TOAST

        toast.success(
          "Data penjahit berhasil ditambahkan!"
        );


        navigate(
          "/dashboard"
        );

      } catch (error) {

        console.error(

          "ERROR:",

          error.response
            ?.data ||

            error.message

        );


        // ERROR TOAST

        toast.error(
          "Gagal menyimpan data penjahit."
        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <form
      onSubmit={
        handleSubmit
      }

      style={{

        background:
          "#ffffff",

        padding:
          "24px",

        borderRadius:
          "12px",

        width: "100%",

      }}
    >

      {/* NAMA */}

      <div
        style={{
          marginBottom:
            "18px",
        }}
      >

        <label
          style={
            labelStyle
          }
        >
          Nama Penjahit
        </label>

        <input
          type="text"
          name="name"
          value={
            formData.name
          }
          onChange={
            handleChange
          }
          style={
            inputStyle
          }
          required
        />

      </div>


      {/* EMAIL */}

      <div
        style={{
          marginBottom:
            "18px",
        }}
      >

        <label
          style={
            labelStyle
          }
        >
          Email Kontak
        </label>

        <input
          type="email"
          name="email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          style={
            inputStyle
          }
          required
        />

      </div>


      {/* SPESIALISASI */}

      <div
        style={{
          marginBottom:
            "18px",
        }}
      >

        <label
          style={
            labelStyle
          }
        >
          Spesialisasi Jahitan
        </label>

        <select
          name="specialization"

          value={
            formData.specialization
          }

          onChange={
            handleChange
          }

          style={
            selectStyle
          }

          required
        >

          <option value="">
            Silahkan Pilih
            Spesialisasi
          </option>

          <option value="Jahit Jas">
            Jahit Jas
          </option>

          <option value="Jahit Seragam">
            Jahit Seragam
          </option>

          <option value="Jahit Kemeja Batik">
            Jahit Kemeja Batik
          </option>

          <option value="Jahit Blazer, Beskap, Surjan">
            Jahit Blazer,
            Beskap,
            Surjan
          </option>

          <option value="Jahit Celana">
            Jahit Celana
          </option>

          <option value="Jahit Dress & Rok">
            Jahit Dress & Rok
          </option>

        </select>

      </div>


      {/* ALAMAT */}

      <div
        style={{
          marginBottom:
            "18px",
        }}
      >

        <label
          style={
            labelStyle
          }
        >
          Alamat
        </label>

        <input
          type="text"
          name="address"
          value={
            formData.address
          }
          onChange={
            handleChange
          }
          style={
            inputStyle
          }
          required
        />

      </div>


      {/* NO HP */}

      <div
        style={{
          marginBottom:
            "18px",
        }}
      >

        <label
          style={
            labelStyle
          }
        >
          No. HP
        </label>

        <input
          type="text"
          name="phone"
          value={
            formData.phone
          }
          onChange={
            handleChange
          }
          style={
            inputStyle
          }
          required
        />

      </div>


      {/* DESCRIPTION */}

      <div
        style={{
          marginBottom:
            "18px",
        }}
      >

        <label
          style={
            labelStyle
          }
        >
          Description
        </label>

        <textarea
          name="description"

          value={
            formData.description
          }

          onChange={
            handleChange
          }

          style={{

            ...inputStyle,

            minHeight:
              "120px",

            resize:
              "none",

            paddingTop:
              "12px",

          }}

          required
        />

      </div>


      {/* BUTTON */}

      <button
        type="submit"

        disabled={
          loading
        }

        style={{

          background:
            loading
              ? "#93c5fd"
              : "#2563eb",

          color:
            "white",

          border:
            "none",

          borderRadius:
            "10px",

          padding:
            "12px 18px",

          fontWeight:
            "700",

          fontSize:
            "14px",

          cursor:
            loading
              ? "not-allowed"
              : "pointer",

          marginTop:
            "10px",

          transition:
            "0.2s ease",

          boxShadow:
            "0 4px 12px rgba(37,99,235,0.2)",

        }}
      >

        {loading

          ? "Menyimpan..."

          : "Save changes"}

      </button>

    </form>

  );

};


// LABEL STYLE

const labelStyle = {

  display: "block",

  marginBottom:
    "8px",

  fontSize:
    "13px",

  fontWeight:
    "600",

  color:
    "#111827",

};


// INPUT STYLE

const inputStyle = {

  width: "100%",

  height: "46px",

  borderRadius:
    "10px",

  border:
    "1px solid #d1d5db",

  padding:
    "0 14px",

  fontSize:
    "14px",

  outline:
    "none",

  boxSizing:
    "border-box",

  background:
    "#ffffff",

  transition:
    "0.2s ease",

  boxShadow:
    "0 1px 2px rgba(0,0,0,0.04)",

};


// SELECT STYLE

const selectStyle = {

  width: "100%",

  height: "46px",

  borderRadius:
    "10px",

  border:
    "1px solid #d1d5db",

  padding:
    "0 42px 0 14px",

  fontSize:
    "14px",

  outline:
    "none",

  boxSizing:
    "border-box",

  backgroundColor:
    "#ffffff",

  color:
    "#111827",

  cursor:
    "pointer",

  appearance:
    "none",

  WebkitAppearance:
    "none",

  MozAppearance:
    "none",

  transition:
    "0.2s ease",

  backgroundImage:
    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%236B7280' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,

  backgroundRepeat:
    "no-repeat",

  backgroundPosition:
    "right 14px center",

  backgroundSize:
    "18px",

  boxShadow:
    "0 1px 2px rgba(0,0,0,0.04)",

};

export default TailorForm;