const searchBar = document.querySelector(".search-bar-container");
const magnifier = document.querySelector(".magnifier");

magnifier.addEventListener("click", () => {
    searchBar.classList.toggle("active");
});


let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}


document.getElementById('download-button').addEventListener('click', function () {
    const myDiv = document.getElementById('parts');
    if (myDiv.style.display === 'none') {
        myDiv.style.display = 'block';
    } else {
        myDiv.style.display = 'none';
    }
});
document.querySelectorAll("[id^='quality']").forEach((element) => {
    element.addEventListener("click", function () {
        const target = document.getElementById(`open-${this.id}`);
        target.style.display = target.style.display === "none" ? "block" : "none";
    });
});

// API
const movieVideo = document.getElementById("myVideo");
const movieDescription = document.getElementById("movie-description");
const movieGenres = document.getElementById("genres");
const movieRelease = document.getElementById("release_year");
const movieRank = document.getElementById("rank");

const fetchProducts = async () => {
    try {
        const idParam = new URLSearchParams(window.location.search).get("id");
        const response = await fetch(`https://dramoir.com/main/movie/${idParam}`);
        const data = await response.json();
        addDataToHTMLMovie(data, document.querySelector(".part-of-movie"));
    } catch (error) {
        console.error("Error fetching movies", error);
    }
};

const addDataToHTMLMovie = (data, parts) => {
    movieVideo.src = data.trailer_link;
    movieDescription.textContent = data.description;
    movieGenres.textContent = data.genres.map(genre => genre.name).join(" ، ");
    movieRelease.textContent = data.related_movies[0].release_year;
    movieRank.textContent = data.rate;

    parts.innerHTML = "";
    const ul = document.createElement("ul");

    data.download_urls.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "col-12 quality set-center";
        li.id = `quality${index + 1}`;
        li.innerHTML = `
            <a href="${item.download_url}" class="myimpcolor">
                ${item.quality}
                <i class="fa-solid fa-download dark-purple"></i>
            </a>
        `;
        ul.appendChild(li);
    });

    parts.appendChild(ul);
};

fetchProducts();


let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if (darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})

