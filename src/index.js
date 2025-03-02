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
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import 'dotenv/config'


const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("conectado con mongo db")
  } catch (error) {
    console.log("error al conectar")
  }
}
connectMongoDB()
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
app.use("/api/user", userRouter)
//serverhttp
const httpServer=app.listen(process.env.PORT || 8080, (req, res) => {
    console.log(`escuchando en el puerto ${process.env.PORT}`)
})
//serverwebsocket
export const socketServer= new Server(httpServer)
// En el servidor (Socket.IO)
socketServer.on("connection", (socket) => {
  // Al recibir un nuevo producto desde el cliente
  socket.on("newProduct", async (productData) => {
    try {
      // Añadir el nuevo producto
      await pm.addProduct(productData);
      
      // Asegurarnos de que obtenemos los productos actualizados
      await getrtp();  // Esperar a que rtp esté actualizado
      socket.emit("products", rtp);  // Enviar la lista de productos actualizada a todos los clientes
    } catch (error) {
      console.error("Error añadiendo producto: ", error.message);
    }
  });

  // Emitir la lista de productos al conectar un nuevo cliente
  getrtp();  // Esperar a que rtp esté actualizado
  socket.emit("products", rtp);  // Emitir productos al cliente
});
