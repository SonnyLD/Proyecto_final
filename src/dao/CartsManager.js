import fs from 'fs';
import { Carts } from './Carts.js';

export class CartsManager {
    #carts = [];

    #lastId = 1;

    static #defaultPath = './src/files.json/carts.json'; 


    constructor(path) {
        this.path = path ?? CartsManager.#defaultPath;
        this.getCartsFile();
    }

    createCart(products = []) {
        let carts = new Carts(products);
        carts.setId(this.#lastId++);
        this.#carts.push(carts);
        this.saveCartsFile();
    }

    getCartById(cartId) {
        if (isNaN(cartId)) {
            throw new Error('id is not valid, must be a number');
        }
        let cart = this.#carts.find(cart => cart.id == cartId);
        if (!cart){
            throw new Error ("Cart not found");
        } 
        return cart;
    }

    addProductToCart(cartId, productId) { //PENDIENTE: VALIDAR ID DE PRODUCTO
        const cart = this.getCartById(cartId);
        const productExists = cart.products.find(product => product.id == productId);
        if (productExists) {
            productExists.quantity++; //Agrega de 1 en 1.
        } else {
            const product = {
                id: productId,
                quantity: 1,
            }
            cart.products.push(product);
        }
        this.saveCartsFile();
    }

    saveCartsFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.#carts));
    }

    setCarts() {
        let carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        this.#carts = [...carts];
        this.#lastId = this.#carts.length? this.#carts.length : 1;
    }

    getCartsFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.#carts));
            return;
        } else {
            this.setCarts();
        }
    }
}