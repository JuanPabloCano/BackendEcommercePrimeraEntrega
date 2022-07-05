import Config from './config/Config.js';
import express from 'express';
import morgan from 'morgan';
import AppRoutes from './routes/AppRoutes.js';
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', AppRoutes);


app.listen(Config.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${Config.PORT}`);

});