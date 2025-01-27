// Redirect to login page if token does not exist
const API_URL = "https://restaurant-server-tm65.onrender.com/menu"
if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
  }
  
  const menuList = document.getElementById("menu-list");
  const addMenuForm = document.getElementById("add-menu-form");
  
  // Add new menu item
  addMenuForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const newMenuItem = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      imageURL: document.getElementById("imageURL").value,
      price: parseFloat(document.getElementById("price").value),
      ratings: parseFloat(document.getElementById("ratings").value),
    };
  
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMenuItem),
    });
  
    addMenuForm.reset();
  });
  

  