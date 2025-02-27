

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

const fetchSeries = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        // ارسال داده‌ها به تابع `addDataToHTML` بر اساس نوع سریال
        if (data.best_korean_series) {
            addDataToHTML(data.best_korean_series, document.getElementById("keen-slider"));
            
        }
        if (data.best_chineas_series) {
            addDataToHTML(data.best_chineas_series, document.getElementById("keen-slider2"));
        }
        if (data.best_series) {
            addDataToHTML(data.best_series, document.getElementById("keen-slider3"));
        }
        if (data.choosen_korean_series) {
            addDataToHTML(data.choosen_korean_series, document.getElementById("keen-slider4"));
        }
    } catch (error) {
        console.error("Error fetching series:", error);
    }
};

// تابع برای اضافه کردن داده‌ها به HTML
const addDataToHTML = (series, keenSlider) => {
    if (!keenSlider) return; // اگر المنت وجود نداشت، خروج

    keenSlider.innerHTML = ""; // پاک کردن محتوا قبل از اضافه کردن داده جدید

    series.forEach((serie) => {
        const slideItem = document.createElement("div");
        slideItem.classList.add("keen-slider__slide");

        slideItem.innerHTML = `
            <div class="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12 poster poster-back">
                <div style="position: relative;" class="row">
                    <div class="col-md-4 col-6 img-container">
                        
                            <img src="https://dramoir.com/${serie.image}" class="img-poster">
                        
                    </div>
                    <div class="col-6 col-md-8 info">
                        <h3 class="spanb-sm" style="margin-bottom: 18px;">${serie.title}</h3>
                        <span class="f-info success delete-green"> زیرنویس قسمت ${serie.episodes_number} اضافه شد </span>
                        <div class="f-info">
                            <span>تاریخ انتشار :</span>
                            <span>${serie.release_year}</span>
                        </div>
                        <div class="f-info">
                            <span>امتیاز :</span>
                            <span>${serie.rate}</span>
                        </div>
                    </div>
                    <button class="watch-btn specialbutton">
                        <a href="downloadSerie/imdex.html?id=${serie.id}" class="f-info btn-a">تماشا و دانلود</a>
                    </button>
                </div>
            </div>
        `;

        keenSlider.appendChild(slideItem);
    });
};

// اجرای تابع `fetchSeries`
fetchSeries("https://dramoir.com/main/home/?format=json");



//search
document.querySelector('.search-btn').addEventListener('click', async function () {
    const inputElement = document.querySelector('input[data-search]');
    const searchValue = inputElement.value.trim().toLowerCase();
    const searchMessage = document.getElementById('search-message');

    if (!searchValue) return;

    try {
        const response = await fetch(`https://dramoir.com/main/search/?q=${encodeURIComponent(searchValue)}`);
        const data = await response.json();

        // ترکیب تمام لیست‌های داخل شیء `data` در یک آرایه واحد
        const allMovies = Object.values(data).flat();

        if (!Array.isArray(allMovies)) {
            throw new Error('فرمت داده‌ها نادرست است!');
        }

        const foundMovie = allMovies.find(item => item.title.toLowerCase().includes(searchValue));

        if (foundMovie) {
            window.location.href = `download/imdex.html?id=${foundMovie.id}`;
            inputElement.value = ''; // پاک کردن فیلد جستجو
        } else {
            searchMessage.textContent = 'فیلمی با این عنوان پیدا نشد!';
            searchMessage.style.color = 'red';
            inputElement.value = '';
        }
    } catch (error) {
        console.error('خطا در دریافت داده‌ها:', error);
        searchMessage.textContent = 'مشکلی در دریافت اطلاعات پیش آمده!';
        searchMessage.style.color = 'red';
    }
});


document.querySelector('.delete-btn').addEventListener('click', function () {
    document.querySelector('input[data-search]').value = ''; // پاک کردن مقدار ورودی
});


