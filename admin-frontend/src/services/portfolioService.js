import API from "./api";

export const getMyPortfolios =
  async (tailorId) => {

    const response =
      await API.get(
        `/portfolios/tailor/${tailorId}`
      );

    return response.data.data;

};