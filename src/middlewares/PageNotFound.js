const PageNotFound = (req, res) => {
    res.status(404).json({
        error: -2,
        descripcion: `Ruta ${req.url} no implementada`
    });
}

export default PageNotFound;