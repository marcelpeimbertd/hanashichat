import React from 'react';
import { Link } from 'react-router-dom';

interface IDashBoardProps {
    prop: string;
}
class DashBoard extends React.Component<IDashBoardProps> {
    public render() {
        return <div>
            <Link to="/login">Log out</Link>
            <input type="search" name="" id="" placeholder="Search" />
            <h1>Contacts</h1>
            <h1>Chats</h1>
        </div>;
    }
}

export default DashBoard;
