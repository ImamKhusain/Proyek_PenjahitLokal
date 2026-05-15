import API from "./api";

// GET PORTFOLIO BY TAILOR ID
export const getMyPortfolios =
  async (tailorId) => {

    const response =
      await API.get(
        `/portfolios/tailor/${tailorId}`
      );

    return response.data.data;

};