const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./routes/sorteo.routes.js');
const cors = require('cors');

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/api', router);

app.listen(4000, ()=>{
    console.log('listening at port 4000');
})