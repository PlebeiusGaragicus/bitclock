import fetch from 'node-fetch';


export async function getTipHeight() {
    const URL = 'https://mempool.space/api/blocks/tip/height';

    const response = await fetch(URL);

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error(`RPC call failed: ${response.statusText}`);
    }

    // return fetch(URL)
    //     .then(res => res.json())
    //     .then(json => {
    //         console.log(json)
    //         return json;
    //     })
    //     .catch(err => {
    //         console.error('error:' + err)
    //         return null;
    //     });
}
