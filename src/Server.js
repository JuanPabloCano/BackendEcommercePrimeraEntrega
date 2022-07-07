import Config from './config/Config.js';
import express from 'express';
import morgan from 'morgan';
import AppRoutes from './routes/AppRoutes.js';
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', AppRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: -2,
        descripcion: `Ruta ${req.url} no implementada`
    });
})

app.listen(Config.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${Config.PORT}`);

});