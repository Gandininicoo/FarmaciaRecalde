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
        }
        else{
            this.carrito.push(productoCarrito);
        }
    }
    buscarBorrarProducto(productoABorrar){
        const productoEncontrado = this.carrito.find(prod => prod.nombre === productoABorrar)
        if (productoEncontrado){
            const indexProductoABorrar = this.carrito.indexOf(productoEncontrado)
            this.carrito.splice(indexProductoABorrar, 1)
        }
    }
    buscarSumarProducto(productoASumar){
        const productoSumarEncontrado = this.carrito.find(prod => prod.nombre === productoASumar)
        if (productoSumarEncontrado){
            const indexProductoASumar = this.carrito.indexOf(productoSumarEncontrado)
            this.carrito[indexProductoASumar].cantidad ++
            let subTotalCarrito = this.carrito[indexProductoASumar].cantidad*this.carrito[indexProductoASumar].precio
            this.carrito[indexProductoASumar].subTotal = subTotalCarrito
        }
    }

    buscarRestarProducto(productoARestar){
        const productoRestarEncontrado = this.carrito.find(prod => prod.nombre === productoARestar)
        if (productoRestarEncontrado){
            const indexProductoARestar = this.carrito.indexOf(productoRestarEncontrado)
            if (this.carrito[indexProductoARestar].cantidad >= 2){
            this.carrito[indexProductoARestar].cantidad --
            let subTotalCarrito = this.carrito[indexProductoARestar].cantidad*this.carrito[indexProductoARestar].precio
            this.carrito[indexProductoARestar].subTotal = subTotalCarrito}
            else{
                Swal.fire({
                    title: 'La cantidad minima de productos es 1',
                    text: `` ,
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                })
            }
        }
    }
}