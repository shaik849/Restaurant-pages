document.addEventListener("DOMContentLoaded", async () => {
    // Check if the token exists
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token is found, redirect to the login page
      window.location.href = "login.html";
      return;
    }
  
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get("id");
  
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const imageURLInput = document.getElementById("imageURL");
    const priceInput = document.getElementById("price");
    const ratingsInput = document.getElementById("ratings");
  
    // Fetch the item's current details
    try {
      const response = await fetch(`http://localhost:3001/menu/${itemId}`);
      if (!response.ok) throw new Error("Failed to fetch item details.");
      const item = await response.json();
  
      // Pre-fill the form with the item's details
      titleInput.value = item.title;
      descriptionInput.value = item.description;
      imageURLInput.value = item.imageURL;
      priceInput.value = item.price;
      ratingsInput.value = item.ratings;
    } catch (err) {
      console.error("Error fetching item details:", err);
    }
  
    // Handle form submission to update the item
    document.getElementById("edit-menu-form").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const updatedItem = {
        title: titleInput.value,
        description: descriptionInput.value,
        imageURL: imageURLInput.value,
        price: parseFloat(priceInput.value),
        ratings: parseFloat(ratingsInput.value),
      };
  
      try {
        const response = await fetch(`http://localhost:3001/menu/${itemId}`, {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include token in the request header
          },
          body: JSON.stringify(updatedItem),
        });
  
        if (!response.ok) throw new Error("Failed to update item.");
        window.location.href = "menu.html"; // Redirect to menu.html
      } catch (err) {
        console.error("Error updating item:", err);
      }
    });
  });
  