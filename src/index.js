import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import  {ProductManager}  from "./data/productManager.js";

const product1 = {
    id: 100,
    title: "ventilsdor",
    description: "un ventilador comun",
    price: 6000,
    thumbnail: "",
    code: "234567656",
    stock: 10
}

// const product2 = {
//     id: 100,
//     title: "lampara",
//     description: "un lampara comun",
//     price: 600,
//     thumbnail: "",
//     code: "234556",
//     stock: 12
// }

const pm= new ProductManager("./src/data/product.json")
pm.addProduct(product1)
// pm.addProduct(product2)

// console.log(pm.getProducts())

const app = express()

app.use(morgan("tiny"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.listen(8080, (req, res) => {
    console.log("escuchando en el puerto 8080")
})