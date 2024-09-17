const express = require('express');
const { urlencoded, json } = require('express');
<<<<<<< HEAD
const router = require('./routes/signos.routes.js');
=======
const signosRouter = require('./routes/signos.routes.js'); // Rutas de signos
const authRouter = require('./routes/authRoutes.js'); // Rutas de autenticación
>>>>>>> 987317913f382822c878a7b9d108b1e1df86e9ae
const cors = require('cors');

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
<<<<<<< HEAD
app.use(cors());

// Configurar las rutas para signos y autenticación
app.use('/v1/signos', router);


app.listen(4000, () => {
    console.log('Listening at port 4000');
=======

app.use(cors());

// Usar las rutas de signos
app.use('/v1/signos', signosRouter);

// Usar las rutas de autenticación
app.use('/api', authRouter);

app.listen(4000, () => {
    console.log('Backend running on port 4000');
>>>>>>> 987317913f382822c878a7b9d108b1e1df86e9ae
});
