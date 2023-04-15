import fetch from 'node-fetch';

import logger from './logger.js';
import { getTipHeight } from './mempool.js';

export async function getBlockCount() {
    const body = JSON.stringify({
        jsonrpc: '1.0',
        id: 'getblockcount',
        method: 'getblockcount',
        params: [],
    });

    const { RPC_SERVER_URL, RPC_USERNAME, RPC_PASSWORD } = process.env;

    if (!RPC_SERVER_URL || !RPC_USERNAME || !RPC_PASSWORD) {
        // throw new Error('Missing RPC credentials');
        logger.warn("Missing RPC credentials, using mempool.space as fallback");

        return getTipHeight();
    }

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