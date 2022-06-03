import { AsyncLocalStorage } from 'async_hooks';
import { ContextState } from './ContextState';

export class RequestContext {
    public static als = new AsyncLocalStorage<RequestContext>();

    public static start = () => {
        RequestContext.als.enterWith(new ContextState());
    };

    static get(): ContextState {
        return RequestContext.als.getStore() as ContextState;
    }

    public static updateContext(ctx: Partial<ContextState>) {
        Object.assign(this.get(), ctx);
    }
}
