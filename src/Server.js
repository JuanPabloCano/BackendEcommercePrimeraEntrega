import Config from './config/Config.js';
import express from 'express';
import morgan from 'morgan';
import AppRoutes from './routes/AppRoutes.js';
import PageNotFound from './middlewares/PageNotFound.js'
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', AppRoutes);

app.use(PageNotFound)

app.listen(Config.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${Config.PORT}`);

});