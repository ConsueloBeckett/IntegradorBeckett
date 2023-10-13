import { promises as fs } from "fs"

class ProductManager {
    constructor() {
        this.patch = "./elementos.txt";
        this.productos = [];
    }

    static id = 0;

    addProduct = async (titulo, descripcion, precio, imagen, codigo, stock) => {

        ProductManager.id++
        let newProduct = {
            titulo,
            descripcion,
            precio,
            imagen,
            codigo,
            stock,
            id: ProductManager.id,
        };

        this.productos.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.productos));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta);
    }

    getProducts = async () => {
        // let resp = await this.readProducts()
        //return console.log(resp)
    }

    getProductsById = async (id) => {
        let respu = await this.readProducts();
        if (!respu.find((product) => product.id === id)) {
            console.log("Producto no encontrado");
        } else {
            console.log(respu.find((product) => product.id === id));
        }
    };

    deleteProductsById = async (id) => {
        let respu = await this.readProducts();
        let filterProduct = respu.filter(productos => productos.id != id)
        await fs.writeFile(this.patch, JSON.stringify(filterProduct));
        console.log("Producto Eliminado")
    };

    actualizarProductos = async ({ id, ...producto }) => {
        await this.deleteProductsById(id);
        let prodOld = await this.readProducts()
        let prodMod = [{ ...producto, id }, ...prodOld];
        await fs.writeFile(this.patch, JSON.stringify(prodMod));
    };
}

const elementos = new ProductManager();


elementos.addProduct("TituloUno", "DescripcionUno", 2000, "ImagenUno", "abc1", 5)
elementos.addProduct("TituloDos", "DescripcionDos", 1000, "ImagenDos", "abc2", 10)
elementos.addProduct("TituloTres", "DescripcionTres", 1000, "ImagenTres", "abc3", 15)
elementos.addProduct("TituloCuatro", "DescripcionCuatro", 2000, "ImagenCuatro", "abc4", 5)
elementos.addProduct("TituloCinco", "DescripcionCinco", 3000, "ImagenCinco", "abc5", 10)
elementos.addProduct("TituloSeis", "DescripcionSeis", 1000, "ImagenSeis", "abc6", 15)
elementos.addProduct("TituloSieste", "DescripcionSiete", 5000, "ImagenSiete", "abc7", 15)
elementos.addProduct("TituloOcho", "DescripcionOcho", 2000, "ImagenOcho", "abc8", 10)
elementos.addProduct("TituloNueve", "DescripcionNueve", 4000, "ImagenNueve", "abc9", 5)
elementos.addProduct("TituloDiez", "DescripcionDiez", 6000, "ImagenDiez", "abc10", 15)


elementos.getProducts();
elementos.getProductsById(1);
elementos.deleteProductsById(2)

elementos.actualizarProductos({
    "titulo": "TituloOcho",
    "descripcion": "DescripcionNueve",
    "precio": 5000,
    "imagen": "ImagenNueve",
    "codigo": "abc9",
    "stock": 20,
    "id": 1
})