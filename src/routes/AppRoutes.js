import express from 'express';
//import ChartRoutes from './ChartRoute/ChartRoutes.js';
import { product as ProductsRoutes } from '../services/ProductsService.js';
const routes = express.Router();

routes.get('/productos', ProductsRoutes.getProducts)
routes.get('/productos/:id', ProductsRoutes.getProductById)
routes.post('/productos', ProductsRoutes.createProduct)
routes.put('/productos/:id')
routes.delete('/productos/:id', ProductsRoutes.deleteProductById)

routes.get('/carrito')
routes.get('/carrito/:id/productos')
routes.post('/carrito')
routes.post('/carrito/:id/productos')
routes.put('/carrito')
routes.delete('/carrito/:id')
routes.delete('/carrito/:id/productos/:id_prod')

export default routes;