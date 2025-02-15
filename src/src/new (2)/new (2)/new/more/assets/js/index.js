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



const fetchSeries = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log(data);

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
  
        `;

        keenSlider.appendChild(slideItem);
    });
};

// اجرای تابع `fetchSeries`
fetchSeries("https://dramoir.com/main/home/?format=json");
