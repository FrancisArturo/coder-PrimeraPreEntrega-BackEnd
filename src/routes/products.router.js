import { Router } from "express";
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
    if (newProduct === "El código ya existe") {
        res.status(400).json({error: "El código ya existe"});
    } else if (newProduct === "Faltan datos") {
        res.status(400).json({error: "Faltan datos"});
    } else {
        res.json(newProduct);
    }
    });

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateobj = req.body;
    const updatedProduct = await manager.updateProductById(id, updateobj);
    if (updatedProduct === "Not found") {
        res.status(404).json({error: "Producto no encontrado"});
    } else {
        res.json(updatedProduct);
    }
    });

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await manager.deleteProductById(id);
    if (deletedProduct === "Not found") {
        res.status(404).json({error: "Producto no encontrado"});
    } else {
        res.json(deletedProduct);
    }
    });

export default router;