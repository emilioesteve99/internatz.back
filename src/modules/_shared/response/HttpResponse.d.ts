export type HttpResponse<T = any> = {
    /**
     * Response data
     */
    data?: T;
    /**
     * List of messages, related to results
     */
    messages?: string | string[];
    /**
     * List of errors
     */
    errors?: HttpResponseError[];
    /**
     * Extra data we may need
     */
    meta?: { [key: string]: any };
};

export type HttpResponseError = {
    /**
     * A unique identifier for this particular occurrence of the problem.
     */
    id: string;
    /**
     * The HTTP status code applicable to this problem, expressed as a number value.
     */
    status: number;
    /**
     * An application-specific error code, expressed as a string value (exception type).
     */
    code: string;
    /**
     * A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
     */
    title: string;
    /**
     * A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
     */
    detail?: string;
    /**
     * Error stack trace as array of strings.
     */
    trace?: string[];
};
