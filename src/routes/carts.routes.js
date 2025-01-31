import { Router } from "express";
import CartManager from "../utils/cartManager.js";

const cm=new CartManager("./src/data/cart.json")

const router=Router()

router.post("/" ,async (req, res)  => {
    try {
        const cart= await cm.createEmptyCart()
        if (!cart){
            res.status(500).json({message:"error al crear el carrito"})
        } res.status(201).json(cart)
    } catch (error) {
        res.status(500).json({message:"error del servidor"})
    }
})

router.get("/:id" ,async (req, res)  => {
    try {
        const id=req.params.id
        const cart= await cm.getCartProductsById(+id)
        if (!cart){
            res.status(404).json({message:"carrito no encontrado"})
        } res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({message:"error del servidor"})
    }
})


router.post("/:cid/product/:pid" ,async (req, res)  => {
    try {
        const {cid,pid}=req.params
        const {quantity}=req.body
        if (!quantity){
            res.status(400).json({message:"campo quantity obligatorio"})
        }
        const cart= await cm.addProductToCart(+cid,+pid,quantity)
        if (!cart){
            res.status(404).json({message:"carrito no encontrado"})
        } res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({message:"error del servidor"})
    }
})








export default router