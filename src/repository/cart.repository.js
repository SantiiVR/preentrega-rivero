import cartModel from "../models/cart.models";

class CartRepository {

createEmptyCart=async() => {
    return await cartModel.insertOne(cartModel)
    //crear solo si no existe uno ya
}

    getCart = async (id) => {
        return await cartModel.findOne({_id:id}).lean()
    };


    addProductToCart = async (cid, pid, qty) => {
        return await cartModel.findByIdAndUpdate({_id:id}, updateCartModel, {new:true})
            }
}

// crear peticion para de eliminar producto de el cart

export default CartRepository