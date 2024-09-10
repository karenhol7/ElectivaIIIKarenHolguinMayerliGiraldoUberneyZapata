const taskRouter = require('./src/products/routes/product.routing');
const userRouter = require('./src/user/routes/user.routing');
const commentRouter = require('./src/comments/routes/comment.routing');
const followRouter = require('./src/follows/routes/follow.routing')

function setRoutes(app) {
    app.use((req, res, next) => {
        console.log(`request Method: ${req.method}`);
        console.log(`request URL: ${req.originalUrl}`);
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Permitir solicitudes desde el origen del frontend
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
        
        // Manejar solicitudes OPTIONS de preflight
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    });
    
    app.use('/api/product', taskRouter);
    app.use('/api/user', userRouter);
    app.use('/api/comment', commentRouter);
    app.use('/api/follow', followRouter);
}

module.exports = setRoutes;