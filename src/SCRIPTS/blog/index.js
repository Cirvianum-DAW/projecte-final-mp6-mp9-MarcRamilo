async function getInfo(endpoint) {
  try {
    const response = await fetch(
      `https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/${endpoint}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    createTable(data);
    console.log(data);
  } catch (error) {
    console.log(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}
getInfo("Blog");
function createTable(data) {
  const table = document.getElementById("blogTable");

  // Limpiar la tabla antes de agregar nuevas filas
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }


  // Crear filas de la tabla
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.id = `row-${item.id}`; // Asignar un ID dinámico a la fila
    row.dataset.blog = JSON.stringify(item); // Almacenar datos del blog en un atributo data

    // ID
    const idCell = document.createElement("td");
    idCell.textContent = item.id;
    row.appendChild(idCell);

    // Fecha de creación
    const createdAtCell = document.createElement("td");
    createdAtCell.textContent = new Date(item.createdAt).toLocaleString();
    row.appendChild(createdAtCell);

    // Título
    const titleCell = document.createElement("td");
    titleCell.textContent = item.title;
    row.appendChild(titleCell);

    // Descripción
    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = item.description;
    row.appendChild(descriptionCell);

    // Imagen
    const imageCell = document.createElement("td");
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;
    img.width = 50; // Ajusta el ancho según sea necesario
    imageCell.appendChild(img);
    row.appendChild(imageCell);

    // Acciones
    const actionsCell = document.createElement("td");

    // Botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.id = `delete-${item.id}`; // Asignar un ID dinámico al botón de eliminar
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteBlog(item.id);
    };
    deleteButton.classList.add(
      "bg-red-500",
      "hover:bg-red-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded"
    );
    actionsCell.appendChild(deleteButton);

    // Botón de ver
    const viewButton = document.createElement("button");
    viewButton.id = `view-${item.id}`; // Asignar un ID dinámico al botón de ver
    viewButton.textContent = "View";
    viewButton.onclick = function () {
      viewBlog(item.id);
    };
    viewButton.classList.add(
      "bg-green-500",
      "hover:bg-green-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded"
    );
    actionsCell.appendChild(viewButton);

    row.appendChild(actionsCell);
    table.appendChild(row);
  });
}

// Function to delete a blog post
async function deleteBlog(id) {
  console.log(`Attempting to delete blog with ID ${id}`);
  try {
    const response = await fetch(
      `https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Blog/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Remove the deleted item from the table
    const row = document.getElementById(`row-${id}`);
    if (row) {
      row.parentNode.removeChild(row);
    }
    document.getElementById(
      "success"
    ).innerHTML = `Blog with ID ${id} has been deleted`;
    //put display on
    document.getElementById("success").style.display = "block";
  } catch (error) {
    console.log(
      "There was a problem with the delete operation: " + error.message
    );
  }
}

// Placeholder functions for view actions
function viewBlog(id) {
  console.log(`View blog with ID ${id}`);
  window.location.href = "http://localhost:1234/HTML/blog.html";
}

document.addEventListener("DOMContentLoaded", function () {
  // Obtener el select
  const blogSelect = document.getElementById("blog-select");

  // Event listener para detectar cambios en el select
  blogSelect.addEventListener("change", function () {
    const selectedBlogId = this.value;
    //ADD A DEFAULT OPTION "SELECT A OPTION"
    getInfoBlog(selectedBlogId); // Llama a la función getInfo con el ID seleccionado
  });

  // Fetch blogs from the API and populate the select options
  fetchBlogs();

  // Edit All button event listener
  document
    .getElementById("edit-all-button")
    .addEventListener("click", function () {
      const editFormContainer = document.getElementById("edit-form-container");
      editFormContainer.style.display = "block";

      const rows = document.querySelectorAll("#blogTable tr");
      rows.forEach((row) => {
        row.addEventListener("click", function () {
          const blogData = JSON.parse(this.dataset.blog);
          document.querySelector('input[name="blogId"]').value = blogData.id;
          document.querySelector('input[name="title"]').value = blogData.title;
          document.querySelector('input[name="content"]').value =
            blogData.description;
          document.querySelector('input[name="date"]').value = blogData.image;
        });
      });
    });
});

async function fetchBlogs() {
  try {
    const response = await fetch(
      "https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Blog"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blogs = await response.json();

    // Limpiar el select antes de agregar nuevas opciones
    const blogSelect = document.getElementById("blog-select");
    blogSelect.innerHTML = "";

    // Crear la opción por defecto
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select a Option";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    blogSelect.appendChild(defaultOption);

    // Crear opciones para cada blog y agregarlas al select
    blogs.forEach((blog) => {
      const option = document.createElement("option");
      option.value = blog.id;
      option.textContent = blog.title;
      blogSelect.appendChild(option);
    });
  } catch (error) {
    console.log(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}
async function getInfoBlog(blogId) {
  try {
    const response = await fetch(
      `https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Blog/${blogId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Llena los campos del formulario con los datos obtenidos
    document.querySelector('input[name="title"]').value = data.title;
    document.querySelector('input[name="content"]').value = data.description;
    document.querySelector('input[name="date"]').value = data.image;
    document.querySelector('input[name="image"]').value = data.article_id;
  } catch (error) {
    console.log(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}

//update the blog edit-form
document
  .getElementById("edit-form")
  .addEventListener("submit", function (event) {
    
    // Evita que el formulario se envíe de forma tradicional
    event.preventDefault();

    // Obtiene los valores del formulario
    const blogId = document.querySelector('select[name="blogId"]').value;
    const title = document.querySelector('input[name="title"]').value;
    const content = document.querySelector('input[name="content"]').value;
    const date = document.querySelector('input[name="date"]').value;

    // Prepara los datos a enviar al servidor
    const data = {
      id: blogId,
      title: title,
      description: content,
      image: date,
    };

    // Realiza la solicitud HTTP para actualizar el blog
    fetch(`https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Blog/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        document.getElementById("success").innerHTML =
          "Blog updated successfully";
        //put display on
        document.getElementById("success").style.display = "block";
        // location.reload();
      })
      .catch((error) => {
        // Maneja los errores de la solicitud
        console.error("Hubo un problema con la solicitud:", error);
      });
  });

document.addEventListener("DOMContentLoaded", function () {
  // Agrega el event listener al botón "create-button"
  document
    .getElementById("create-button")
    .addEventListener("click", function () {
      const createFormContainer = document.getElementById(
        "create-form-container"
      );
      if (createFormContainer) {
        createFormContainer.style.display = "block";
      } else {
        console.error('Element with id "create-form-container" not found');
      }
    });
});

document
  .getElementById("create-form")
  .addEventListener("submit", function (event) {
    try {
      event.preventDefault();

      const titleContent = document.querySelector(
        'input[name="titleCreate"]'
      ).value;
      const contentContent = document.querySelector(
        'input[name="contentCreate"]'
      ).value;
      const imageCotent = document.querySelector(
        'input[name="imageCreate"]'
      ).value;

      console.log("Title:", titleContent);
      console.log("Content:", contentContent);
      console.log("Image:", imageCotent);

      if (!titleContent || !contentContent || !imageCotent) {
        console.error("All fields are required");
        document.getElementById("error").innerText = "All fields are required";
        document.getElementById("error").style.display = "block";
        return;
      }

      const dataCreate = {
        title: titleContent,
        description: contentContent,
        image: imageCotent,
      };

      fetch("https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataCreate),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          document.getElementById("success").innerText =
            "Blog created successfully";
          document.getElementById("success").style.display = "block";
          document.getElementById("error").style.display = "none";
          console.log("Success:", data);
        })
        .catch((error) => {
          document.getElementById("error").innerText =
            "Hubo un problema con la solicitud: " + error.message;
          document.getElementById("error").style.display = "block";
          console.error("Hubo un problema con la solicitud:", error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

// fetchBlogs();
