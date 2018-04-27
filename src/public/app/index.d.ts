type IMessages = IMessage[];

interface IMessage {
    id: string;
    message: string;
    email: string;
    date: string;
}

interface IChatProps {
    messages?: IMessage[];
}