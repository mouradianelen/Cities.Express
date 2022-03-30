const express = require('express');
const errorHandler = require('./common/middlewares/error-handler.middleware');
const citiesController = require('./cities/cities.controller');

const app = express();

app.use('/cities', citiesController);

app.get('/',(req,res)=>{
    res.send('Hello world');
});

app.listen(3000,()=>{
    console.log('Server started on port 3000');
});
app.use(errorHandler);