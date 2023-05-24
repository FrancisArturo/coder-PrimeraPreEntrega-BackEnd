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
    return res.json(products);
    });

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid  } = req.params;
    const newProduct = await manager.addProductCart(cid, pid);
    return res.json(newProduct);
    });

export default router;
    