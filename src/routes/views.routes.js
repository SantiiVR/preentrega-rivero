import { Router } from "express";
import ProductManager from "../utils/productManager.js";


const pm=new ProductManager("./src/data/product.json")
const router= Router()
router.get ("/products", async (req, res) => {
    try {
        const products= await pm.getProducts()
        res.render("index", {products} )
        
    } catch (error) {
        
    }
    
})
router.get ("/realtimeproducts", async (req, res) => {
    try {
        
        res.render("realTimeProducts")
        
    } catch (error) {
        
    }
    
})





export default router