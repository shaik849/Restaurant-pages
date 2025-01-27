// Redirect to admin page if token exists
if (localStorage.getItem("token")) {
    window.location.href = "admin.html";
  }
  
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
  
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) throw new Error("Login failed");
  
      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "admin.html";
    } catch (err) {
      errorMessage.textContent = "Invalid email or password.";
      errorMessage.style.color = "red";
    }
  });
  