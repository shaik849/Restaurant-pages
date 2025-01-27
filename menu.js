// Redirect to login page if token does not exist
if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
  }
  
  const menuTableBody = document.getElementById("menu-table-body");
  
  // Fetch and display menu items
  const loadMenu = async () => {
    try {
      const response = await fetch("http://localhost:3001/menu");
      const menu = await response.json();
  
      menuTableBody.innerHTML = "";
      menu.forEach((item) => {
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${item.id}</td>
          <td><img src="${item.imageURL}" alt="${item.title}" loading="lazy" style="width: 50px; height: 50px;" /></td>
          <td>${item.title}</td>
          <td>${item.description}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>${item.ratings} stars</td>
          <td>
            <button onclick="editMenu(${item.id})">Edit</button>
            <button onclick="deleteMenu(${item.id})">Delete</button>
          </td>
        `;
  
        menuTableBody.appendChild(row);
      });
    } catch (err) {
      console.error("Error fetching menu items:", err);
    }
  };
  
  // Delete menu item
  const deleteMenu = async (id) => {
    try {
      await fetch(`http://localhost:3001/menu/${id}`, { method: "DELETE" });
      loadMenu();
    } catch (err) {
      console.error("Error deleting menu item:", err);
    }
  };
  
  // Edit menu item (redirect to edit page with ID in query params)
  const editMenu = (id) => {
     window.location.href = `edit.html?id=${id}`;
  };
  
  loadMenu();
  