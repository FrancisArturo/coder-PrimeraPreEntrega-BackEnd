import express, { urlencoded } from 'express';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();


app.use(urlencoded({extended: true}));
app.use(express.json());
app.use('/api/products' , productRouter);
app.use('/api/carts' , cartRouter);

app.get('/', (req, res) => { res.send('Bienvenido/a a la API de productos') });

app.listen(8080, () => {
    console.log('API Started!');
    });
