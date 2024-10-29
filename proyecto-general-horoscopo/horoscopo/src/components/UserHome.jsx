import './styles/UserHome.css';
import { useEffect, useState } from 'react';

function UserHome() {
    const [codes, setCodes] = useState([]);
    const [codeInput, setCodeInput] = useState('');

    const fetchCodes = async () => {
        try {
            const response = await fetch('http://localhost:4000/v1/signos/codes'); // Endpoint para obtener los códigos registrados
            const data = await response.json();
            if (response.ok) {
                setCodes(data);
            } else {
                console.error('Error al obtener los códigos:', data.message);
            }
        } catch (error) {
            console.error('Error al conectarse al servidor:', error);
        }
    };

    useEffect(() => {
        fetchCodes();
    }, []);

    const registerCode = async (event) => {
        event.preventDefault();
        // Lógica para registrar el código, puedes ajustar según tu implementación
        try {
            const response = await fetch('http://localhost:4000/v1/signos/registerCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: codeInput }),
            });
            if (response.ok) {
                setCodeInput(''); // Limpiar el input después de registrar
                fetchCodes(); // Volver a obtener los códigos para mostrar el nuevo
            } else {
                const data = await response.json();
                console.error('Error al registrar el código:', data.message);
            }
        } catch (error) {
            console.error('Error al conectarse al servidor:', error);
        }
    };

    return (
        <div className="container">
            <h1>Registrar Código</h1>
            <form onSubmit={registerCode}>
                <input
                    type="text"
                    placeholder="Código de 4 dígitos"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                />
                <button type="submit">Registrar</button>
            </form>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Fecha de Registro</th>
                        <th>Código Usado</th>
                        <th>Monto del Premio</th>
                    </tr>
                </thead>
                <tbody>
                    {codes.map((code, index) => (
                        <tr key={index}>
                            <td>{code.fechaRegistro}</td>
                            <td>{code.codigo}</td>
                            <td>{code.premio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserHome;
