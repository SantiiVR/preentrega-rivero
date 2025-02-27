import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import productRouter from "./routes/products.routes.js"
import cartRouter from "./routes/carts.routes.js";
import _dirname from "./__dirname.js"
import handlebars from "express-handlebars";
import viewRouter from "./routes/views.routes.js"
import { Server } from "socket.io";
import ProductManager from "./utils/productManager.js";


const app = express()
let rtp
const pm=new ProductManager("./src/data/product.json")

const getrtp= async () => {
  try {
    rtp=await pm.getProducts()
  } catch (error) {
    
  }
}
//middlewares
app.use(morgan("tiny"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
//handlebars
app.engine ("handlebars", handlebars.engine())
app.set("views", _dirname + "/views")
app.set("view engine", "handlebars")
app.use("/public", express.static(_dirname + "/public"))
//routes
app.use("/", viewRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
//serverhttp
const httpServer=app.listen(8080, (req, res) => {
    console.log("escuchando en el puerto 8080")
})
//serverwebsocket
export const socketServer= new Server(httpServer)
socketServer.on("connection", (socket) => {
  console.log("conexion establecida", )
  socket.on("newProduct",async(producData) => {
    try {
      const borrarP= await pm.deleteProductById(id)

      const newProduct= await pm.addProduct(producData)
      
      getrtp()
      socket.emit("products",rtp )
    } catch (error) {
      console.error("error añadiendo producto: ", error.message)
    }
  })
  getrtp()
  socket.emit("products",rtp )
})
