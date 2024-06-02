async function getInfo(endpoint) {
  try {
    const response = await fetch(`https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    createTable(data);
  } catch (error) {
    console.log("There was a problem with the fetch operation: " + error.message);
  }
}

function createTable(data) {
  const table = document.getElementById("blogTable");
  table.innerHTML = ""; // Clear the table before adding new rows
  const addedIds = new Set(); // Use a Set to store added IDs

  data.forEach((item) => {
    if (addedIds.has(item.id)) {
      return; // Skip iteration if ID is already present
    }

    const row = document.createElement("tr");
    row.id = `row-${item.id}`;
    row.dataset.blog = JSON.stringify(item);

    const idCell = document.createElement("td");
    idCell.textContent = item.id;
    row.appendChild(idCell);

    const createdAtCell = document.createElement("td");
    createdAtCell.textContent = new Date(item.createdAt).toLocaleString();
    row.appendChild(createdAtCell);

    const titleCell = document.createElement("td");
    titleCell.textContent = item.title;
    row.appendChild(titleCell);

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = item.description;
    row.appendChild(descriptionCell);

    const imageCell = document.createElement("td");
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;
    img.width = 50;
    imageCell.appendChild(img);
    row.appendChild(imageCell);

    const actionsCell = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.id = `delete-${item.id}`;
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteBlog(item.id);
    };
    deleteButton.classList.add("bg-red-500", "hover:bg-red-700", "text-white", "font-bold", "py-2", "px-4", "rounded");
    actionsCell.appendChild(deleteButton);

    const viewButton = document.createElement("button");
    viewButton.id = `view-${item.id}`;
    viewButton.textContent = "View";
    viewButton.onclick = function () {
      viewBlog(item.id);
    };
    viewButton.classList.add("bg-green-500", "hover:bg-green-700", "text-white", "font-bold", "py-2", "px-4", "rounded");
    actionsCell.appendChild(viewButton);

    row.appendChild(actionsCell);
    table.appendChild(row);

    addedIds.add(item.id);
  });
}

async function deleteBlog(id) {
  console.log(`Attempting to delete blog with ID ${id}`);
  try {
    const response = await fetch(`https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Blog/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const row = document.getElementById(`row-${id}`);
    if (row) {
      row.parentNode.removeChild(row);
    }
    document.getElementById("success").innerHTML = `Blog with ID ${id} has been deleted`;
    document.getElementById("success").style.display = "block";
  } catch (error) {
    console.log("There was a problem with the delete operation: " + error.message);
  }
}

function viewBlog(id) {
  console.log(`View blog with ID ${id}`);
  window.location.href = "http://localhost:1234/HTML/blog.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const blogSelect = document.getElementById("blog-select");

  blogSelect.addEventListener("change", function () {
    const selectedBlogId = this.value;
    getInfoBlog(selectedBlogId);
  });

  document.getElementById("edit-all-button").addEventListener("click", function () {
    const editFormContainer = document.getElementById("edit-form-container");
    editFormContainer.style.display = "block";

    const rows = document.querySelectorAll("#blogTable tr");
    rows.forEach((row) => {
      row.addEventListener("click", function () {
        const blogData = JSON.parse(this.dataset.blog);
        document.querySelector('input[name="blogId"]').value = blogData.id;
        document.querySelector('input[name="title"]').value = blogData.title;
        document.querySelector('input[name="content"]').value = blogData.description;
        document.querySelector('input[name="date"]').value = blogData.image;
      });
    });
  });

  document.getElementById("create-button").addEventListener("click", function () {
    const createFormContainer = document.getElementById("create-form-container");
    if (createFormContainer) {
      createFormContainer.style.display = "block";
    } else {
      console.error('Element with id "create-form-container" not found');
    }
  });

  document.getElementById("create-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const titleContent = document.querySelector('input[name="titleCreate"]').value;
    const contentContent = document.querySelector('input[name="contentCreate"]').value;
    const imageContent = document.querySelector('input[name="imageCreate"]').value;

    if (!titleContent || !contentContent || !imageContent) {
      console.error("All fields are required");
      document.getElementById("error").innerText = "All fields are required";
      document.getElementById("error").style.display = "block";
      submitButton.disabled = false;
      return;
    }

    const dataCreate = {
      title: titleContent,
      description: contentContent,
      image: imageContent,
    };

    try {
      const response = await fetch("https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataCreate),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      document.getElementById("success").innerText = "Blog created successfully";
      document.getElementById("success").style.display = "block";
      document.getElementById("error").style.display = "none";
      console.log("Success:", data);
      fetchBlogs(); // Refresh the blog list
    } catch (error) {
      document.getElementById("error").innerText = "There was a problem with the request: " + error.message;
      document.getElementById("error").style.display = "block";
      console.error("There was a problem with the request:", error);
    } finally {
      submitButton.disabled = false;
    }
  });

  fetchBlogs();
});

async function fetchBlogs() {
  try {
    const response = await fetch("https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Blog");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blogs = await response.json();

    const blogSelect = document.getElementById("blog-select");
    blogSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select a Option";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    blogSelect.appendChild(defaultOption);

    const uniqueIds = new Set();

    blogs.forEach((blog) => {
      if (!uniqueIds.has(blog.id)) {
        const option = document.createElement("option");
        option.value = blog.id;
        option.textContent = blog.title;
        blogSelect.appendChild(option);
        uniqueIds.add(blog.id);
      }
    });
  } catch (error) {
    console.log("There was a problem with the fetch operation: " + error.message);
  }
}
