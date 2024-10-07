const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3500;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para ordenar los números
app.post('/v1/ordenarNumeros', (req, res) => {
    const { numeros } = req.body;

    if (!numeros || !Array.isArray(numeros)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const mayorMenor = [...numeros].sort((a, b) => b - a);
    const menorMayor = [...numeros].sort((a, b) => a - b);

    res.json({
        mayorMenor,
        menorMayor
    });
});

// Ruta para operar los números (suma, resta, multiplicación, división)
app.post('/v1/operarNumeros', (req, res) => {
    const { numeros, operacion } = req.body;

    if (!numeros || !Array.isArray(numeros) || numeros.length === 0) {
        return res.status(400).json({ error: 'No numbers provided' });
    }

    if (!operacion) {
        return res.status(400).json({ error: 'No operation provided' });
    }

    let resultado;

    switch (operacion) {
        case 'sumar':
            resultado = numeros.reduce((acc, curr) => acc + curr, 0);
            break;
        case 'restar':
            resultado = numeros.reduce((acc, curr) => acc - curr);
            break;
        case 'multiplicar':
            resultado = numeros.reduce((acc, curr) => acc * curr, 1);
            break;
        case 'dividir':
            resultado = numeros.reduce((acc, curr) => {
                if (curr === 0) {
                    return res.status(400).json({ error: 'No se puede dividir entre 0' });
                }
                return acc / curr;
            });
            break;
        default:
            return res.status(400).json({ error: 'Operación no válida' });
    }

    res.json({ resultado });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
