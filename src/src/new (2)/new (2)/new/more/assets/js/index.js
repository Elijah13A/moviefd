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

const seriesContainer = document.getElementById("seriesContainer");
const pageTitle = document.getElementById("pageTitle");

// دریافت نوع از URL
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');

// تعیین لینک بر اساس نوع
let apiUrl = "";
switch (type) {
    case "best_korean_series":
        apiUrl = "https://dramoir.com/main/home/best_korean_series/";
        pageTitle.innerText = "بهترین سریال‌های کره‌ای";
        break;
    case "best_chineas_series":
        apiUrl = "https://dramoir.com/main/home/best_chineas_series/";
        pageTitle.innerText = "بهترین سریال‌های چینی";
        break;
    case "best_series":
        apiUrl = "https://dramoir.com/main/home/best_series/";
        pageTitle.innerText = "بهترین سریال‌ها";
        break;
    case "choosen_korean_series":
        apiUrl = "https://dramoir.com/main/home/choosen_korean_series/";
        pageTitle.innerText = "سریال‌های منتخب کره‌ای";
        break;
    case "choosen_movies":
        apiUrl = "https://dramoir.com/main/home/choosen_movies/";
        pageTitle.innerText = "فیلم‌های منتخب";
        break;
    case "choosen_korean_movies":
        apiUrl = "https://dramoir.com/main/home/choosen_korean_movies/";
        pageTitle.innerText = "فیلم‌های منتخب کره‌ای";
        break;
    default:
        apiUrl = "https://dramoir.com/main/home/best_series/";
        pageTitle.innerText = "بهترین سریال‌ها";
        break;
}


// دریافت داده‌ها از API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // استفاده از data.results به جای data
        data.results.forEach(item => {
            const seriesItem = document.createElement("div");
            seriesItem.classList="col-md-2 col-4 movie-hover";
            if (apiUrl.includes("series")){
                seriesItem.innerHTML = `
                <a href="../downloadSerie/imdex.html?id=${item.id}">
                    <img src="https://dramoir.com/${item.image}" style="padding-left:7px" alt="${item.title}">
                    <button>دانلود</button>
                </a>
            `;
            } else {
                seriesItem.innerHTML = `
                <a href="../download/imdex.html?id=${item.id}">
                    <img src="https://dramoir.com/${item.image}" style="padding-left:7px" alt="${item.title}">
                    <button>دانلود</button>
                </a>
            `;
            }
          
            seriesContainer.appendChild(seriesItem);
        });
    })
    .catch(error => console.error('Error fetching data:', error));



function toggleSubmenu(element) {
    let parentLi = element.parentElement; // پیدا کردن والد <li>
    let submenu = parentLi.querySelector(".submenu"); // زیرمنو داخل همان <li>
    if (submenu) {
        submenu.style.maxHeight = submenu.style.maxHeight === "0px" || submenu.style.maxHeight === "" 
            ? submenu.scrollHeight + "px" 
            : "0px";
    }
}