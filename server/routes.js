import express from 'express';
import path from 'path';

import logger from './logger.js';
import { getBlockCount } from './getdata.js';

const router = express.Router();


router.get('/', (req, res) => {
    // TODO: not a fan of the '../public' here, but it works for now...
    res.sendFile(path.join(process.cwd(), '../public/index.html'));
});


router.get('/block-height', async (req, res) => {
    try {
        const blockHeight = await getBlockCount();
        res.json({ blockHeight });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching block height');
    }
});


export default router;