import CartRepository from "../repository/cart.repository.js"

class CartService {
    cartRepository = new CartRepository()

createEmptyCart = async (cartModel) => {
    // Verificar la existencia del carrito
    return await this.cartModel.insertOne(...cartModel)
}

    getCartById = async (id) => {
        return await this.cartRepository.getCartById(id)
    }

    addProductToCart = async (cid, pid, qty, cartModels) => {
            // Verificar la existencia del carrito
            const cart= await this.getCartById(id)
            if (!cart) throw new Error("");
            // Verificar si el producto ya existe en el carrito
            // Si no existe, agregar el producto con la cantidad especificada
            // Si existe, incrementar la cantidad
            // Actualizar la lista de carrito
                return await this.cartRepository.addProductToCart(id)
            };
}

// crear funcion que permita eliminar el producto de el carrito


export default CartService