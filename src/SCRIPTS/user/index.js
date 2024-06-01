async function getInfo(endpoint) {
  try {
    const response = await fetch(
      `https://6644bf0bb8925626f88fc5ad.mockapi.io/api/v2/${endpoint}`
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
getInfo("Users");
function createTable(data) {
  const table = document.getElementById("userTable");

  // Limpiar la tabla antes de agregar nuevas filas
  table.innerHTML = "";

  // Crear filas de la tabla
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.id = `row-${item.id}`; // Asignar un ID dinámico a la fila
    row.dataset.user = JSON.stringify(item); // Almacenar datos del usuario en un atributo data

    // ID
    const idCell = document.createElement("td");
    idCell.textContent = item.id;
    row.appendChild(idCell);

    // Fecha de creación
    const createdAtCell = document.createElement("td");
    createdAtCell.textContent = new Date(item.createdAt).toLocaleString();
    row.appendChild(createdAtCell);

    // Nombre
    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    // Correo electrónico
    const emailCell = document.createElement("td");
    emailCell.textContent = item.email;
    row.appendChild(emailCell);

    // Contraseña
    const passwordCell = document.createElement("td");
    passwordCell.textContent = item.password;
    row.appendChild(passwordCell);

    // Tipo de usuario
    const typeUserCell = document.createElement("td");
    typeUserCell.textContent = item.typeUser;
    row.appendChild(typeUserCell);

    // Acciones
    const actionsCell = document.createElement("td");

    // Botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.id = `delete-${item.id}`; // Asignar un ID dinámico al botón de eliminar
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteUser(item.id);
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
    row.appendChild(actionsCell);
    table.appendChild(row);
  });
}

// Function to delete a blog post
async function deleteUser(id) {
  console.log(`Attempting to delete user with ID ${id}`);
  try {
    const response = await fetch(
      `https://6644bf0bb8925626f88fc5ad.mockapi.io/api/v2/Users/${id}`,
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
    ).innerHTML = `User with ID ${id} has been deleted`;
    //put display on
    document.getElementById("success").style.display = "block";
  } catch (error) {
    console.log(
      "There was a problem with the delete operation: " + error.message
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Obtener el select
  const userSelect = document.getElementById("user-select");

  // Event listener para detectar cambios en el select
  userSelect.addEventListener("change", function () {
    const selectedUserId = this.value;
    // Llama a la función getInfoUsers con el ID seleccionado
    getInfoUsers(selectedUserId);
  });

  // Fetch users from the API and populate the select options
  fetchUsers();

  // Edit All button event listener
  document
    .getElementById("edit-all-button-user")
    .addEventListener("click", function () {
      const editFormContainer = document.getElementById(
        "edit-form-container-user"
      );
      editFormContainer.style.display = "block";
      
      const rows = document.querySelectorAll("#userTable tr");
      rows.forEach((row) => {
        row.addEventListener("click", function () {
          // const userData = JSON.parse(this.dataset.user); 
          // console.log(userData);
          document.querySelector('input[name="userId"]').value = userData.id;
          document.querySelector('input[name="name"]').value = userData.name;
          document.querySelector('input[name="email"]').value = userData.email;
          document.querySelector('input[name="password"]').value =
            userData.password;
          document.querySelector('input[name="typeUser"]').value =
            userData.typeUser;
        });
      });
      
    });
});

async function fetchUsers() {
  try {
    const response = await fetch(
      "https://6644bf0bb8925626f88fc5ad.mockapi.io/api/v2/Users"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    // Limpiar el select antes de agregar nuevas opciones
    const userSelect = document.getElementById("user-select");
    userSelect.innerHTML = "";

    // Crear la opción por defecto
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select a Option";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    userSelect.appendChild(defaultOption);

    // Crear opciones para cada usuario y agregarlas al select
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name; // Aquí se muestra el nombre del usuario
      userSelect.appendChild(option);
    });
  } catch (error) {
    console.log(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}
async function getInfoUsers(userId) {
  try {
    const response = await fetch(
      `https://6644bf0bb8925626f88fc5ad.mockapi.io/api/v2/Users/${userId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    // Verificar que los elementos existan antes de establecer los valores
    const userIdInput = document.querySelector('input[name="userId"]');
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const typeUserInput = document.querySelector('input[name="typeUser"]');

    if (
      userIdInput &&
      nameInput &&
      emailInput &&
      passwordInput &&
      typeUserInput
    ) {
      // Llena los campos del formulario con los datos obtenidos
      userIdInput.value = data.id;
      nameInput.value = data.name;
      emailInput.value = data.email;
      passwordInput.value = data.password;
      typeUserInput.value = data.typeUser;
    } else {
      console.log("One or more form input elements not found.");
    }
  } catch (error) {
    console.log(
      "There was a problem with the fetch operation: " + error.message
    );
  }
}
//update the blog edit-form
document
  .getElementById("edit-form-user")
  .addEventListener("submit", function (event) {
    // const createFormContainer = document.getElementById(
    //   "create-form-container-user"
    // );
    // createFormContainer.parentNode.removeChild(createFormContainer);

    // document.getElementById("create-form-container-user").style.display =
    //   "none";
    event.preventDefault();

    //display none to the create form
    const userId = document.querySelector('select[name="userId"]').value;
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const image = document.querySelector('input[name="typeUser"]').value;

    const data = {
      id: userId, // Utiliza el ID del usuario
      name: name,
      email: email,
      password: password,
      typeUser: image,
    };

    fetch(
      `https://6644bf0bb8925626f88fc5ad.mockapi.io/api/v2/Users/${userId}`,
      {
        // Utiliza el ID del usuario
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
        document.getElementById("success").innerHTML =
          "User updated successfully";
        document.getElementById("success").style.display = "block";
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
  });

document.addEventListener("DOMContentLoaded", function () {
  // Agrega el event listener al botón "create-button"
  document
    .getElementById("create-button-user")
    .addEventListener("click", function () {
      const createFormContainer = document.getElementById(
        "create-form-container-user"
      );
      if (createFormContainer) {
        createFormContainer.style.display = "block";
      } else {
        console.error('Element with id "create-form-container" not found');
      }
    });
});

document
  .getElementById("create-form-user")
  .addEventListener("submit", function (event) {
    try {
      event.preventDefault();
      //display none to the edit form
      document.getElementById("edit-form-container-user").style.display =
        "none";

      const nameContent = document.getElementById("name").value;
      const emailContent = document.getElementById("email").value;
      const passwordContent = document.getElementById("password").value;
      const typeUserContent = document.getElementById("typeUser").value;

      console.log(nameContent, emailContent, passwordContent, typeUserContent);

      if (
        !nameContent ||
        !emailContent ||
        !passwordContent ||
        !typeUserContent
      ) {
        console.error("All fields are required");
        document.getElementById("error").innerText = "All fields are required";
        document.getElementById("error").style.display = "block";
        return;
      }

      const dataCreate = {
        name: nameContent,
        email: emailContent,
        password: passwordContent,
        typeUser: typeUserContent,
      };

      // Validate if mail exists in the API
      fetch("https://6644bf0bb8925626f88fc5ad.mockapi.io/api/v2/Users")
        .then((response) => response.json())
        .then((data) => {
          const emailExist = data.find((user) => user.email === emailContent);
          if (emailExist) {
            document.getElementById("error").innerText =
              "Email already exists in the database";
            document.getElementById("error").style.display = "block";
            return;
          }

          // If email is valid and does not exist, proceed with creating the user
          fetch("https://6644bf0bb8925626f88fc5ad.mockapi.io/api/v2/Users", {
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
                "User created successfully";
              document.getElementById("success").style.display = "block";
              document.getElementById("error").style.display = "none";
              console.log("Success:", data);
            })
            .catch((error) => {
              document.getElementById("error").innerText =
                "There was a problem with the request: " + error.message;
              document.getElementById("error").style.display = "block";
              console.error("There was a problem with the request:", error);
            });
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

// fetchBlogs();
