import { HttpResponse } from "@Shared/response/HttpResponse";

export abstract class BaseHttpController {
    protected success(
        data: any,
        params: {
            messages?: string[];
        } = {}
    ): HttpResponse {
        return {
            data,
            messages: params.messages,
        };
    }
}