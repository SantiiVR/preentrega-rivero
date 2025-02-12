import { Router } from "express";
import ProductManager from "../utils/productManager.js";
import { socketServer } from "../index.js";


const pm=new ProductManager("./src/data/product.json")

const router=Router()
router.get("/",async (req, res) => {
try {
    const products=await pm.getProducts()
    res.status(200).json(products)
} catch (error) {
    res.status(500).json({message:"ocurrio un error"})
}
})

router.get("/:id",async (req, res) => {
    try {
        const id=req.params.id
        const product=await pm.getProductById(+id)
        if (product) {
            res.status(200).json(product)
        }
        res.status(404).json({message:"producto no encontrado :c"})
    } catch (error) {
        res.status(500).json({message:"ocurrio un error"})
    }
    })

    router.post("/",async (req, res) => {
        try {
            const {title,description,code,price,stock,category,thumbnail}=req.body
            if (!title||!description||!code||!price||!stock||!category||!thumbnail) {
                res.status(400).json([{message:"faltan campos obligatorios"},
                    {
                        title: "campo obligatorio",
                        description: "campo obligatorio",
                        code: "campo obligatorio",
                        price: "campo obligatorio",
                        stock:"campo obligatorio",
                        category: "campo obligatorio",
                        thumbnail:"campo obligatorio"
                    }]
                )
            }
            
            const newProduct=await pm.addProduct({
                title,description,code,price,stock,category,thumbnail
            })
            const newProductList= await pm.getProducts()
            socketServer.emit("products", newProductList)
            res.status(201).json(newProduct)
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"ocurrio un error"})
        }
        })

        router.put("/:id",async (req, res) => {
            try {
                const id=req.params.id
                const {title,description,code,price,stock,category,thumbnail}=req.body
                if (!title||!description||!price||!stock||!category||!thumbnail) {
                    res.status(400).json([{message:"faltan campos obligatorios"},
                        {
                            title: "campo obligatorio",
                            description: "campo obligatorio",
                            
                            price: "campo obligatorio",
                            stock:"campo obligatorio",
                            category: "campo obligatorio",
                            thumbnail:"campo obligatorio"
                        }]
                    )
                }
                
                const updateProduct=await pm.updateProduct(+id,{
                    title,description,price,stock,category,thumbnail
                })
                const newProductList= await pm.getProducts()
                socketServer.emit("products", newProductList)
                res.status(201).json(updateProduct)
            } catch (error) {
                console.log(error)
                res.status(500).json({message:"ocurrio un error"})
            }
            })


            router.delete("/:id",async (req, res) => {
                try {
                    const id=req.params.id
                    const deleteProduct=await pm.deleteProductById(+id)
                    if (deleteProduct) {
                        res.status(200).json({message:"producto eliminado"})
                    }
                    const newProductList= await pm.getProducts()
                    socketServer.emit("products", newProductList)
                    res.status(404).json({message:"producto no encontrado :c"})
                } catch (error) {
                    res.status(500).json({message:"ocurrio un error"})
                }
                })









export default router