import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getProductsByShoppingCart = async (req, res) => {
    try {
        const { id } = req.params
        if (isNaN(id)) {
            console.log('Id erroneo');
            res.status(404).json({ error: 'El parametro no es un número' }).end();
            return;
        }
        const productsOnCarts = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../persistence/ProductsCart.json'), 'utf-8'));
        const cart = productsOnCarts.find(cart => cart.id === Number(id));

        if (!cart) {
            console.log('El carrito no existe');
            res.status(404).json({ error: 'El carrito no existe' }).end();
            return;
        }
        await res.status(200).json(cart);
        console.log('Carrito encontrado');
    } catch (error) {
        res.status(500).json({ error: error.message }).end();
    }
}

const createShoppingCart = async (req, res) => {
    try {
        const carts = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../persistence/ProductsCart.json'), 'utf-8'));
        const ids = carts.map(cart => cart.id);
        let maxId = Math.max(...ids);
        if (ids.length === 0) {
            maxId = 0
        }
        const timestamp = Date.now();
        const newCart = [{
            id: maxId + 1,
            timestamp: timestamp,
            productos: []
        }]
        const cartId = newCart.map(cart => cart.id)
        const newCarts = [...carts, ...newCart];
        await fs.promises.writeFile(path.join(__dirname, '../persistence/ProductsCart.json'), JSON.stringify(newCarts));
        res.status(201).json({ msg: `Carrito con ID ${cartId} agregado con exito` });
    } catch (error) {
        res.status(500).json({ error: error.message }).end();
    }
}

const addProductToShoppingCart = async (req, res) => {
    try {
        const { id } = req.params
        if (isNaN(id)) {
            console.log('Id erroneo');
            res.status(404).json({ error: 'El parametro no es un número' }).end();
            return;
        }
        const carts = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../persistence/ProductsCart.json'), 'utf-8'));
        const cartID = carts.find(cart => cart.id === Number(id));
        if (!cartID) {
            console.log('El carrito no existe');
            res.status(404).json({ error: 'El carrito no existe' }).end();
            return;
        }
        const ids = cartID.productos.map(cart => cart.id);
        let maxId = Math.max(...ids);
        if (ids.length === 0) {
            maxId = 0
        }
        const timestamp = Date.now();
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const newProduct = {
            id: maxId + 1,
            timestamp: timestamp,
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo,
            foto: foto,
            precio: precio,
            stock: stock,
        }
        cartID.productos = [...cartID.productos, newProduct];
        const addProductToCart = cartID.productos
        const cartsWithProducts = [...carts, addProductToCart]
        cartsWithProducts.length = carts.length;
        await fs.promises.writeFile(path.join(__dirname, '../persistence/ProductsCart.json'), JSON.stringify(cartsWithProducts));
        res.status(201).json();
    } catch (error) {
        res.status(500).json({ error: error.message }).end();
    }
}

const deleteShoppingCartById = async (req, res) => {
    try {
        const { id } = req.params
        if (isNaN(id)) {
            console.log('Id erroneo');
            res.status(404).json({ error: 'El parametro no es un número' }).end();
            return;
        }
        const carts = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../persistence/ProductsCart.json'), 'utf-8'));
        const cartID = carts.find(cart => cart.id === Number(id));
        if (!cartID) {
            console.log('El carrito no existe');
            res.status(404).json({ error: 'El carrito no existe' }).end();
            return;
        }
        const filteredCarts = carts.filter(cart => cart.id !== Number(id));
        await fs.promises.writeFile(path.join(__dirname, '../persistence/ProductsCart.json'), JSON.stringify(filteredCarts), 'utf-8');
        res.status(204).json('Carrito eliminado con exito');
    } catch (error) {
        res.status(500).json({ error: error.message }).end();
    }
}

const deleteProductFromShoppingCartById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const prodID = Number(req.params.id_prod);
        if (isNaN(id) || isNaN(prodID)) {
            console.log('Id erroneo');
            res.status(404).json({ error: 'El parametro no es un número' }).end();
            return;
        }
        const carts = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../persistence/ProductsCart.json'), 'utf-8'));
        const cartID = carts.find(cart => cart.id === id);
        if (!cartID) {
            console.log('El carrito no existe');
            res.status(404).json({ error: 'El carrito no existe' }).end();
            return;
        }
        const cartIdProduct = cartID.productos.find(product => product.id === prodID)
        if (!cartIdProduct) {
            console.log('El producto no existe en este carrito');
            res.status(404).json({ error: 'El producto no existe en este carrito' }).end();
            return;
        }
        const filteredCart = cartID.productos.filter(product => product.id !== prodID)
        cartID.productos = [...filteredCart]
        const cartIdProducts = cartID.productos
        const newCartsWithRemovedProducts = [...carts, ...cartIdProducts]
        newCartsWithRemovedProducts.length = carts.length;
        console.log(newCartsWithRemovedProducts);
        await fs.promises.writeFile(path.join(__dirname, '../persistence/ProductsCart.json'), JSON.stringify(newCartsWithRemovedProducts), 'utf-8');
        res.status(204).json('Producto eliminado del carrito con exito');
    } catch (error) {
        res.status(500).json({ error: error.message }).end();
    }
}

export const cart = {
    getProductsByShoppingCart,
    createShoppingCart,
    deleteShoppingCartById,
    addProductToShoppingCart,
    deleteProductFromShoppingCartById
}