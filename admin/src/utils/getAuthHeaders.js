export const getAuthHeaders = () => ({
    Authorization: `Bearer ${
      localStorage.getItem("token")
    }`,
  });