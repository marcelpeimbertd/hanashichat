declare namespace Base {
    export interface IUser {
        username: any;
        firstName: any;
        lastName: any;
        email: any;
        password: any;
        provider: any;
    }

    export interface IConversation {
        messages: any;
        participants: any[];
        type: string;
    }

    export type Versionable<T> = T & { current: any, previous: Array<any> };
}

declare namespace Model {
    export interface IConversation {
        messages: any;
        participants: any[];
        type: string;
    }
}

declare type Indexable<T> = T & { _id: any; };
declare type Versionable<T> = { current: T, previous: Array<T> };
