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




//api
let movieVideo = document.getElementById("myVideo");
let movieDescription = document.getElementById("movie-description");
let movieGenres = document.getElementById("genres");
let movieRelease = document.getElementById("release_year");
let movieRank = document.getElementById("rank");
let Movies = [];

const fetchProducts = async () => {
    try {
        const response = await fetch(apiUrlGenerator());
        const data = await response.json();

        addDataToHTMLMovie(data, document.querySelector(".part-of-movie"));

    } catch (error) {
        console.error("Error fetching movies", error);
    }
};

function apiUrlGenerator() {
    let idParam = new URLSearchParams(window.location.search).get("id");
    return `https://dramoir.com/main/movie/${idParam}`;
}

function addDataToHTMLMovie(data, parts) {
    movieVideo.setAttribute("src", data.trailer_link);
    movieDescription.innerHTML = data.description;
    movieGenres.textContent = data.genres.map(genre => genre.name).join(" ، ");
    movieRelease.textContent = data.related_movies[0].release_year;
    movieRank.textContent = data.rate;

    parts.innerHTML = ""; // پاک کردن لیست قبلی

    const ul = document.createElement("ul"); // ایجاد یک لیست برای نمایش قسمت‌ها

    for (let i = 0; i < data.download_urls.length; i++) {
        const li = document.createElement("li");
        li.classList.add("col-12", "quality", "set-center");
        li.id = `quality${i + 1}`;
  
        li.innerHTML = `
           <a href="${data.download_urls[i].download_url}">
            ${data.download_urls[i].quality}
                         
            <i class="fa-solid fa-download dark-purple"></i>
         
         </a>  
        `;
        ul.appendChild(li); // اضافه کردن هر قسمت به لیست
        console.log(ul);
    }

    parts.appendChild(ul); // اضافه کردن لیست به `parts`
    console.log(parts);

    /*
        links.forEach((link, index) => {
            let container = document.createElement("div");
            console.log(link.download_urls);
            // تولید داینامیک لیست کیفیت‌ها
            let qualitiesHTML = (link.download_urls).map(quality => `
                <li style="margin-bottom: 20px;">
                    <a href="${quality.url}" class="q-y" style="padding: 5px 25px;" ${quality.url}>
                        ${quality.quality}
                    </a>
                </li>
            `).join('');
    
            container.innerHTML = `
                <li class="col-12 quality set-center" id="quality${index + 1}">
                    <i class="fa-solid fa-download dark-purple"></i> قسمت ${index + 1}
                    <ul id="open-quality${index + 1}">
                        ${qualitiesHTML}
                    </ul>
                </li>
            `;
    
            Array.from(parts).forEach(part => {
                part.appendChild(container);
            });
        });
    */
}

fetchProducts();
/*
let series = []; 
const fetchSeries = async () => {
    try {
        fetch(apiUrlGeneratorSeries()).then(res => res.json()).then(data => addDataToHTMLSeries(data));
        console.log(data);
        Movies = Object.values(data)
            .filter(Array.isArray) 
            .flat(); 

    } catch (error) {
        console.error("Error fetching movies", error);
    }
};

function apiUrlGeneratorSeries() {
    let idParam = new URLSearchParams(window.location.search).get("id");
    return `https://dramoir.com/main/series/${idParam}`
}

function addDataToHTMLSeries(data) {
    movieVideo.setAttribute("src", data.seasons[0].trailer_link);
    movieDescription.innerHTML = data.description;
    movieGenres.textContent = data.genres.map(genre => genre.name).join(" ، ");
    movieRealease.textContent = data.related_movies[0].release_year;
    movieRank.textContent = data.rate;
    console.log(data.related_movies.release_year);
}

fetchSeries();


*/


/**
 * 
 * function addDataToHTMLMovie(data, parts) {
    movieVideo.setAttribute("src", data.trailer_link);
    movieDescription.innerHTML = data.description;
    movieGenres.textContent = data.genres.map(genre => genre.name).join(" ، ");
    movieRelease.textContent = data.related_movies[0].release_year;
    movieRank.textContent = data.rate;

    parts.innerHTML = ""; // پاک کردن لیست قبلی

    const ul = document.createElement("ul"); // ایجاد یک لیست برای نمایش قسمت‌ها

    for (let i = 0; i < data.download_urls.length; i++) {
        const li = document.createElement("li");
        li.classList.add("col-12", "quality", "set-center");
        li.id = `quality${i + 1}`;
        const qua=document.getElementById(`open-quality${i+1}`);
        for(let j=0;j<download_urls.length;j++){
          
            const liq=document.createElement("li");
            liq.style.marginBottom="20px";
            const linkQ=document.createElement("a");
            linkQ.setAttribute.href=data.download_urls.download_url;
            linkQ.innerHTML=data.download_urls.quality;
            liq.appendChild(linkQ);
            qua.appendChild(liq);
        }
      ;

        li.innerHTML = `
            <i class="fa-solid fa-download dark-purple"></i> قسمت ${i + 1}
                            
            <ul id="open-quality${i + 1}">
${qu}
            </ul>
        `;
        ul.appendChild(li); // اضافه کردن هر قسمت به لیست
        console.log(ul);
    }

    parts.appendChild(ul); // اضافه کردن لیست به `parts`
    console.log(parts);

    /*
        links.forEach((link, index) => {
            let container = document.createElement("div");
            console.log(link.download_urls);
            // تولید داینامیک لیست کیفیت‌ها
            let qualitiesHTML = (link.download_urls).map(quality => `
                <li style="margin-bottom: 20px;">
                    <a href="${quality.url}" class="q-y" style="padding: 5px 25px;" ${quality.url}>
                        ${quality.quality}
                    </a>
                </li>
            `).join('');
    
            container.innerHTML = `
                <li class="col-12 quality set-center" id="quality${index + 1}">
                    <i class="fa-solid fa-download dark-purple"></i> قسمت ${index + 1}
                    <ul id="open-quality${index + 1}">
                        ${qualitiesHTML}
                    </ul>
                </li>
            `;
    
            Array.from(parts).forEach(part => {
                part.appendChild(container);
            });
        });
    
}

 
 */