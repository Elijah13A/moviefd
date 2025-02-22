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

document.getElementById("quality1").addEventListener("click", function () {
    const quality1 = document.getElementById("open-quality1");
    if (quality1.style.display === "none") {
        quality1.style.display = "block";
    }
    else {
        quality1.style.display = "none"
    }
})

document.getElementById("quality2").addEventListener("click", function () {
    const quality2 = document.getElementById("open-quality2");
    if (quality2.style.display === "none") {
        quality2.style.display = "block";
    }
    else {
        quality2.style.display = "none"
    }
})

document.getElementById("quality3").addEventListener("click", function () {
    const quality3 = document.getElementById("open-quality3");
    if (quality3.style.display === "none") {
        quality3.style.display = "block";
    }
    else {
        quality3.style.display = "none"
    }
})

document.getElementById("quality4").addEventListener("click", function () {
    const quality4 = document.getElementById("open-quality4");
    if (quality4.style.display === "none") {
        quality4.style.display = "block";
    }
    else {
        quality4.style.display = "none"
    }
})

document.getElementById("quality5").addEventListener("click", function () {
    const quality5 = document.getElementById("open-quality5");
    if (quality5.style.display === "none") {
        quality5.style.display = "block";
    }
    else {
        quality5.style.display = "none"
    }
})

document.getElementById("quality6").addEventListener("click", function () {
    const quality6 = document.getElementById("open-quality6");
    if (quality6.style.display === "none") {
        quality6.style.display = "block";
    }
    else {
        quality6.style.display = "none"
    }
})

document.getElementById("quality7").addEventListener("click", function () {
    const quality7 = document.getElementById("open-quality7");
    if (quality7.style.display === "none") {
        quality7.style.display = "block";
    }
    else {
        quality7.style.display = "none"
    }
})

document.getElementById("quality8").addEventListener("click", function () {
    const quality8 = document.getElementById("open-quality8");
    if (quality8.style.display === "none") {
        quality8.style.display = "block";
    }
    else {
        quality8.style.display = "none"
    }
})

document.getElementById("quality9").addEventListener("click", function () {
    const quality9 = document.getElementById("open-quality9");
    if (quality9.style.display === "none") {
        quality9.style.display = "block";
    }
    else {
        quality9.style.display = "none"
    }
})

document.getElementById("quality10").addEventListener("click", function () {
    const quality10 = document.getElementById("open-quality10");
    if (quality10.style.display === "none") {
        quality10.style.display = "block";
    }
    else {
        quality10.style.display = "none"
    }
})



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


let movieVideo = document.getElementById("myVideo");
let movieDescription = document.getElementById("movie-description");
let movieGenres = document.getElementById("genres");
let movieRelease = document.getElementById("release_year");
let movieRank = document.getElementById("rank");

const fetchSeries = async () => {
    try {
        const response = await fetch(apiUrlGeneratorSeries());
        const data = await response.json();
       
        addDataToHTMLSeries(data, document.querySelector(".part-of-movie"));
    } catch (error) {
        console.error("Error fetching series", error);
    }
};

function apiUrlGeneratorSeries() {
    let idParam = new URLSearchParams(window.location.search).get("id");
    return `https://dramoir.com/main/series/${idParam}`;
}

function addDataToHTMLSeries(data, parts) {
    if (!data || !data.seasons || !Array.isArray(data.seasons)) {
        console.error("Invalid data structure: seasons is missing or not an array");
        return;
    }

    movieVideo.setAttribute("src", data.trailer_link || "#");
    movieDescription.innerHTML = data.description || "توضیحات موجود نیست";
    movieGenres.textContent = data.genres.map(genre => genre.name).join(" ، ") || "ژانر نامشخص";
    movieRelease.textContent = data.release_year || "سال انتشار نامشخص";
    movieRank.textContent = data.rate || "امتیاز نامشخص";

    parts.innerHTML = ""; 

    const seasonList = document.createElement("ul");

    data.seasons.forEach((season, index) => {
       
        const seasonItem = document.createElement("li");
        seasonItem.classList.add("col-12", "quality", "set-center"); 
        seasonItem.innerHTML = ` 
            <i class="fa-solid fa-folder-open dark-purple"></i> فصل ${season.number}
        `;
        seasonItem.style.cursor = "pointer";
        seasonItem.style.marginBottom = "10px"; 
    

        const episodeList = document.createElement("div");
        episodeList.style.display = "none";

        seasonItem.addEventListener("click", (event) => {
            event.stopPropagation();
            episodeList.style.display = episodeList.style.display === "none" ? "block" : "none";
        });

        season.episodes.forEach(episode => {
            const episodeItem = document.createElement("li");
            episodeItem.classList.add("col-12", "quality", "set-center");
            episodeItem.innerHTML = ` 
                <i class="fa-solid fa-download dark-purple"></i> قسمت ${episode.number}
            `;
            episodeItem.style.cursor = "pointer";

            const qualityList = document.createElement("ul");
            qualityList.style.display = "none"; 
            qualityList.style.paddingRight = "5px"; 

         
            episodeItem.addEventListener("click", (event) => {
                event.stopPropagation();
                qualityList.style.display = qualityList.style.display === "none" ? "block" : "none";
            });

            if (episode.download_urls && Array.isArray(episode.download_urls)) {
                episode.download_urls.forEach(download => {
                    const qualityItem = document.createElement("li");
                    qualityItem.style.marginBottom = "20px";

                    const link = document.createElement("a");
                    link.setAttribute("href", download.download_url);
                    link.className = "q-y";
                    link.style.padding = "5px 25px";
                    link.textContent = download.quality;

                    qualityItem.appendChild(link);
                    qualityList.appendChild(qualityItem);
                });
            }

            episodeItem.appendChild(qualityList);
            episodeList.appendChild(episodeItem);
        });

   
        seasonList.appendChild(seasonItem);
        seasonList.appendChild(episodeList);
    });

    parts.appendChild(seasonList);
}

fetchSeries();


console.log("سریال")

function toggleSubmenu(element) {
    let parentLi = element.parentElement; // پیدا کردن والد <li>
    let submenu = parentLi.querySelector(".submenu"); // زیرمنو داخل همان <li>
    if (submenu) {
        submenu.style.maxHeight = submenu.style.maxHeight === "0px" || submenu.style.maxHeight === "" 
            ? submenu.scrollHeight + "px" 
            : "0px";
    }
}