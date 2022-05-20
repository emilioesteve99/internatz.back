import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext } from './RequestContext';

export class ContextState {
    public locale: string;
    public companyId: string;
    public user: any;
    public sessionToken: string;
    public requestId: string;
    public debug: boolean;

    public static als = new AsyncLocalStorage<ContextState>();

    public static start = () => {
        RequestContext.als.enterWith(new ContextState());
    };

    public static get(): ContextState {
        return RequestContext.als.getStore() as ContextState;
    }
}
