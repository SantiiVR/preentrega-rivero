import * as fs from "fs/promises"

export class ProductManager {

    products = []
    static id = 1

    constructor(path) {
        this.path = path
    }

    addProduct = async (product) => {
        try {
            product.id = ProductManager.id
            ProductManager.id++
            this.products = await this.getProducts()
            console.log(this.products)
            this.products.push(product)
            console.log(this.products)
            await fs.writeFile(this.path, JSON.stringify(this.products))

        } catch (error) {
            console.log("error al guardar ", error)
        }
    }

    getProducts = async () => {
        try {
            const products = JSON.parse(await fs.readFile(this.path, "utf-8"))
            return products

        } catch (error) {
            if (error.code === "ENOENT") {
                try {
                    await fs.writeFile(this.path, JSON.stringify([], null, 2))
                    console.log("Archivo creado.")
                } catch (err) {
                    console.log("Error al crear el archivo:", err)
                }
            } else {
                console.log("Error al leer el archivo:", error)
            }
        }
    }

    getProductById = (id) => {
        // Puedes agregar la lógica para obtener un producto por id aquí
    }
}
