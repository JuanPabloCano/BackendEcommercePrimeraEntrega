import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getProducts = async (req, res) => {
    try {
        const products = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../persistence/Products.json'), 'utf-8'));
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send({ error: error.message }).end();
    }
}

const createProduct = async (req, res) => {
    try {
        const products = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../persistence/Products.json'), 'utf-8'));
        const ids = products.map(product => product.id);
        let maxId = Math.max(...ids);
        if(ids.length === 0){
            maxId = 0
        }
        const timestamp = Date.now();
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const newProduct = [{
            id: maxId + 1,
            timestamp: timestamp,
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo,
            foto: foto,
            precio: precio,
            stock: stock,
        }]
        const newProducts = [...products, ...newProduct];
        await fs.promises.writeFile(path.join(__dirname, '../persistence/Products.json'), JSON.stringify(newProducts));
        console.log('Producto agregado');
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send({ error: error.message }).end();
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = (req.params)
        if (isNaN(id)) {
            console.log('Id erroneo');
            res.status(404).json({ error: 'El parametro no es un número' }).end();
            return;
        }
        const products = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../persistence/Products.json'), 'utf-8'));
        const productID = products.find(productID => productID.id === Number(id));

        if (!productID) {
            console.log('El producto no existe');
            res.status(404).json({ error: 'El producto no existe' }).end();
            return;
        }
        await res.status(200).json(productID);
        console.log('Producto encontrado');
    } catch (error) {
        res.status(500).send({ error: error.message }).end();
    }
}

const deleteProductById = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const products = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../persistence/Products.json'), 'utf-8'));
        const product = products.filter(product => product.id !== id);
        await fs.promises.writeFile(path.join(__dirname, '../persistence/Products.json'), JSON.stringify(product), 'utf-8');
        res.status(204).send('Producto eliminado con éxito')
    } catch (error) {
        res.status(500).send({ error: error.message }).end();
    }
}

export const product = {
    getProducts,
    getProductById,
    deleteProductById,
    createProduct
}