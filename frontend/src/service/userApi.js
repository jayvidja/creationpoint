// BASE URL
const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/users`;

/* ================= REGISTER ================= */
export const registerUser = async (name, email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });

    // ❗ SAFE JSON PARSE
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(data.message || "Register failed");
    }

    return data;

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    throw error;
  }
};


/* ================= LOGIN ================= */
export const loginUser = async (email, password) => {
  try {
    console.log("SENDING:", { email, password }); // 🔥 DEBUG

    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    // ❗ SAFE PARSE
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    throw error;
  }
};