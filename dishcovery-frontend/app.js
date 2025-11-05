const BASE_URL = "https://dishcovery-backend.onrender.com/";
const message = document.getElementById("message");

// --- LOGIN ---
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      message.textContent = "Login successful!";
      localStorage.setItem("token", data.token);
      window.location.href = "recipes.html";
    } else {
      message.textContent = data.error || "Login failed.";
      message.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    message.textContent = "Server error.";
    message.style.color = "red";
  }
});

// --- SIGNUP ---
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      message.textContent = "User registered successfully!";
      message.style.color = "green";
    } else {
      message.textContent = data.error || "Registration failed.";
      message.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    message.textContent = "Server error.";
    message.style.color = "red";
  }
});
