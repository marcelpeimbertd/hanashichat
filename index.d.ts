declare namespace Base {
    export interface IUser {
        username: any;
        firstName: any;
        lastName: any;
        email: any;
        password: any;
        provider: any;
        conversations: any;
        contacts: any;
    }

    export interface IConversation {
        messagesid: any;
        participants: any;
        convesationType: any;
    }

    export type Versionable<T> = T & { current: any, previous: Array<any> };
}

declare namespace Model {
    export interface IConversation {
        messagesid: any;
        participants: any[];
        type: string;
    }
}

declare type Indexable<T> = T & { _id: any; };
declare type Versionable<T> = { current: T, previous: Array<T> };

declare namespace Store {
    export type IMessages = IMessage[];

    export interface IMessage {
        id: string;
        message: string;
        email: string;
        date: string;
    }

    export interface IMessagesPayload {
        messages: IMessages;
    }

    export interface IMessagesState {
        messages: IMessages;
    }

    export type IUsers = IUser[];

    export interface IUser {
        id: string;
        contacts: string[];
        conversations: string[];
        email: string;
        firstName: string;
        lastName: string;
        username: string;
    }

    export interface IUsersPayload {
        users: IUsers;
    }

    export interface IUserPayload {
        user: IUser;
    }

    export interface IUsersState {
        users: IUsers;
        user: IUser;
    }
}