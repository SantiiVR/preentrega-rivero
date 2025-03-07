import * as fs from "fs/promises";
import path from "path";

class CartManager {
carts=[]

constructor (path){
    this.path=path
}

createEmptyCart=async() => {
try {
        const cart={id:0, products:[]}
            this.carts = await this.getCarts();
            if (this.carts.length > 0) {
                this.carts.sort((a, b) => b.id - a.id);
                cart.id = this.carts[0].id + 1;
            } else {
                cart.id = 1;
            }
            this.carts.push(cart);
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
            console.log("Producto agregado:", cart);
            return cart 
        } catch (error) {
            console.error("Error al guardar el carrito:", error);
        }
}

    getCarts = async () => {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            let carts = JSON.parse(data);
            carts = carts.sort((a, b) => a.id - b.id);
            return carts;
        } catch (error) {
            if (error.code === "ENOENT") {
                try {
                    await fs.writeFile(this.path, JSON.stringify([], null, 2));
                    console.log("Archivo creado.");
                    return [];
                } catch (err) {
                    console.error("Error al crear el archivo:", err);
                }
            } else {
                console.error("Error al leer el archivo:", error);
            }
        }
        return [];
    };

    getCartProductsById = async (id) => {
        try {
            this.carts=await this.getCarts()
            const cart=this.carts.find((c) => c.id === id)
            if (!cart) {
                console.log("carrito no encontrado")
                return 
            }
            console.log("el carrito id: "+ id + ": ",cart)
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    addProductToCart = async (cid, pid, qty) => {
        try {
            // Verificar la existencia del carrito
            const cart = await this.getCartProductsById(cid);
            if (!cart) {
                console.log("El carrito con id: " + cid + " no existe");
                return;
            }
    
            // Verificar si el producto ya existe en el carrito
            const existProduct = cart.products.find((p) => p.id === pid);
            if (!existProduct) {
                // Si no existe, agregar el producto con la cantidad especificada
                const newProduct = { id: pid, quantity: qty };
                cart.products.push(newProduct);
            } else {
                // Si existe, incrementar la cantidad
                existProduct.quantity += qty;
            }
    
            // Actualizar la lista de carritos
            this.carts = await this.getCarts();
            const newCarts = this.carts.map((c) => (c.id === cid ? cart : c));
            await fs.writeFile(this.path, JSON.stringify(newCarts, null, 2));
    
            console.log("Producto agregado:", cart);
            return cart;
        } catch (error) {
            console.error("No se pudo agregar el producto:", error);
        }
    };
}

export default CartManager