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
        messages: any;
        name: any;
        participants: any;
        isPublic: any;
        isGroup: any;
    }

    export type Versionable<T> = T & { current: any, previous: Array<any> };
}

declare namespace Model {

    export interface IMessages {
        message: string;
        userid: string;
        date: Date;
    }
}

declare type Indexable<T> = T & { _id: any; };
declare type Versionable<T> = { current: T, previous: Array<T> };

declare namespace Store {
    export type IMessages = IMessage[];

    export interface IMessage {
        date: Date,
        message: String,
        userid: String,
    }

    export interface IConversationPayload {
        conversation: IConversation;
    }

    export type IConversations = IConversation[];

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
        all: IUsers;
        user: IUser;
    }

    export type MessagesType = Versionable<IMessage>;

    export interface IConversation {
        id: string;
        messages: MessagesType;
        name: string;
        participants: IParticipant[];
    }
    
    export interface IParticipant{
        id: string;
        username: string;
    }

    export interface IRootState {
        users: IUsersState | undefined;
        conversation: { current: IConversation, update: IConversation } | undefined;
    }
}