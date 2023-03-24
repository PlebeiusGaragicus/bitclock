import path from 'path';
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/index.html'));
});

app.get('/block-height', async (req, res) => {
    try {
        const blockHeight = await getBlockCount();
        res.json({ blockHeight });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching block height');
    }
});

async function getBlockCount() {
    const body = JSON.stringify({
        jsonrpc: '1.0',
        id: 'getblockcount',
        method: 'getblockcount',
        params: [],
    });

    const { RPC_SERVER_URL, RPC_USERNAME, RPC_PASSWORD } = process.env;

    // 'Authorization': 'Basic ' + btoa(`${RPC_USERNAME}:${RPC_PASSWORD}`),
    const response = await fetch(RPC_SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;',
            'Authorization': 'Basic ' + Buffer.from(`${RPC_USERNAME}:${RPC_PASSWORD}`).toString('base64'),
        },
        body: body,
    });

    if (response.ok) {
        const data = await response.json();
        return data.result;
    } else {
        throw new Error(`RPC call failed: ${response.statusText}`);
    }
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