// top search
document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.querySelector(".magnifier");
    const searchInput = document.querySelector(".input");

    async function fetchProducts(query) {
        try {
            const response = await fetch(`https://dramoir.com/main/search/?q=${encodeURIComponent(query)}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    }

    searchIcon.addEventListener("click", async function () {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        const products = await fetchProducts(query);
        if (!products || typeof products !== "object") {
            console.error("فرمت داده‌های دریافتی نادرست است!");
            return;
        }

        const allMovies = Object.values(products).flat();
        if (!Array.isArray(allMovies) || allMovies.length === 0) {
            console.error("هیچ محصولی یافت نشد!");
            return;
        }

        const foundProduct = allMovies.find(product => product.title.toLowerCase().includes(query));

        if (foundProduct) {
            window.location.href = `download/imdex.html?id=${foundProduct.id}`;
        } else {
            const searchMessage1 = document.getElementById('search-message1');
            if (searchMessage1) {
                searchMessage1.textContent = 'فیلمی با این عنوان پیدا نشد!';
                setTimeout(() => {
                    searchMessage1.textContent = "";
                }, 2000);
            }
        }

        searchInput.value = ""; // پاک کردن مقدار ورودی پس از جستجو
    });
});



const fetchMovies = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
       

        // ارسال داده‌ها به تابع `addDataToHTML` بر اساس نوع سریال
        if (data.choosen_korean_movie) {
            addDataToHTMLMovie(data.choosen_korean_movie, document.getElementById("slider1"));
        }
        if (data.choosen_movie) {
            addDataToHTMLMovie(data.choosen_movie, document.getElementById("slider2"));
        }

    } catch (error) {
        console.error("Error fetching series:", error);
    }
};

// تابع برای اضافه کردن داده‌ها به HTML
const addDataToHTMLMovie = (series, keenSlider) => {
    if (!keenSlider) return; // اگر المنت وجود نداشت، خروج

    keenSlider.innerHTML = ""; // پاک کردن محتوا قبل از اضافه کردن داده جدید

    let container = document.createElement("div");
    container.classList.add("container-fluid");

    for (let i = 0; i < Math.min(8, series.length); i += 4) {
        const row = document.createElement("div");
        row.classList.add("row"); // اضافه کردن کلاس برای کنترل نمایش ردیف‌ها

        if (i >= 4) {
            row.style.marginTop = "30px"; // فاصله ۳۰ پیکسلی برای ردیف دوم
        }

        for (let j = i; j < i + 4 && j < Math.min(8, series.length); j++) {
            const serie = series[j];
            const col = document.createElement("div");
            col.classList.add("col-md-3", "movie-hover");

            col.innerHTML = `
<div class="col-md-3 movie-hover" style="    display: flex;
            align-items: center;
            justify-content: center;">
                    <a href="download/imdex.html?id=${serie.id}">
                        <img src="https://dramoir.com/${serie.image}">
                      <div class="shiny-circle">
        <div class="sharp-triangle"></div>
    </div>
                    </a>
                </div>
            `;
            row.appendChild(col);
        }
        container.appendChild(row);
    }
    keenSlider.appendChild(container);
};

// اجرای تابع `fetchMovies`
fetchMovies("https://dramoir.com/main/home/?format=json");


const fetchPhone = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
      

        if (data.choosen_movie) {
            addDataToHTMLPhone(data.choosen_movie, document.getElementById("keen-slider5"));
        }

        if (data.choosen_korean_movie) {
            addDataToHTMLPhone(data.choosen_korean_movie, document.getElementById("keen-slider6"));
        }

    } catch (error) {
        console.error("Error fetching series:", error);
    }
};

// تابع برای اضافه کردن داده‌ها به HTML
const addDataToHTMLPhone = (series, keenSlider) => {
    if (!keenSlider) return; // اگر المنت وجود نداشت، خروج

    keenSlider.innerHTML = ""; // پاک کردن محتوا قبل از اضافه کردن داده جدید

    for (let i = 0; i < series.length / 2; i++) {
        const topSerie = series[i]; // سریال بالایی
        const bottomSerie = series[i + Math.floor(series.length / 2)]; // سریال پایینی

        const slideItem = document.createElement("div");
        slideItem.classList.add("keen-slider__slide");

        slideItem.innerHTML = `
            <div class="col-md-3 movie-hover" id="first-half" style="display: flex; align-items: center; justify-content: center;">
                <a href="download/imdex.html?id=${topSerie.id}">
                    <img src="https://dramoir.com/${topSerie.image}">
                    <div class="shiny-circle">
                        <div class="sharp-triangle"></div>
                    </div>
                </a>
            </div>
            <div class="col-md-3 movie-hover" id="second-half" style="display: flex; align-items: center; justify-content: center;">
                <a href="download/imdex.html?id=${bottomSerie.id}">
                    <img src="https://dramoir.com/${bottomSerie.image}">
                    <div class="shiny-circle">
                        <div class="sharp-triangle"></div>
                    </div>
                </a>
            </div>
        `;

        keenSlider.appendChild(slideItem);
    }
};

// اجرای تابع `fetchPhone`
fetchPhone("https://dramoir.com/main/home/?format=json");


// more page
const fetchMore = async (apiUrls) => {
    try {
        const fetchPromises = apiUrls.map(url => fetch(url).then(response => {
            if (!response.ok) {
                console.warn(`Failed to fetch ${url}: ${response.status}`);
                return null; // بازگشت null برای URLهای ناموفق
            }
            return response.json();
        }));

        const results = await Promise.all(fetchPromises);

        results.forEach((data, index) => {
            if (!data) return; // اگر داده null باشد، از آن صرف‌نظر کنید

            const apiUrl = apiUrls[index];
            

            // بررسی وجود `results` و اینکه یک آرایه است
            if (!data.results || !Array.isArray(data.results)) {
                console.warn(`Expected 'results' array in data from ${apiUrl}, but received:`, data);
                return;
            }

            // ارسال `data.results` به تابع `addDataToHTMLMore`
            if (apiUrl.includes("best_korean_series")) {
                addDataToHTMLMore(data.results, document.getElementById("headerSec1"), "جدیدترین سریال های کره ای", "best_korean_series");
            } else if (apiUrl.includes("best_chineas_series")) {
                addDataToHTMLMore(data.results, document.getElementById("headerSec2"), "جدیدترین سریال های چینی", "best_chineas_series");
            } else if (apiUrl.includes("best_series")) {
                addDataToHTMLMore(data.results, document.getElementById("headerSec3"), "بهترین سریال ها", "best_series");
            } else if (apiUrl.includes("choosen_korean_series")) {
                addDataToHTMLMore(data.results, document.getElementById("headerSec4"), "سریال های منتخب کره ای", "choosen_korean_series");
            } else if (apiUrl.includes("choosen_movies")) {
                addDataToHTMLMore(data.results, document.getElementById("headerSec5"), "فیلم های منتخب", "choosen_movies");
            } else if (apiUrl.includes("choosen_korean_movies")) {
                addDataToHTMLMore(data.results, document.getElementById("headerSec6"), "فیلم های منتخب کره ای", "choosen_korean_movies");
            }
        });

    } catch (error) {
        console.error("Error fetching series:", error);
    }
};

const addDataToHTMLMore = (series, keenSlider, title, type) => {
    if (!keenSlider) return; // اگر المنت وجود نداشت، خروج

    keenSlider.innerHTML = ""; // پاک کردن محتوا قبل از اضافه کردن داده جدید

    // بررسی اینکه آیا series یک آرایه است
    if (!Array.isArray(series)) {
        console.error("Expected an array, but received:", series);
        return;
    }

    const slideItem = document.createElement("div");

    // فرض می‌کنیم که هر آیتم در series یک شیء با یک فیلد `id` است
    const seriesIds = series.map(item => item.id).join(",");

    slideItem.innerHTML = `
        <h4 class="spanb-sm dark-mc" style="font-weight:bolder; margin-right: -30px;">${title}</h4>
        <a href="more/index.html?type=${type}&series=${seriesIds}"><span class="all" style="font-weight: bolder;">مشاهده همه</span></a>
    `;

    keenSlider.appendChild(slideItem);
};

// لیست URLهای API
const apiUrls = [
    "https://dramoir.com/main/home/best_korean_series/",
    "https://dramoir.com/main/home/best_chineas_series/",
    "https://dramoir.com/main/home/best_series/",
    "https://dramoir.com/main/home/choosen_korean_series/",
    "https://dramoir.com/main/home/choosen_movies/",
    "https://dramoir.com/main/home/choosen_korean_movies/"
];

// اجرای تابع `fetchMore` با لیست URLها
fetchMore(apiUrls);


function toggleSubmenu(element) {
    let parentLi = element.parentElement; // پیدا کردن والد <li>
    let submenu = parentLi.querySelector(".submenu"); // زیرمنو داخل همان <li>
    if (submenu) {
        submenu.style.maxHeight = submenu.style.maxHeight === "0px" || submenu.style.maxHeight === "" 
            ? submenu.scrollHeight + "px" 
            : "0px";
    }
}

//fetch navbar
const apiUrlsseries = [
    "https://dramoir.com/main/home/best_korean_series/",
    "https://dramoir.com/main/home/best_chineas_series/",
    "https://dramoir.com/main/home/best_series/",
    "https://dramoir.com/main/home/choosen_korean_series/",
  
];


const apiUrlsmovies = [
   
    "https://dramoir.com/main/home/choosen_movies/",
    "https://dramoir.com/main/home/choosen_korean_movies/"
];


const fetchNavbar = async (apiUrlsseries) => {
    try {
        const fetchPromises = apiUrlsseries.map(async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.warn(`Failed to fetch ${url}: ${response.status}`);
                    return null;
                }
                return await response.json();
            } catch (error) {
                console.warn(`Error fetching ${url}:`, error);
                return null;
            }
        });

        const results = await Promise.all(fetchPromises);

        const dropdownContent = document.getElementById("dropdown-content1");
        if (!dropdownContent) {
            console.error("Element with id 'dropdown-content1' not found");
            return;
        }
        dropdownContent.innerHTML = ""; // Clear existing content

        results.forEach((data, index) => {
            if (!data) return;
            const apiUrl = apiUrlsseries[index];
            if (!data.results || !Array.isArray(data.results)) {
                console.warn(`Expected 'results' array in data from ${apiUrl}, but received:`, data);
                return;
            }

            // Create a new link for each category
            const link = document.createElement("a");
            if (apiUrl.includes("best_korean_series")) {
                link.href = "more/index.html?type=best_korean_series&series=" + data.results.map(item => item.id).join(",");
                link.textContent = "سریال کره ای";
            } else if (apiUrl.includes("best_chineas_series")) {
                link.href = "more/index.html?type=best_chineas_series&series=" + data.results.map(item => item.id).join(",");
                link.textContent = "سریال چینی";
            } else if (apiUrl.includes("best_series")) {
                link.href = "more/index.html?type=best_series&series=" + data.results.map(item => item.id).join(",");
                link.textContent = "سریال خارجی";
            } else if (apiUrl.includes("choosen_korean_series")) {
                link.href = "more/index.html?type=choosen_korean_series&series=" + data.results.map(item => item.id).join(",");
                link.textContent = "سریال ترکی";
            }

            dropdownContent.appendChild(link);
        });
    } catch (error) {
        console.error("Error fetching series:", error);
    }
};

fetchNavbar(apiUrlsseries);

// fetch navbar2
const fetchNavbar2 = async (apiUrlsmovies) => {
    try {
        const fetchPromises = apiUrlsmovies.map(async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.warn(`Failed to fetch ${url}: ${response.status}`);
                    return null;
                }
                return await response.json();
            } catch (error) {
                console.warn(`Error fetching ${url}:`, error);
                return null;
            }
        });

        const results = await Promise.all(fetchPromises);

        const dropdownContent = document.getElementById("dropdown-content2");
        if (!dropdownContent) {
            console.error("Element with id 'dropdown-content2' not found");
            return;
        }
        dropdownContent.innerHTML = ""; // Clear existing content

        results.forEach((data, index) => {
            if (!data) return;
            const apiUrl = apiUrlsmovies[index];
            if (!data.results || !Array.isArray(data.results)) {
                console.warn(`Expected 'results' array in data from ${apiUrl}, but received:`, data);
                return;
            }

            // Create a new link for each category
            const link = document.createElement("a");
            if (apiUrl.includes("choosen_movies")) {
                link.href = "more/index.html?type=choosen_movies&series=" + data.results.map(item => item.id).join(",");
                link.textContent = "فیلم کره ای";
            } else if (apiUrl.includes("choosen_korean_movies")) {
                link.href = "more/index.html?type=choosen_korean_movies&series=" + data.results.map(item => item.id).join(",");
                link.textContent = " فیلم خارجی";
            }
            dropdownContent.appendChild(link);
        });
    } catch (error) {
        console.error("Error fetching series:", error);
    }
};

fetchNavbar2(apiUrlsmovies);





// phone navbar
const fetchNavbarphone = async (apiUrlsseries) => {
    try {
        const fetchPromises = apiUrlsseries.map(async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.warn(`Failed to fetch ${url}: ${response.status}`);
                    return null;
                }
                return await response.json();
            } catch (error) {
                console.warn(`Error fetching ${url}:`, error);
                return null;
            }
        });

        const results = await Promise.all(fetchPromises);

        const dropdownContent = document.getElementById("submenu1");
        if (!dropdownContent) {
            console.error("Element with id 'submenu1' not found");
            return;
        }
        dropdownContent.innerHTML = ""; // Clear existing content

        // Create a <ul> element
        const ul = document.createElement("ul");
        ul.className = "submenu";

        results.forEach((data, index) => {
            if (!data) return;
            const apiUrl = apiUrlsseries[index];
            if (!data.results || !Array.isArray(data.results)) {
                console.warn(`Expected 'results' array in data from ${apiUrl}, but received:`, data);
                return;
            }

            // Create a new <li> element for each category
            const li = document.createElement("li");
            li.className = "submenu-item";

            // Create a new <a> element
            const link = document.createElement("a");
            if (apiUrl.includes("best_korean_series")) {
                link.href = "more/index.html?type=best_korean_series&series=" + data.results.map(item => item.id).join(",");
                link.textContent = "سریال کره ای";
            } else if (apiUrl.includes("best_chineas_series")) {
                link.href = "more/index.html?type=best_chineas_series&series=" + data.results.map(item => item.id).join(",");
                link.textContent = "سریال چینی";
            } else if (apiUrl.includes("best_series")) {
                link.href = "more/index.html?type=best_series&series=" + data.results.map(item => item.id).join(",");
                link.textContent = "سریال خارجی";
            } else if (apiUrl.includes("choosen_korean_series")) {
                link.href = "more/index.html?type=choosen_korean_series&series=" + data.results.map(item => item.id).join(",");
                link.textContent = "سریال ترکی";
            }

            // Append the <a> to the <li>, and the <li> to the <ul>
            li.appendChild(link);
            ul.appendChild(li);
        });

        // Append the <ul> to the dropdown content
        dropdownContent.appendChild(ul);
    } catch (error) {
        console.error("Error fetching series:", error);
    }
};

fetchNavbarphone(apiUrlsseries);

const fetchNavbar3 = async (apiUrlsmovies) => {
    try {
        const fetchPromises = apiUrlsmovies.map(async (url) => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.warn(`Failed to fetch ${url}: ${response.status}`);
                    return null;
                }
                return await response.json();
            } catch (error) {
                console.warn(`Error fetching ${url}:`, error);
                return null;
            }
        });

        const results = await Promise.all(fetchPromises);

        const dropdownContent = document.getElementById("submenu2");
        if (!dropdownContent) {
            console.error("Element with id 'submenu2' not found");
            return;
        }
        dropdownContent.innerHTML = ""; // Clear existing content

        // Create a <ul> element
        const ul = document.createElement("ul");
        ul.className = "submenu";

        results.forEach((data, index) => {
            if (!data) return;
            const apiUrl = apiUrlsmovies[index];
            if (!data.results || !Array.isArray(data.results)) {
                console.warn(`Expected 'results' array in data from ${apiUrl}, but received:`, data);
                return;
            }

            // Create a new <li> element for each category
            const li = document.createElement("li");
            li.className = "submenu-item";

            // Create a new <a> element
            const link = document.createElement("a");
            if (apiUrl.includes("choosen_movies")) {
                link.href = "more/index.html?type=choosen_movies&series=" + data.results.map(item => item.id).join(",");
                link.textContent = "فیلم کره ای";
            } else if (apiUrl.includes("choosen_korean_movies")) {
                link.href = "more/index.html?type=choosen_korean_movies&series=" + data.results.map(item => item.id).join(",");
                link.textContent = "فیلم خارجی";
            }

            // Append the <a> to the <li>, and the <li> to the <ul>
            li.appendChild(link);
            ul.appendChild(li);
        });

        // Append the <ul> to the dropdown content
        dropdownContent.appendChild(ul);
    } catch (error) {
        console.error("Error fetching series:", error);
    }
};

fetchNavbar3(apiUrlsmovies);