// Redirect to login page if token does not exist
if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
  }
  
  const menuList = document.getElementById("menu-list");
  const addMenuForm = document.getElementById("add-menu-form");
  
  // Fetch and display menu items
//   const loadMenu = async () => {
//     const response = await fetch("http://localhost:3001/menu");
//     const menu = await response.json();
  
//     menuList.innerHTML = "";
//     menu.forEach((item) => {
//       const li = document.createElement("li");
//       li.innerHTML = `
//         <img src="${item.imageURL}" alt="${item.title}" style="width: 50px; height: 50px;" />
//         <span>${item.title} - $${item.price} - ${item.ratings} stars</span>
//         <button onclick="deleteMenu(${item.id})">Delete</button>
//       `;
//       menuList.appendChild(li);
//     });
//   };
  
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
  
    await fetch("http://localhost:3001/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMenuItem),
    });
  
    // loadMenu();
    addMenuForm.reset();
  });
  
  // Delete menu item
//   const deleteMenu = async (id) => {
//     await fetch(`http://localhost:3001/menu/${id}`, { method: "DELETE" });
//     loadMenu();
//   };
  
//   loadMenu();
  