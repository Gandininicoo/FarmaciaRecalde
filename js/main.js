import {promotionFunction} from './promotions.js'
promotionFunction
import {productosExport} from './productos.js'
import {cartjs} from './carrito.js'
const carritoBTN = document.getElementById("cartBTN")
const carritoDOM = document.getElementById("cart")
let carritoOpen = false
carritoBTN.addEventListener('click', ()=>{carritoOpenClose()})

//CartSlide
function carritoOpenClose(){
    if(carritoOpen === false){
        carritoDOM.className = "cartVisible"
        carritoOpen = true
    }
    else{
        carritoDOM.className = ""
        carritoOpen = false
    }
}

//ProductPrint
printProducts(productosExport)
cartjs
function printProducts(productos) {
    productos.forEach((producto) => {
    printProduct(producto);
    });}
function printProduct(producto) {
    const mainBodyShop = document.getElementById("mainBodyShop");
    const tarjetaProducto = document.createElement("article");
    const productoPrecio = Number(producto.precio);
    tarjetaProducto.className += "productCard";
    tarjetaProducto.innerHTML = `<p class="hiddenDS">${producto.descripcion}</p>
                                <img class="productImg" src="${producto.img}" alt="${producto.nombreProducto}">
                                <div class="productPrice"><p>AR$</p><h3 class="productPriceNumber">${productoPrecio}</h3></div>
                                <h1 class="productName">${producto.nombre}</h1>`

    tarjetaProducto.addEventListener('mouseover', (event) => {nameProductoShowed()})
    tarjetaProducto.addEventListener('mouseout', (event) => {nameProductoHidden()})
    function nameProductoShowed(){
        let nameToShow = tarjetaProducto.lastChild
        nameToShow.className = "productName opacityOn";
    }
    function nameProductoHidden(){
        let nameToShow = tarjetaProducto.lastChild
        nameToShow.className = "productName";
    }
    tarjetaProducto.addEventListener('click', (event) => {openBigCard(tarjetaProducto)})
    mainBodyShop.appendChild(tarjetaProducto) 
}

//openBigCardProd
const bigCardOpener = document.getElementById("productOpenedBackground")
function openBigCard(tarjetaProducto){
    let detailedProductImg = tarjetaProducto.querySelector(".productImg").src
    let detailedProductName = tarjetaProducto.querySelector(".productName").textContent
    let detailedProductPrice = tarjetaProducto.querySelector(".productPriceNumber").textContent
    let detailedProductDescription = tarjetaProducto.querySelector(".hiddenDS").textContent
    const bigCard = document.getElementById("productOpened")
    bigCard.innerHTML = `<img class="openedImg" src="${detailedProductImg}" alt="${detailedProductName}">
                        <div class="openedPrice"><p>AR$</p><h3 class="openedPriceNumber">${detailedProductPrice}</h3></div>
                        <h1 class="openedName">${detailedProductName}</h1>
                        <p class="openedDescription">>${detailedProductDescription}</p>
                        <button class="addToCartBTN" type="button" id="addToCartBTN">Sumar al carrito</button>
                        <button class="closeCard" type="button" id="closeCard"></button>`
    const bigCardCloser = document.getElementById("closeCard")
    bigCardCloser.addEventListener("click",()=>{
        bigCardOpener.className = ""
    })
    bigCardOpener.className = "productOpen"
}

//AddToCart
function getCartButton(){
    const addCartButtons = document.querySelectorAll(".addCartBTN")
    addCartButtons.forEach((addCartBTN)=>{addtoCartClick(addCartBTN)})
}
function addtoCartClick(addCartBTN){
    addCartBTN.addEventListener("click", addtoCartClicked)
}
function addtoCartClicked(event){
    let botonCarrito = event.target;
    let item = botonCarrito.closest(".tarjetaProducto")
    let itemNombre = item.querySelector(".nombreProducto").textContent
    let itemPrecio = Number(item.querySelector(".precioProducto").textContent)
    let itemImagen = item.querySelector(".imagenProducto").src
    let itemCantidad = Number(1)
    let itemSubTotal = Number(item.querySelector(".precioProducto").textContent)
    añadirAlCarrito(itemNombre, itemPrecio, itemImagen, itemCantidad, itemSubTotal);
}

function keyPressEsc() {
    bigCardOpener.className = ""
    carritoDOM.className = ""
}
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        keyPressEsc()
    }
}