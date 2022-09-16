import {promotionFunction} from './promotions.js'
promotionFunction
import {productosExport} from './productos.js'
let carrito =[]
const carritoBTN = document.getElementById("cartBTN")
const carritoDOM = document.getElementById("cart")
const carritoListado = new CarritoListado(carrito);
let carritoOpen = false
carritoBTN.addEventListener('click', ()=>{carritoOpenClose()})

//CartSlide
function carritoOpenClose(){
    if(carritoOpen === false){
        carritoDOM.className = "cartVisible"
        carritoOpen = true
        imprimirTotalCarrito()
    }
    else{
        carritoDOM.className = ""
        carritoOpen = false
    }
}

//ProductPrint
printProducts(productosExport)
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
    getCartButton()
}

//AddToCart
function getCartButton(){
    const addCartButton = document.getElementById("addToCartBTN")
    addCartButton.addEventListener("click", addtoCartClicked)
}
function addtoCartClicked(event){
    let botonCarrito = event.target;
    let item = botonCarrito.closest(".productOpened")
    let itemNombre = item.querySelector(".openedName").textContent
    let itemPrecio = Number(item.querySelector(".openedPriceNumber").textContent)
    let itemImagen = item.querySelector(".openedImg").src
    let itemCantidad = Number(1)
    let itemSubTotal = Number(item.querySelector(".openedPriceNumber").textContent)
    añadirAlCarrito(itemNombre, itemPrecio, itemImagen, itemCantidad, itemSubTotal);
    bigCardOpener.className = ""
}
function añadirAlCarrito(itemNombre, itemPrecio, itemImagen,itemCantidad,itemSubTotal){
    let productoCarrito = new ProductoCarrito(
      itemNombre,
      itemPrecio,
      itemImagen,
      itemCantidad,
      itemSubTotal
    );
    carritoListado.agregarProductoCarrito(productoCarrito)
    console.log(carrito)
    imprimirEnCarrito()
}
function imprimirEnCarrito(){
    let carritoAImprimir = document.getElementById("bodyCarrito")
    carritoAImprimir.innerHTML= "";
    carritoListado.carrito.forEach((productoCarrito) => {
      const productoImpreso = document.createElement("div")
      productoImpreso.setAttribute("class","productoCarrito")
      productoImpreso.innerHTML = `<img class="imagenProductoCarrito" src="${productoCarrito.img}" alt="${productoCarrito.nombre}">
                                    <p  class="nombreProductoCarrito">${productoCarrito.nombre}</p>
                                    <div class="cantidadProductoCarrito"><button class="restarCantidadProducto">-</button><p>${productoCarrito.cantidad}</p><button class="sumarCantidadProducto">+</button></div>
                                    <p  class="totalPrecioProductoCarrito">${productoCarrito.subTotal}</p>
                                    <button class="eliminarProductoCarrito">X</button>`
      carritoAImprimir.appendChild(productoImpreso)
    })
    imprimirTotalCarrito()
    getDeleteButton()
    getSumarButton()
    getRestarButton()
}
function imprimirTotalCarrito()
{
  let totalCarritoContenedor = document.getElementById("totalCarrito")
  let totalCarritoACobrar = carritoListado.carrito.reduce((acc, prod) => acc + prod.subTotal, 0)
  totalCarritoContenedor.innerText = `AR$ : ${totalCarritoACobrar}`
  return totalCarritoACobrar
}
function getDeleteButton(){
    const deleteButtons = document.querySelectorAll(".eliminarProductoCarrito")
    
    deleteButtons.forEach((deleteButton) => (deleteButtonClick(deleteButton)))
  }
  function deleteButtonClick(deleteButton){
    deleteButton.addEventListener("click", deleteButtonClicked)
  }
  function deleteButtonClicked(event){
    let deleteBTN = event.target
    let itemABorrar = deleteBTN.closest(".productoCarrito")
    let productoABorrar = itemABorrar.querySelector(".nombreProductoCarrito").textContent
    carritoListado.buscarBorrarProducto(productoABorrar)
    imprimirEnCarrito()
  }
  
  function getSumarButton(){
    const sumarButtons = document.querySelectorAll(".sumarCantidadProducto")
    sumarButtons.forEach((sumarButton) => (sumarButtonClick(sumarButton)))
  }
  function sumarButtonClick(sumarButton){
    sumarButton.addEventListener("click", sumarButtonClicked)
  }
  function sumarButtonClicked(event){
    let sumarBTN = event.target
    let itemASumar = sumarBTN.closest(".productoCarrito")
    let productoASumar = itemASumar.querySelector(".nombreProductoCarrito").textContent
    carritoListado.buscarSumarProducto(productoASumar)
    imprimirEnCarrito()
  }
  
  function getRestarButton(){
    const restarButtons = document.querySelectorAll(".restarCantidadProducto")
    restarButtons.forEach((restarButton) => (restarButtonClick(restarButton)))
  }
  function restarButtonClick(restarButton){
    restarButton.addEventListener("click", restarButtonClicked)
  }
  function restarButtonClicked(event){
    let restarBTN = event.target
    let itemARestar = restarBTN.closest(".productoCarrito")
    let productoARestar = itemARestar.querySelector(".nombreProductoCarrito").textContent
    carritoListado.buscarRestarProducto(productoARestar)
    imprimirEnCarrito()
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