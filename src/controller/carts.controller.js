import CartService from "../service/cart.service";
import { socketServer } from "../index";

class CartController {
cartService = new CartService()

createEmptyCart = async (req, res)  => {
    try {
        const cart= await this.createEmptyCart()
        if (!cart){
            res.status(500).json({message:"error al crear el carrito"})
        } res.status(201).json(cart)
    } catch (error) {
        res.status(500).json({message:"error del servidor"})
    }
}

getCartById = async (req, res)  => {
    try {
        const id=req.params.id
        const cart= await this.getCartById(id)
        if (!cart){
            res.status(404).json({message:"carrito no encontrado"})
        } res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({message:"error del servidor"})
    }
}

addProductToCart = async (req, res)  => {
    try {
        const {cid,pid}=req.params
        const {quantity}=req.body
        if (!quantity){
            res.status(400).json({message:"campo quantity obligatorio"})
        }
        const cart= await this.addProductToCart(cid,pid,quantity)
        if (!cart){
            res.status(404).json({message:"carrito no encontrado"})
        } res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({message:"error del servidor"})
    }
}
}
export default CartController