export const getEnv = <T = any>(key: string): T => {
    const value = global.env[key];
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
};
