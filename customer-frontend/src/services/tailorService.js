import API from "./api";


// =====================================
// GET ALL TAILORS
// =====================================

export const getAllTailors =
  async () => {

    const response =
      await API.get(
        "/tailors"
      );

    return response.data.data;

  };