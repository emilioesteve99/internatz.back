import { Enterprise } from '@Shared/entity/Enterprise.entity';
import { User } from '@Shared/entity/User.entity';
import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext } from './RequestContext';

export class ContextState {
    public locale: string;
    public user: User;
    public enterprise: Enterprise;
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
