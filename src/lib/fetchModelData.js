// lib/fetchModelData.js
export const fetchModel = async (url) => {
  const baseUrl = "https://hhq8qw-8081.csb.app"; // Sử dụng đường dẫn Codesandbox mới
  try {
    const response = await fetch(`${baseUrl}${url}`);
    if (response.status === 400) {
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
