import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/Ventas.css';

const Ventas = () => {
  const location = useLocation();
  const { workerName } = location.state || {}; 
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'yogurt 1lt', precio: 5, cantidad: 1 },
    { id: 2, nombre: 'cerveza', precio: 34, cantidad: 1 }
  ]);

  // Funciones para manejar cantidades y cálculos de subtotal e IGV
  const incrementarCantidad = (id) => {
    setProductos(productos.map(producto => producto.id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto));
  };

  const disminuirCantidad = (id) => {
    setProductos(productos.map(producto => producto.id === id && producto.cantidad > 1 ? { ...producto, cantidad: producto.cantidad - 1 } : producto));
  };

  const subtotal = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  return (
    <div className="ventas">
      <aside className="sidebar">
        {/* Menú lateral */}
      </aside>
      <main className="main-content">
        <header>
          <div className="user-info">
            <img src="usuario.png" alt="Usuario" />
            <span>{workerName} (cajero)</span> {/* Muestra el nombre del trabajador */}
          </div>
          <div className="branch">
            <span>SUCURSAL: Genérica</span>
          </div>
        </header>

        {/* Recuadro semitransparente */}
        <div className="ventas-overlay">
          <h3>Entrada de Ventas</h3>
          <input type="text" placeholder="Buscar producto..." />
          <button>Agregar</button>
        </div>

        {/* Lista de productos y opciones de pago */}
        <section className="product-list">
          {productos.map(producto => (
            <div key={producto.id} className="producto">
              <div>
                <span>{producto.nombre}</span>
                <span>precio unit: ${producto.precio.toFixed(2)}</span>
              </div>
              <div className="cantidad-control">
                <button onClick={() => incrementarCantidad(producto.id)}>+</button>
                <span>{producto.cantidad}</span>
                <button onClick={() => disminuirCantidad(producto.id)}>-</button>
              </div>
            </div>
          ))}
        </section>

        <section className="summary">
          <p>Sub total: ${subtotal.toFixed(2)}</p>
          <p>IGV (18%): ${igv.toFixed(2)}</p>
          <p>Total: ${total.toFixed(2)}</p>
          <button className="finalizar-compra">Finalizar Compra</button>
        </section>
      </main>
    </div>
  );
};

export default Ventas;
