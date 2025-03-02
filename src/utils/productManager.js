import * as fs from "fs/promises";
import { nanoid } from "nanoid";

class ProductManager {
    products = [];
    static id = 1;

    constructor(path) {
        this.path = path;
    }
    addProduct = async (product) => {
        try {
            this.products = await this.getProducts();
            const productExists = this.products.some(p => p.code === product.code);
            if (productExists) {
                console.log("El producto ya existe:", product);
                return;
            }
            if (this.products.length > 0) {
                this.products.sort((a, b) => b.id - a.id);
                product.id = this.products[0].id + 1;
            } else {
                product.id = 1;
            }
            this.products.push({...product,code:nanoid()});
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log("Producto agregado:", product);
            return product
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    };

    getProducts = async () => {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            let products = JSON.parse(data);
            products = products.sort((a, b) => a.id - b.id);
            return products;
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

    getProductById = async (id) => {
        try {
            this.products = await this.getProducts();
    
            
            const prod = this.products.find((p) => p.id === id);
    
            if (prod) {
                console.log("Producto encontrado:", prod);
                return prod;
            } else {
                console.log("Producto no encontrado");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener el producto por ID:", error);
            return null;
        }
    };
    
    deleteProductById = async (id) => {
        try {
            this.products = await this.getProducts();
            const productoFiltrado = this.products.filter((p) => p.id !== id);
    
            if (productoFiltrado.length === this.products.length) {
                console.log("Producto no encontrado");
                return false;
            }
    
            this.products = productoFiltrado;
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log("Producto eliminado:", id);
            return true;
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
    
        }
    };

    updateProduct = async (id, updatedProduct) => {
        try {
            const existingProduct = await this.getProductById(id);
            if (!existingProduct) {
                console.log("Producto no encontrado:", id);
                return;
            }
            const newProduct = { ...existingProduct, ...updatedProduct, id: existingProduct.id };
            await this.deleteProductById(id);
            this.products = await this.getProducts();
            this.products.push(newProduct);
            this.products.sort((a, b) => a.id - b.id); 
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log("Producto actualizado:", newProduct);
            return newProduct
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    };
}

export default ProductManager