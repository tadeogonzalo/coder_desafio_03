import express from "express";
import ProductManager from './ProductManager.js';

const productManager = new ProductManager('./files/productos.json');

const PORT = 8081;

const app = express();

app.use( express.urlencoded( { extended:true } ) );

app.get( '/products', async ( req, res ) => {

    let limit = req.query.limit;

    let productos = await productManager.getProducts();

    if( !limit ) return res.send(productos);

    const productosFiltrados = productos.slice( 0, limit );

    res.send( productosFiltrados );
    
});

app.get( '/products/:idProduct', async ( req, res ) => {

    const idProduct = req.params.idProduct;

    let produto = await productManager.getProductById( idProduct );

    res.send(produto);
});

app.listen( PORT, () => {
    console.log(`Server Corriendo en puerto: ${PORT}`);
});
