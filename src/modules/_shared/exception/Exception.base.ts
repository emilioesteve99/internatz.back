export abstract class BaseException extends Error {
    public readonly timestamp: number;
    public readonly custom = true;
    constructor(
        public readonly title: string,
        public readonly detail?: string,
        public readonly detailArgs?: {},
        public readonly status: number = 400,
    ) {
        super(title);
        this.timestamp = Date.now();
        Error.captureStackTrace(this, this.constructor);
    }
}