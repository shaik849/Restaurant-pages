const API_URL = "https://restaurant-server-tm65.onrender.com/menu";

if (!localStorage.getItem("token")) {
  window.location.href = "index.html";
}

const menuTableBody = document.getElementById("menu-table-body");
const paginationContainer = document.getElementById("pagination");
let menuItems = []; // Store all fetched menu items
let filteredMenu = []; // Store filtered or sorted menu items
let currentPage = 1; // Current page
const itemsPerPage = 5; // Items per page

// Render menu items for the current page
const renderMenu = (menu) => {
  menuTableBody.innerHTML = ""; // Clear existing rows
  menu.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.id || "N/A"}</td>
      <td>
        <img 
          src="${item.imageURL || "placeholder.jpg"}" 
          alt="${item.title || "Image Not Available"}" 
          style="width: 50px; height: 50px;" 
          loading="lazy" 
        />
      </td>
      <td>${item.title || "Untitled"}</td>
      <td>${item.description || "No description provided."}</td>
      <td>$${item.price ? item.price.toFixed(2) : "0.00"}</td>
      <td>${item.ratings ? `${item.ratings} stars` : "No ratings"}</td>
      <td>
        <button onclick="editMenu(${item.id})" class="btn">Edit</button>
        <button onclick="deleteMenu(${item.id})" class="delete-btn">Delete</button>
      </td>
    `;
    menuTableBody.appendChild(row);
  });
};

// Render pagination controls
const renderPagination = (totalPages) => {
  paginationContainer.innerHTML = ""; // Clear existing controls

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      paginateMenu();
    }
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      paginateMenu();
    }
  });

  const pageInfo = document.createElement("span");
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  pageInfo.style.margin = "0 10px";

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageInfo);
  paginationContainer.appendChild(nextButton);
};

// Paginate menu items based on the current page
const paginateMenu = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMenu = filteredMenu.slice(startIndex, endIndex);

  renderMenu(paginatedMenu);
  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);
  renderPagination(totalPages);
};

// Apply sorting and pagination
const applySorting = () => {
  const sortBy = document.getElementById("sort-by").value;

  filteredMenu = [...menuItems]; // Clone the original menu array
  if (sortBy === "price-asc") {
    filteredMenu.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredMenu.sort((a, b) => b.price - a.price);
  } else if (sortBy === "ratings-asc") {
    filteredMenu.sort((a, b) => a.ratings - b.ratings);
  } else if (sortBy === "ratings-desc") {
    filteredMenu.sort((a, b) => b.ratings - a.ratings);
  }

  currentPage = 1; // Reset to the first page
  paginateMenu();
};

// Apply price filtering and pagination
const applyFilters = () => {
  const minPrice = parseFloat(document.getElementById("min-price").value) || 0;
  const maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;

  const minRate = parseFloat(document.getElementById("min-rate").value) || 0;
  const maxRate = parseFloat(document.getElementById("max-rate").value) || Infinity;

  filteredMenu = menuItems.filter(
    (item) => 
      item.price >= minPrice && item.price <= maxPrice && 
      item.ratings >= minRate && item.ratings <= maxRate
  );

  currentPage = 1; // Reset to the first page
  paginateMenu();
};


// Fetch and display menu items
const loadMenu = async () => {
  try {
    const response = await fetch(API_URL);
    menuItems = await response.json(); // Store menu items in the array
    filteredMenu = [...menuItems]; // Initialize filteredMenu with all items
    paginateMenu();
  } catch (err) {
    console.error("Error fetching menu items:", err);
  }
};

// Delete menu item
const deleteMenu = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadMenu();
  } catch (err) {
    console.error("Error deleting menu item:", err);
  }
};

// Edit menu item (redirect to edit page with ID in query params)
const editMenu = (id) => {
  window.location.href = `edit.html?id=${id}`;
};

// Event Listeners
document.getElementById("sort-by").addEventListener("change", applySorting);
document.getElementById("apply-filters").addEventListener("click", applyFilters);
// document.getElementById("apply-rate-filters").addEventListener("click", applyRateFiltering);

// Load menu on page load
loadMenu();
