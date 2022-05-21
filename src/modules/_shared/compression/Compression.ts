import { deflate, unzip } from 'node:zlib';
import { promisify } from 'node:util';
const unzipPromise = promisify(unzip);
const zipPromise = promisify(deflate);

export async function compress(data: string): Promise<string> {
    const compressedBuffer = await zipPromise(data);
    return compressedBuffer.toString('base64');
}

export async function decompress(data: string): Promise<string> {
    const compressedBuffer = await unzipPromise(Buffer.from(data, 'base64'));
    return compressedBuffer.toString();
}