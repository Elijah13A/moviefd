const searchBar = document.querySelector(".search-bar-container");  
const magnifier = document.querySelector(".magnifier"); 

magnifier.addEventListener("click", ()=>{ 
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

if(darkmode === "active") enableDarkmode()

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode')
  darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})



document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.querySelector(".magnifier");
    const searchInput = document.querySelector(".input");

    async function fetchProducts() {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            return await response.json();
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    }

    searchIcon.addEventListener("click", async function () {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        const products = await fetchProducts();
        const foundProduct = products.find(product => product.title.toLowerCase().includes(query));

        if (foundProduct) {
            window.location.href = `../download/imdex.html?id=${foundProduct.id}`;
            document.querySelector('.input').value = '';
        } else {
            const searchMessage1 = document.getElementById('search-message1');
            searchMessage1.textContent = 'فیلمی با این عنوان پیدا نشد!'; 
            // بعد از یک ثانیه متن را پاک کن
            setTimeout(() => {
                searchMessage1.textContent = "";
            }, 2000);
            document.querySelector('.input').value = '';
        }
    });
});



//api
const fetchSeriesDetails = async (type, seriesIds) => {
    try {
        const apiUrl = `https://dramoir.com/main/home/?format=json`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
        }

        const data = await response.json();
        const seriesData = data[type]; // انتخاب داده‌ها بر اساس نوع دسته‌بندی

        if (seriesData) {
            displaySeries(seriesData);
        }
    } catch (error) {
        console.error("Error fetching series details:", error);
      
    }
};

const displaySeries = (series) => {
    const seriesContainer = document.getElementById("seriesContainer");
    const pageTitle = document.getElementById("pageTitle");

    // پاک کردن محتوای قبلی
    seriesContainer.innerHTML = "";

    if (series && series.length > 0) {
        pageTitle.textContent = "سریال‌های منتخب"; // عنوان صفحه

        // ایجاد کارت‌ها برای هر سریال
        series.forEach(item => {
            const seriesItem = document.createElement("div");
            seriesItem.className = "col-md-2 col-4 movie-hover";

            seriesItem.innerHTML = `
                <a href="#">
                    <img src="https://dramoir.com/${item.image}">
                  
                    <button>دانلود</button>
                </a>
            `;

            seriesContainer.appendChild(seriesItem);
        });
    } 
};

// دریافت پارامترهای URL
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type'); // دریافت نوع دسته‌بندی
const seriesIds = urlParams.get('series'); // دریافت شناسه‌ها

if (type && seriesIds) {
    fetchSeriesDetails(type, seriesIds);
} else {
    document.getElementById("seriesContainer").innerHTML = "<p>هیچ سریالی انتخاب نشده است.</p>";
}