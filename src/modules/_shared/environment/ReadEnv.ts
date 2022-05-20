import { readFileSync } from 'node:fs';

global.env = JSON.parse(readFileSync(`appsettings.${process.env.MODE}.json`, 'utf-8'));
