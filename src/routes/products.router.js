import { Router, json } from "express";
import ProductManager from "../Manager.js";

const router = Router();
const manager = new ProductManager();

router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    const {limit} = req.query;
    if (limit) {
        res.json(products.slice(0, limit));
    } else {
    res.json(products);
    }
    });

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await manager.getProductById(id);
    if (product === "Not found") {
        res.status(404).json({error: "Producto no encontrado"});
    } else {
        res.json(product);
    }
    });

router.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category,  thumbnail} = req.body;
    const newProduct = await manager.addProduct(title, description, code, price, status, stock, category,  thumbnail);
    res.json(newProduct);
    });

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    // const { title, description, code, price, status, stock, category,  thumbnail} = req.body;
    // const updatedProduct = await manager.updateProductById(id, title, description, code, price, status, stock, category,  thumbnail);
    const updateobj = req.body;
    const updatedProduct = await manager.updateProductById(id, updateobj);
    if (updatedProduct === "Not found") {
        res.status(404).json({error: "Producto no encontrado"});
    } else {
        res.json(updatedProduct);
    }
    });

export default router;