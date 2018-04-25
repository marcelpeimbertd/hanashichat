import React from 'react';

interface IChatProps {
    prop: string;
}
class Chat extends React.Component<IChatProps> {
    public render() {
        return <div className="chatbox">
            <p className="message"> message 1 </p>
            <p className="message"> message 2 </p>
            <input type="text" name="" id="" />
        </div>;
    }
}

export default Chat;
