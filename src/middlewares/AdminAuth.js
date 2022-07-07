const AdminAuth = (req, res) => {
    const authorize = false;
    if(!authorize){
        res.status(403).json({ 
            error: -1, 
            descripcion: `La ruta ${req.url} no esta autorizada`
        })
    }
}

export default AdminAuth;