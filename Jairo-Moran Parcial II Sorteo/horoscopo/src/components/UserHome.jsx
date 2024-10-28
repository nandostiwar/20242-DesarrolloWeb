import { useEffect, useState } from "react";
import './styles/UserHome.css';

function UserHome() {
    const [codigo, setCodigo] = useState('');
    const [registros, setRegistros] = useState([]);
    const [mensaje, setMensaje] = useState('');
  
    useEffect(() => {
        // Obtener los registros del backend al cargar el componente
        fetch('http://localhost:4000/api/codigos')
            .then(response => response.json())
            .then(data => setRegistros(data))
            .catch(error => console.error('Error al obtener los registros:', error));
    }, []);
  
    const handleRegistrarCodigo = () => {
        if (!/^\d{3}$/.test(codigo)) {
            setMensaje('El código debe ser un número de 3 dígitos entre 000 y 999.');
            return;
        }
  
        fetch('http://localhost:4000/api/codigos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ codigo }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setRegistros(prev => [...prev, data.nuevoRegistro]);
                setMensaje('Código registrado exitosamente');
                setCodigo('');
            } else {
                setMensaje(data.message || 'Error al registrar el código');
            }
        })
        .catch(error => {
            console.error('Error al registrar el código:', error);
            setMensaje('Error al registrar el código');
        });
    };
  
    return (
        <div className="user-container">
            <h2>Registro de Códigos</h2>
            <input
                type="text"
                placeholder="Ingresa un código (000 - 999)"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
            />
            <button onClick={handleRegistrarCodigo}>Validar Código</button>
            {mensaje && <p>{mensaje}</p>}
            
            <h3>Códigos Registrados</h3>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Premio Obtenido</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro, index) => (
                        <tr key={index}>
                            <td>{registro.codigo}</td>
                            <td>{registro.fecha}</td>
                            <td>{registro.hora}</td>
                            <td>{registro.premio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => (window.location.href = '/')}>Volver al Inicio</button>
        </div>
    );
}

export default UserHome;
