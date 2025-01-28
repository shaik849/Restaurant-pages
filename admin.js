const API_URL = "https://restaurant-server-tm65.onrender.com/menu";

if (!localStorage.getItem("token")) {
  window.location.href = "index.html";
}

const menuList = document.getElementById("menu-list");
const addMenuForm = document.getElementById("add-menu-form");

// Add new menu item
addMenuForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
    return;
  }

  // Validate form fields
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const imageURL = document.getElementById("imageURL").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const ratings = parseFloat(document.getElementById("ratings").value);

  if (!title || !description || !imageURL || isNaN(price) || isNaN(ratings) || price <= 0 || ratings <= 0) {
    alert("Please fill all fields with valid data.");
    return;
  }

  const newMenuItem = {
    title,
    description,
    imageURL,
    price,
    ratings,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newMenuItem),
    });

    if (response.ok) {
      alert("Item added successfully");
      addMenuForm.reset();

      // Optional: Reload menu items
      if (typeof loadMenu === "function") {
        loadMenu();
      }
    } else {
      const error = await response.json();
      alert(`Error adding item: ${error.message || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Error adding menu item:", error);
    alert("Failed to add menu item. Please try again.");
  }
});
