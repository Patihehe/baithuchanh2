// lib/fetchModelData.js
export const fetchModel = async (url) => {
  const baseUrl = "https://hhq8qw-8081.csb.app";
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (response.status === 400 || response.status === 401) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Bad Request");
    }
    if (!response.ok) {
      throw new Error(`Failed with status code ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Request failed:", error.message);
    throw error;
  }
};
