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
  } catch (error) {
    console.log(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}
getInfo("Article");
function createTable(data) {
  const table = document.getElementById("articleTable");

  // Limpiar la tabla antes de agregar nuevas filas
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }

  // Crear filas de la tabla
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.id = `row-${item.id}`; // Asignar un ID dinámico a la fila
    row.dataset.article = JSON.stringify(item); // Almacenar datos del article en un atributo data

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

    // Foto Banner
    const imageCell = document.createElement("td");
    const img = document.createElement("img");
    img.src = item.foto_banner;
    img.alt = item.title;
    img.width = 50; // Ajusta el ancho según sea necesario
    imageCell.appendChild(img);
    row.appendChild(imageCell);

    // Resumen
    const resumCell = document.createElement("td");
    resumCell.textContent = item.resum;
    row.appendChild(resumCell);

    // Descripción
    const descriptionCell = document.createElement("td");
    descriptionCell.innerHTML = item.descripcio; // Utiliza innerHTML para mostrar HTML
    row.appendChild(descriptionCell);

    // articleId
    const articleIdCell = document.createElement("td");
    articleIdCell.textContent = item.articleId;
    row.appendChild(articleIdCell);

    // Acciones
    const actionsCell = document.createElement("td");

    // Botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.id = `delete-${item.id}`; // Asignar un ID dinámico al botón de eliminar
    deleteButton.textContent = "Delete";
    console.log(item);
    deleteButton.onclick = function () {
      deleteArticle(item.BlogId, item.id);
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
      viewarticle(item.id);
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

// Función para obtener los datos del formulario
function getFormData(formId) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
}

// Function to delete a article post
async function deleteArticle(blogId, articleId) {
  console.log(`Attempting to delete article with ID ${articleId}`);
  try {
    if (!blogId) {
      throw new Error("Blog ID is missing or invalid");
    }

    const response = await fetch(
      `https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Blog/${blogId}/Article/${articleId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Remove the deleted item from the table
    const row = document.getElementById(`row-${articleId}`);
    if (row) {
      row.parentNode.removeChild(row);
    }
    document.getElementById(
      "success"
    ).innerHTML = `Article with ID ${articleId} has been deleted`;
    //put display on
    document.getElementById("success").style.display = "block";
  } catch (error) {
    //PRINT THE URL
    console.log(
      `https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Blog/${blogId}/Article/${articleId}`
    );
    console.log(
      "There was a problem with the delete operation: " + error.message
    );
  }
}

// Placeholder functions for view actions
function viewarticle(id) {
  console.log(`View article with ID ${id}`);
  window.location.href = "http://localhost:1234/HTML/blog.html";
}

document.addEventListener("DOMContentLoaded", function () {
  fetchBlogs();
  // Obtener el select
  const articleSelect = document.getElementById("article-select");

  // Event listener para detectar cambios en el select
  articleSelect.addEventListener("change", function () {
    const selectedarticleId = this.value;
    //ADD A DEFAULT OPTION "SELECT A OPTION"
    getInfoarticle(selectedarticleId); // Llama a la función getInfo con el ID seleccionado
  });

  // Fetch articles from the API and populate the select options
  fetcharticles();

  // Edit All button event listener
  document
    .getElementById("edit-all-button-article")
    .addEventListener("click", function () {
      const editFormContainer = document.getElementById(
        "edit-form-container-article"
      );
      editFormContainer.style.display = "block";

      const rows = document.querySelectorAll("#articleTable tr");
      rows.forEach((row) => {
        row.addEventListener("click", function () {
          const articleData = JSON.parse(this.dataset.article);
          document.querySelector('input[name="articleId"]').value =
            articleData.id;
          document.querySelector('input[name="title"]').value =
            articleData.title;
          document.querySelector('input[name="foto_banner"]').value =
            articleData.foto_banner;
          document.querySelector('input[name="resum"]').value =
            articleData.resum;
          document.querySelector('input[name="descripcio"]').value =
            articleData.descripcio;
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
    const blogSelect2 = document.getElementById("blog-select2");
    blogSelect.innerHTML = "";
    blogSelect2.innerHTML = "";

    // Crear la opción por defecto
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select a Option";
    defaultOption.selected = true;
    defaultOption.disabled = true;

    // Agregar la opción por defecto a ambas listas desplegables
    blogSelect.appendChild(defaultOption.cloneNode(true));
    blogSelect2.appendChild(defaultOption.cloneNode(true));

    // Crear opciones para cada blog y agregarlas a las listas desplegables
    blogs.forEach((blog) => {
      const option = document.createElement("option");
      option.value = blog.id;
      option.textContent = blog.title;

      // Agregar las opciones a ambas listas desplegables
      blogSelect.appendChild(option.cloneNode(true));
      blogSelect2.appendChild(option.cloneNode(true));
    });

    // Add event listener after options are populated
    blogSelect.addEventListener("change", function () {
      const selectedBlogId = this.value;
      getInfoBlog(selectedBlogId); // Call the getInfo function with the selected ID
    });
  } catch (error) {
    console.log(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}
async function fetcharticles() {
  try {
    const response = await fetch(
      "https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Article"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const articles = await response.json();

    // Limpiar el select antes de agregar nuevas opciones
    const articleSelect = document.getElementById("article-select");
    articleSelect.innerHTML = "";

    // Crear la opción por defecto
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select a Option";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    articleSelect.appendChild(defaultOption);

    // Crear opciones para cada article y agregarlas al select
    articles.forEach((article) => {
      const option = document.createElement("option");
      option.value = article.id;
      option.textContent = article.title;
      articleSelect.appendChild(option);
    });
  } catch (error) {
    console.log(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}
async function getInfoarticle(articleId) {
  try {
    const response = await fetch(
      `https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Article/${articleId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Llena los campos del formulario con los datos obtenidos
    document.querySelector('input[name="title"]').value = data.title;
    document.querySelector('input[name="foto_banner"]').value =
      data.foto_banner;
    document.querySelector('input[name="resum"]').value = data.resum;
    //vaciar el editor
    const descripcioEditor = tinymce.get("descripcioCreate");
    descripcioEditor.setContent(data.descripcio);
  } catch (error) {
    console.log(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}
document
  .getElementById("edit-form-article")
  .addEventListener("submit", function (event) {
    // Evitar el envío predeterminado del formulario
    event.preventDefault();

    // Recolectar los datos del formulario
    const articleId = document.querySelector(
      'select[name="article-select"]'
    ).value;
    const title = document.querySelector('input[name="title"]').value;
    const foto_banner = document.querySelector(
      'input[name="foto_banner"]'
    ).value;
    const resum = document.querySelector('input[name="resum"]').value;
    const descripcioContent = tinymce.get("descripcioCreate").getContent();
    const blogId = document.getElementById("blog-select").value;

    // Preparar el objeto de datos
    const data = {
      title: title,
      foto_banner: foto_banner,
      resum: resum,
      descripcio: descripcioContent,
      BlogId: blogId,
    };
    console.log(data);
    console.log(articleId, blogId);

    // Enviar la solicitud de actualización
    fetch(
      `https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Blog/${blogId}/Article/${articleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Mostrar mensaje de éxito solo si la solicitud fue exitosa
        document.getElementById("success").innerHTML =
          "Article updated successfully";
        document.getElementById("success").style.display = "block";
        // Actualizar la página o la interfaz de usuario según sea necesario
      })
      .catch((error) => {
        // Manejar errores de solicitud
        console.error("There was a problem with the update request:", error);
      });
  });

document.addEventListener("DOMContentLoaded", function () {
  fetchBlogs();
  // Agrega el event listener al botón "create-button"
  document
    .getElementById("create-button-article")
    .addEventListener("click", function () {
      const createFormContainer = document.getElementById(
        "create-form-container-article"
      );
      if (createFormContainer) {
        createFormContainer.style.display = "block";
      } else {
        console.error('Element with id "create-form-container" not found');
      }
    });
});

document
  .getElementById("create-form-article")
  .addEventListener("submit", async function (event) {
    try {
      event.preventDefault();

      const form = document.getElementById("create-form-article"); // Define the form variable
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;

      const titleContent = form.querySelector(
        'input[name="titleCreate"]'
      ).value;
      const contentContent = form.querySelector(
        'input[name="foto_bannerCreate"]'
      ).value;
      const resumContent = form.querySelector(
        'input[name="resumCreate"]'
      ).value;
      const descripcioContent = tinymce.get("descripcioCreate").getContent();
      const blogIdContent = form.querySelector(
        'select[name="blogIdCreate"]'
      ).value;

      if (
        !titleContent ||
        !contentContent ||
        !resumContent ||
        !descripcioContent ||
        !blogIdContent
      ) {
        console.error("All fields are required");
        document.getElementById("error").innerText = "All fields are required";
        document.getElementById("error").style.display = "block";
        submitButton.disabled = false;
        return;
      }

      const dataCreate = {
        title: titleContent,
        foto_banner: contentContent,
        resum: resumContent,
        descripcio: descripcioContent,
        BlogId: blogIdContent,
      };

      const response = await fetch(
        "https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Article",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataCreate),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      document.getElementById("success").innerText =
        "Article created successfully";
      document.getElementById("success").style.display = "block";
      document.getElementById("error").style.display = "none";
      console.log("Success:", data);
    } catch (error) {
      document.getElementById("error").innerText =
        "There was a problem with the request: " + error.message;
      document.getElementById("error").style.display = "block";
      console.error("There was a problem with the request:", error);
    } finally {
      submitButton.disabled = false;
    }
  });

// fetcharticles();
