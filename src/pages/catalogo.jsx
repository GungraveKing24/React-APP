// catalogo.jsx
import React, { useEffect, useState } from 'react';

function Catalogo() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
    // Aquí debes hacer la llamada al API para obtener los productos
    // Reemplazar con tu endpoint real
        fetch('http://localhost:8000/arrangements') 
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const addToCart = (product) => {
        // Lógica para agregar al carrito (ver en el backend como hacerlo)
        console.log('Producto añadido al carrito:', product);
    };

    return (
        <div>
            <h1>Catálogo de Productos</h1>
            <div className="catalogo grid">
                {products.map((product) => (
                <div className="product-card flex p-10 m-10" key={product.id}>
                    <img src={product.arr_img_url} alt={product.arr_name} className="w-40 h-40" />
                    <h2>{product.arr_name}</h2>
                    <p>{product.arr_description}</p>
                    <p>${product.arr_price}</p>
                    <p className="discount">{product.arr_discount ? `Descuento: ${product.arr_discount}%` : ''}</p>
                    <button onClick={() => addToCart(product)}>Agregar al carrito</button>
                </div>
                ))}
            </div>
        </div>
    );
}

export default Catalogo;
