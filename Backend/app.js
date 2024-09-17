const express = require('express');
const dbConnect = require('./config');
const setRoutes = require('./routes');
const swagger = require('./swagger')

const app = express();
const port = 3000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));

setRoutes(app);
swagger(app)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

dbConnect().catch(error => {
    console.error('Error connecting to database:', error);
});