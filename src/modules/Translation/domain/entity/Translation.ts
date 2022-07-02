export class Translation {
    public _id: string;
    public enterpriseId: string;
    public key: string;
    public scope: string;
    public value: TranslationValueByKey;
    public dateAdd: Date;
}

export class TranslationValueByKey {
    'es-ES': string;
    [key: string]: string;
}
