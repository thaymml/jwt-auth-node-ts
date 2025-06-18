const apiBase = "http://localhost:3000/api";

function showMessage(msg, isError = true) {
  const div = document.getElementById("message");
  if (div) {
    div.textContent = msg;
    div.style.color = isError ? "crimson" : "green";
    setTimeout(() => (div.textContent = ""), 4000);
  }
}

// Cadastro
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const res = await fetch(`${apiBase}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) return showMessage(data.message);

    showMessage("Cadastro feito com sucesso!", false);
    registerForm.reset();
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const res = await fetch(`${apiBase}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) return showMessage(data.message);

    localStorage.setItem("token", data.token);
    window.location.href = "profile.html";
  });
}

// Perfil
const profileInfo = document.getElementById("profileInfo");
if (profileInfo) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }

  fetch(`${apiBase}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (!res.ok) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
      }
      return res.json();
    })
    .then((user) => {
      profileInfo.textContent = `Olá, ${user.name} (${user.email})`;
    })
    .catch(() => {
      showMessage("Erro ao carregar perfil");
    });
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
}