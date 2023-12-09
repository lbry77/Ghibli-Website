document.addEventListener("DOMContentLoaded", () => {
    // Sélectionne le conteneur des films dans le HTML
    const movieContainer = document.querySelector('.movie-container');

    const apiURL = "https://ghibliapi.vercel.app/films";

    // Affiche un film dans le DOM
    const displayMovie = (movie) => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');

        // Cree un element div pour le poster du film
        const moviePoster = document.createElement('div');
        moviePoster.classList.add('movie-poster');
        moviePoster.innerHTML = `<img src="${movie.image}" alt="${movie.title}">`;

        // Cree un element div pour les détails du film
        const movieDetailsBox = document.createElement('div');
        movieDetailsBox.classList.add('movie-details-box');

        // Ajoute des div avec les details du film
        movieDetailsBox.innerHTML = `
            <div class="movie-name">${movie.title}</div>
            <div class="director">Réalisateur: ${movie.director}</div>
            <div class="movie-original-name">Titre original: ${movie.original_title}</div>
        `;

        movieItem.appendChild(moviePoster);
        movieItem.appendChild(movieDetailsBox);
        movieContainer.appendChild(movieItem);
    };

    // Affiche tous les films dans le DOM
    const displayAllMovies = () => {
        movieContainer.innerHTML = "";
        filmsData.forEach(displayMovie);
    };

    // Detecte les changements en temps reel dans le champ de recherche
    document.getElementById('Input').addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const foundMovies = filmsData.filter(film => film.title.toLowerCase().includes(searchTerm));
        movieContainer.innerHTML = "";
        foundMovies.forEach(displayMovie);
        if (foundMovies.length === 0) {
            alert("Aucun film trouvé avec ce titre.");
        }
    });

    // Recupere les donnees de l'API et affiche tous les films au chargement initial
    fetch(apiURL)
        .then(response => response.json())
        .then(filmsData => {
            window.filmsData = filmsData;
            displayAllMovies();
        }).catch(error => console.error("Erreur lors de la récupération des données de l'API:", error));
});
