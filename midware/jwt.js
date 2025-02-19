module.exports = funcion(routes = '/api/admin/list') {
    routes = routes.split('/').filter(i => !!i)
    return (req, res, next) => { 
        next()
    }
}