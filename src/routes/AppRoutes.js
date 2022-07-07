import express from 'express';
import { product as ProductsRoutes } from '../services/ProductsService.js';
import {cart as CartRoutes } from '../services/ShoppingCartService.js';
const routes = express.Router();

routes.get('/productos', ProductsRoutes.getProducts)
routes.get('/productos/:id', ProductsRoutes.getProductById)
routes.post('/productos', ProductsRoutes.createProduct)
routes.put('/productos/:id', ProductsRoutes.updateProduct)
routes.delete('/productos/:id', ProductsRoutes.deleteProductById)

routes.post('/carrito', CartRoutes.createShoppingCart)
routes.post('/carrito/:id/productos', CartRoutes.addProductToShoppingCart)
routes.get('/carrito/:id/productos', CartRoutes.getProductsByShoppingCart)
routes.delete('/carrito/:id', CartRoutes.deleteShoppingCartById)
routes.delete('/carrito/:id/productos/:id_prod', CartRoutes.deleteProductFromShoppingCartById)

export default routes;