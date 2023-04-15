// const SERVER_URL = 'http://127.0.0.1:3000';
// const SERVER_URL = `http://${P_ADDRESS_OR_HOSTNAME}:3000`;
const SERVER_URL = `${location.protocol}//${location.hostname}:${location.port}`;

async function getBlockCount() {
    const response = await fetch(`${SERVER_URL}/block-height`);

    if (response.ok) {
        const data = await response.json();
        return data.blockHeight;
    } else {
        throw new Error(`Failed to fetch block height: ${response.statusText}`);
    }
}

async function updateBlockHeight() {
    console.log('Updating block height...')
    try {
        const blockHeight = await getBlockCount();
        document.getElementById('blockHeight').textContent = blockHeight;
    } catch (error) {
        console.error(error);
        document.getElementById('blockHeight').textContent = 'Error fetching block height';
    }
}

// Update block height on page load and every 10 seconds
updateBlockHeight();
setInterval(updateBlockHeight, 10000);
