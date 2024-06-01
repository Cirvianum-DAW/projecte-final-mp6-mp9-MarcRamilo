// Obtener referencia al select de los blogs
const blogSelect = document.getElementById("blog-select");

// Función para cargar la lista de blogs en el select
function cargarBlogs() {
    // Realizar solicitud HTTP para obtener la lista de blogs
    fetch("https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Blog")
        .then(response => response.json())
        .then(data => {
            // Limpiar el select
            blogSelect.innerHTML = "";
            console.log("Blogs cargados:", data);
            // Agregar una opción por cada blog
            data.forEach(blog => {
                const option = document.createElement("option");
                option.value = blog.id; // Asignar el ID del blog como el valor de la opción
                option.textContent = blog.title; // Asignar el nombre del blog como el texto de la opción
                blogSelect.appendChild(option);
            });

            // Añadir la opción para mostrar todos los artículos
            const allOption = document.createElement("option");
            allOption.value = "all";
            allOption.textContent = "All the articles";
            blogSelect.appendChild(allOption);

            // Cargar los artículos al cargar la página
            cargarArticulos();
        })
        .catch(error => {
            console.error("Error al cargar los blogs:", error);
        });
}

function cargarArticulos(orden) {
    let selectedBlogIds = [];

    // Si la opción seleccionada es "all", cargar todos los artículos sin especificar un blog en particular
    if (blogSelect.value === "all") {
        // Realizar solicitud HTTP para obtener todos los artículos
        fetch(`https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Article`)
            .then(response => response.json())
            .then(data => {
                // Ordenar los artículos según el criterio seleccionado
                if (orden === 'date') {
                    data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordenar por fecha
                } else if (orden === 'id') {
                    data.sort((a, b) => a.id - b.id); // Ordenar por ID
                } else if (orden === 'title') {
                    data.sort((a, b) => a.title.localeCompare(b.title)); // Ordenar por título (alfabéticamente)
                }

                // Mostrar los artículos en el área de visualización de artículos en tu página
                console.log("Todos los artículos:", data);

                // Obtener el contenedor donde se mostrarán los artículos
                let articleContainer = document.getElementById("articleContainer");
                articleContainer.innerHTML = ""; // Limpiar el contenido anterior

                // Iterar sobre los datos de los artículos
                data.forEach(article => {
                    // Crear elementos HTML para mostrar la información del artículo
                    const articleElement = document.createElement("div");
                    articleElement.classList.add("article");

                    const titleElement = document.createElement("h2");
                    titleElement.textContent = article.title;

                    const fotoElement = document.createElement("img");
                    fotoElement.alt = article.title;
                    fotoElement.src = article.foto_banner;

                    const resumElement = document.createElement("p");
                    resumElement.textContent = article.resum;

                    const descripcioElement = document.createElement("div");
                    descripcioElement.innerHTML = article.descripcio;

                    // Agregar los elementos al contenedor principal
                    articleElement.appendChild(titleElement);
                    articleElement.appendChild(fotoElement);
                    articleElement.appendChild(resumElement);
                    articleElement.appendChild(descripcioElement);
                    articleContainer.appendChild(articleElement);
                });
            })
            .catch(error => {
                console.error("Error al cargar todos los artículos:", error);
            });
        return; // Salir de la función después de realizar la solicitud para todos los artículos
    }

    // Si no se selecciona "All the articles", obtener los IDs de los blogs seleccionados
    selectedBlogIds = Array.from(blogSelect.selectedOptions).map(option => option.value);

    // Realizar solicitud HTTP para obtener los artículos asociados a los blogs seleccionados
    Promise.all(selectedBlogIds.map(blogId =>
            fetch(`https://6644bb32b8925626f88fb22b.mockapi.io/api/v1/Blog/${blogId}/Article`)
            .then(response => response.json())
        ))
        .then(data => {
            // Ordenar los artículos según el criterio seleccionado
            if (orden === 'date') {
                data.forEach(articles => {
                    articles.sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordenar por fecha
                });
            } else if (orden === 'id') {
                data.forEach(articles => {
                    articles.sort((a, b) => a.id - b.id); // Ordenar por ID
                });
            } else if (orden === 'title') {
                data.forEach(articles => {
                    articles.sort((a, b) => a.title.localeCompare(b.title)); // Ordenar por título (alfabéticamente)
                });
            }
            mostrarArticulos(data);

            // Mostrar los artículos en el área de visualización de artículos en tu página
            console.log("Artículos asociados a los blogs seleccionados:", data);

            // Obtener el contenedor donde se mostrarán los artículos
            let articleContainer = document.getElementById("articleContainer");
            articleContainer.innerHTML = ""; // Limpiar el contenido anterior

            // Iterar sobre los datos de los artículos
            data.forEach(articles => {
                articles.forEach(article => {
                    // Crear elementos HTML para mostrar la información del artículo
                    const articleElement = document.createElement("div");
                    articleElement.classList.add("article");

                    const titleElement = document.createElement("h2");
                    titleElement.textContent = article.title;

                    const fotoElement = document.createElement("img");
                    fotoElement.src = article.foto_banner;

                    const resumElement = document.createElement("p");
                    resumElement.textContent = article.resum;

                    const descripcioElement = document.createElement("div");
                    descripcioElement.innerHTML = article.descripcio;

                    // Agregar los elementos al contenedor principal
                    articleElement.appendChild(titleElement);
                    articleElement.appendChild(fotoElement);
                    articleElement.appendChild(resumElement);
                    articleElement.appendChild(descripcioElement);
                    articleContainer.appendChild(articleElement);
                });
            });
        })
        .catch(error => {
            console.error("Error al cargar los artículos:", error);
        });
}
function mostrarArticulos(data) {
    // Obtener el contenedor donde se mostrarán los artículos
    let articleContainer = document.getElementById("articleContainer");
    articleContainer.innerHTML = ""; // Limpiar el contenido anterior

    // Iterar sobre los datos de los artículos
    data.forEach(article => {
        // Crear elementos HTML para mostrar la información del artículo
        const articleElement = document.createElement("div");
        articleElement.classList.add("article");

        const titleElement = document.createElement("h2");
        titleElement.textContent = article.title;

        const fotoElement = document.createElement("img");
        fotoElement.src = article.foto_banner;

        const resumElement = document.createElement("p");
        resumElement.textContent = article.resum;

        const descripcioElement = document.createElement("div");
        descripcioElement.innerHTML = article.descripcio;

        // Agregar los elementos al contenedor principal
        articleElement.appendChild(titleElement);
        articleElement.appendChild(fotoElement);
        articleElement.appendChild(resumElement);
        articleElement.appendChild(descripcioElement);
        articleContainer.appendChild(articleElement);
    });
}
// Escuchar cambios en el select de los blogs
blogSelect.addEventListener("change", () => {
    cargarArticulos(); // Cargar los artículos por defecto al cambiar la selección del blog
});

// Cargar la lista de blogs al cargar la página
cargarBlogs();

// if document.getElementById("ordenarPorFecha")



if (document.getElementById("ordenarPorId")) {
    document.getElementById("ordenarPorId").addEventListener("click", () => {
        cargarArticulos('id');
    });
}

if (document.getElementById("ordenarPorTitulo")) {
    document.getElementById("ordenarPorTitulo").addEventListener("click", () => {
        cargarArticulos('title');
    });
}
// nuevo metodo llamado loadAllArticles que cargue con DOMContentLoaded sin seleccionar ningun blog
// y que cargue todos los articulos
// y que se ejecute al cargar la pagina

document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar la opción "All the articles" por defecto
    blogSelect.value = "all";
    // Cargar los artículos al cargar la página
    cargarArticulos();
});