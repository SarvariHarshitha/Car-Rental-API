import express from 'express';
import morgan from 'morgan';
import path from 'path';
import router from './router.js';
import router1 from './router1.js';
import { protect } from './modules/auth.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('src/index.html'));
});

app.use('/api', router);
app.use('/api/car', protect, router1);

export default app;
