'use strict';

const getData = async(url) => {
    const req = await fetch(url);

    if (!req.ok) {
        throw new Error(`Could not fetch ${url}`);
    }
    return await req.json();
}

export default getData;