import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();
const manager = new CartManager();

router.post('/', async (req, res) => {
    const newCart = await manager.addCart();
    return res.json(newCart);
    });

router.get('/', async (req, res) => {
    const carts = await manager.getCarts();
    res.json(carts);
    });

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const products = await manager.getProductsCart( cid );
    if (products === "Carrito no encontrado") {
        return res.status(404).json({error: "Carrito no encontrado"});
    }
    return res.json(products);
    });

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid  } = req.params;
    const newProduct = await manager.addProductCart(cid, pid);
    if (newProduct === "Carrito no encontrado") {
        return res.status(404).json({error: "Carrito no encontrado"});
    } else if (newProduct === "Producto no encontrado") {
        return res.status(404).json({error: "Producto no encontrado"});
    }
    return res.json(newProduct);
    });

export default router;
    