import fs from 'fs';

export default class ProductManager {
    #products = [];

    #maxId = 0;

    static #defaultPath = './src/files.json/products.json'; 
    // La ruta es relativa a la carpeta donde se corra node/nodemon. 
    // Si se ejecuta desde src funciona con la ruta './products.json', si se ejecuta desde la carpeta base es necesario usar './src/products.json'
    // Se sugiere correr script 'npm run dev' para evitar problemas con la ruta

    constructor(path) {
        this.path = path ?? ProductManager.#defaultPath;
        this.getProductsFile();
    }

    getProductByCode(code) {
        if (typeof code !== 'string' || code.length === 0) {
            throw new Error('Code is not valid');
        }
        let product = this.#products.find(product => product.code === code);
        if (!product){
            throw new Error ("Product not found");
        } 
        return product;
    }

    getProductById(id) {
        if (isNaN(id)) {
            throw new Error('id is not valid, must be a number');
        }
        let product = this.#products.find(product => product.id == id);
        if (!product){
            throw new Error ("Product not found");
        } 
        return product;
    }

    alreadyExists(code) {
        let product = this.#products.find(product => product.code == code);
        return product ? true : false;
    }
    
    addProduct(product) {
        if (!this.alreadyExists(product.code)) {
            product.setId(++this.#maxId);
            this.#products.push(product);
            this.saveProductsFile();
        } else {
            throw new Error ("Product's code already exists");	
        }
    } 
    
    getProduct() {
        return this.#products;
    }

    updateProductById(id, updatedProduct) {
        const indexToUpdate = this.#products.findIndex(product => product.id == id);
        if (indexToUpdate === -1) {
            throw new Error ("Product not found");
        } else {
            this.#products[indexToUpdate] = {...updatedProduct, id: id};
            this.saveProductsFile();
        }
    }

    deleteProductById(id) {
        let product = this.#products.find(product => product.id == id);
        if (!product) {
            throw new Error ("Product not found");
        } else {
            this.#products.splice(this.#products.indexOf(product), 1);
            this.saveProductsFile();
        }
    }

    saveProductsFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.#products));
    }

    setProducts() {
        let products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        this.#products = [...products];
        this.getMaxId();
    }

    getMaxId() {
        let maxId = 0;
        this.#products.forEach(product => {
            if (product.id > maxId) {
                maxId = product.id;
            }
        });
        this.#maxId = maxId;
    }

    getProductsFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.#products));
            return;
        } else {
            this.setProducts();
        }
    }
}