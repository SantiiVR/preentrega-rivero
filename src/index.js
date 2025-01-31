import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import  {ProductManager}  from "./data/productManager.js";

const product1 = {
    id: 1110,
    title: "ventilador",
    description: "un ventilador comun",
    price: 6000,
    thumbnail: "",
    code: "23456756666677656",
    stock: 10
}

const product2 = {
    id: 120,
    title: "lamparas editadas",
    description: "un lampara comun",
    price: 6000,
    thumbnail: "",
    code:"23410007777556",
    stock: 12
}

 const product3 = {
    id: 1,
   title: "foco led",
   description: "un led comun",
    price: 600,
    thumbnail: "",
    code: "23417556",
    stock: 12
 }

 const product4 = {
    id: 10,
   title: "tv",
   description: "un tv comun",
    price: 600,
    thumbnail: "",
    code: "234173232323556",
    stock: 12
 }

const pm= new ProductManager("./src/data/product.json")
// pm.addProduct(product1)
// pm.addProduct(product2)
// pm.addProduct(product3)
// pm.addProduct(product4)
// pm.deleteProductById(4)
pm.updateProduct(4,product2)

// console.log(pm.getProducts())

const app = express()

app.use(morgan("tiny"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.listen(8080, (req, res) => {
    console.log("escuchando en el puerto 8080")
})