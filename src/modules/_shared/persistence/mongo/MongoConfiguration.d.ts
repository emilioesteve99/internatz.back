export type MongoConfigurationType = {
    name?: string;
    url: string;
    pool: {
        max: number;
        min: number;
    };
};
