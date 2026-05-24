import API from "./api";


// =====================================
// LOGIN
// =====================================

export const login =
  async (formData) => {

    const response =
      await API.post(

        "/auth/login",

        formData

      );

    return response.data;

  };


// =====================================
// REGISTER CUSTOMER
// =====================================

export const register =
  async (formData) => {

    const response =
      await API.post(

        "/auth/register-customer",

        formData

      );

    return response.data;

  };