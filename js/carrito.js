function startCart (){
    let carrito = []
    class CarritoListado{
        constructor(carrito){
            this.carrito = carrito;
        }
        agregarProductoCarrito(productoCarrito) {
            let indexProducto = this.carrito.findIndex(prodCarrito => prodCarrito.nombre === productoCarrito.nombre)
            if (indexProducto >= 0){
                this.carrito[indexProducto].cantidad ++
                let subTotalCarrito = this.carrito[indexProducto].cantidad*this.carrito[indexProducto].precio
                this.carrito[indexProducto].subTotal = subTotalCarrito
                Swal.fire({
                    title: 'Has agregado otra unidad al carrito',
                    text: `actualmente tienes ${this.carrito[indexProducto].cantidad} productos de esta clase en carrito` ,
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                })
            }
            else{
                this.carrito.push(ProductoCarrito);
                Swal.fire({
                    title: 'ARTIUCULO AÑADIDO AL CARRITO',
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                })
            }
        }
    }
    class ProductoCarrito {
        constructor(itemNombre,itemPrecio,itemImagen,itemCantidad,itemSubTotal)
        {
            this.nombre=itemNombre,
            this.precio=itemPrecio;
            this.img=itemImagen;
            this.cantidad=itemCantidad;
            this.subTotal=itemSubTotal
            }
    }
}
export const cartjs = startCart()