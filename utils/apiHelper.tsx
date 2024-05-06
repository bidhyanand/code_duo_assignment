const API_URL = "https://www.dnd5eapi.co/api/";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;

  try {
    if (typeof window === "undefined") {
      return false;
    }
    // const token = localStorage.getItem("token");

    const response = await fetch(url, {
      cache: "default",
      method: "GET",
      // headers: {
      // 	"Content-Type": "application/json",
      // 	Authorization: String(token),
      // },
      ...options, // Remove the body property here
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error("Error fetching data from API: " + error.message);
  }
}

export async function postAPI(endpoint: string, data: any, options?: any) {
  const url = `${API_URL}${endpoint}`;

  try {
    if (typeof window === "undefined") {
      return false;
    }
    const token = localStorage.getItem("token");
    const header: any = {};
    if (!options?.headers) {
      header["Content-Type"] = "application/json";
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: String(token),
        ...header,
      },
      body:
        options?.headers &&
        options?.headers?.["Content-Type"] === "multipart/form-data"
          ? data
          : JSON.stringify(data),
      // ...options,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error("Error posting data to API: " + error.message);
  }
}

export const baseUrl = "https://www.dnd5eapi.co/api/";