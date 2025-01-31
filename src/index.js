import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import productRouter from "./routes/products.routes.js"
import cartRouter from "./routes/carts.routes.js";


const app = express()

//middlewares
app.use(morgan("tiny"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
//routes
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
//server
app.listen(8080, (req, res) => {
    console.log("escuchando en el puerto 8080")
})