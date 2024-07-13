let currentPage = 1;
const productsPerPage = 8;
let allProducts = [];

// ดึงข้อมูลสินค้าจาก API
function fetchProducts() {
    return fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .catch(error => {
            console.log("Error fetching products:", error);
        });
}

// ฟังก์ชันสำหรับแสดงข้อมูลสินค้าใน HTML
function displayProducts(products, page = 1) {
    const productListDiv = document.getElementById('product-list');
    productListDiv.innerHTML = '';

    products.sort((a, b) => {
        if (a.id === 1 || a.id === 5 || a.id === 9 || a.id === 15) return -1; // ถ้าเป็น id 1, 5, 9, 15 ให้ขึ้นก่อน
        if (b.id === 1 || b.id === 5 || b.id === 9 || b.id === 15) return 1;
        return 0;
    });

    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = products.slice(startIndex, endIndex);

    productsToShow.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('card');

        // สร้างภาพสินค้า
        const imageElement = document.createElement("img");
        imageElement.classList.add('img-card');
        imageElement.src = product.image;
        imageElement.alt = product.title;

        let detailDiv;
        if (product.id === 1 || product.id === 5 || product.id === 9 || product.id === 15) {
            detailDiv = document.createElement('div');
            detailDiv.classList.add('special-detail'); // เพิ่ม class พิเศษสำหรับสินค้าพิเศษ

            const productName = document.createElement('p');
            productName.classList.add('title');
            productName.textContent = product.title;

            const priceSale = document.createElement('div');
            priceSale.classList.add('price-sale')

            const productPrice = document.createElement('p');
            productPrice.classList.add('price');
            productPrice.textContent = `$${product.price}`;

            const newPrice = document.createElement('p');
            newPrice.classList.add('new-price');
            newPrice.textContent = `$${(product.price * 0.7).toFixed(2)}`; // ลดราคา 30%

            const buttonDiv = document.createElement('div');
            const buyButton = document.createElement('button');
            buyButton.classList.add('buy-btn')
            buyButton.textContent = 'buy';
            const detailsButton = document.createElement('button');
            detailsButton.classList.add('details-btn')
            detailsButton.textContent = 'details';
            detailsButton.addEventListener('click', () => {
            showModal(product);
            });

            buttonDiv.appendChild(buyButton);
            buttonDiv.appendChild(detailsButton);

            detailDiv.appendChild(productName);
            detailDiv.appendChild(productPrice);
            detailDiv.appendChild(priceSale);
            detailDiv.appendChild(buttonDiv);

            productDiv.appendChild(imageElement);
            productDiv.appendChild(detailDiv);

            priceSale.appendChild(productPrice);
            priceSale.appendChild(newPrice);

            
            

        } else {
            detailDiv = document.createElement('div');
            detailDiv.classList.add('detail'); // class ปกติสำหรับสินค้าทั่วไป

            const productName = document.createElement('p');
            productName.classList.add('title');
            productName.textContent = product.title;

            const productPrice = document.createElement('p');
            productPrice.classList.add('price');
            productPrice.textContent = `$${product.price}`;

            // สร้างปุ่ม
            const buttonDiv = document.createElement('div');
            const buyButton = document.createElement('button');
            buyButton.classList.add('buy-btn')
            buyButton.textContent = 'buy';
            const detailsButton = document.createElement('button');
            detailsButton.classList.add('details-btn')
            detailsButton.textContent = 'details';
            detailsButton.addEventListener('click', () => {
            showModal(product);
            });

            buttonDiv.appendChild(buyButton);
            buttonDiv.appendChild(detailsButton);

            detailDiv.appendChild(productName);
            detailDiv.appendChild(productPrice);
            detailDiv.appendChild(buttonDiv);

            productDiv.appendChild(imageElement);
            productDiv.appendChild(detailDiv);
        }

        if (product.id === 1 || product.id === 5 || product.id === 9 || product.id === 15) {
            const specialText = document.createElement('div');
            specialText.classList.add('special-text');
            specialText.textContent = 'Special';
            productDiv.appendChild(specialText);
        }

        productListDiv.appendChild(productDiv);
    });
}

// ฟังก์ชันสำหรับสร้างปุ่ม pagination
function createPaginationButtons(totalProducts) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts(allProducts, currentPage);
            createPaginationButtons(totalProducts);
        }
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts(allProducts, currentPage);
            createPaginationButtons(totalProducts);
        }
    });

    paginationDiv.appendChild(prevButton);
    paginationDiv.appendChild(nextButton);
}

// ฟังก์ชันสำหรับแสดงModal
function showModal(product) {
    const modal = document.getElementById("product-modal");
    const modalContent = document.getElementById("modal-product-content");

    modalContent.innerHTML = 
    `
    <img src="${product.image}" alt="${product.title}" style="width:100%; height:400px; object-fit: contain; padding: 20px;">
    <h2>${product.title}</h2>
    <p>${product.description}</p>
    <div style="display:flex; justify-content:space-between; align-items: center; padding: 20px;">
        ${
            (product.id === 1 || product.id === 5 || product.id === 9 || product.id === 15) ?
            `
            <div>
                <p style="font-size: 24px;text-decoration:line-through solid #FF1493;"><strong>Price: $${product.price}</strong></p>
                <p style="font-size: 24px;"><strong>Special Price: $${(product.price * 0.7).toFixed(2)}</strong></p>
            </div>
            ` :
            `
                <p style="font-size: 24px;"><strong>Price: $${product.price}</strong></p>
            `
        }
        <button class="buy-btn">buy</button>
    </div>
    `
    ;

    modal.style.display = "block";

    const closeButton = document.getElementsByClassName("close")[0];
    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// เรียกใช้งานฟังก์ชันเพื่อแสดงสินค้าทั้งหมดเมื่อโหลดหน้าเว็บ
fetchProducts()
    .then(products => {
        allProducts = products;
        displayProducts(allProducts, currentPage);
        createPaginationButtons(allProducts.length);
    });

// เรียกใช้งานฟังก์ชันเพื่อแสดงสินค้าตามหมวดหมู่ที่เลือกเมื่อโหลดหน้าเว็บ
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    fetchProducts()
        .then(products => {
            if (category) {
                allProducts = products.filter(product => product.category === category);
            } else {
                allProducts = products;
            }
            displayProducts(allProducts, currentPage);
            createPaginationButtons(allProducts.length);
        });
});

//เปิดปิดเมนู mobile
function openNav() {
    document.getElementById("menuMobile").style.width = "50%";
  }
  
  function closeNav() {
    document.getElementById("menuMobile").style.width = "0%";
  }

  document.addEventListener("DOMContentLoaded", function() {
    const dropdowns = document.querySelectorAll('.dropdown');

// สำหรับแต่ละ dropdown ใน dropdowns
dropdowns.forEach(function(dropdown) {
    const dropbtn = dropdown.querySelector('.dropbtn');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

        // เมื่อคลิกที่ dropbtn
        dropbtn.addEventListener('click', function() {
            dropdownContent.classList.toggle('show');
        });

        // ซ่อน dropdown ถ้าคลิกที่พื้นที่อื่นนอก dropdown
        window.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target)) {
                dropdownContent.classList.remove('show');
            }
        });
    });
});