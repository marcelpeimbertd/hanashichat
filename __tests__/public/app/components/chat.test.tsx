import React from 'react';
import TestRenderer from 'react-test-renderer';
import Chat from '../../../../src/public/app/components/chat';

const messages = [
    {
        date: '2018-04-24T17:49:14.193Z',
        email: 'leaf@hanashichat.com',
        id: '1',
        message: 'Hi',
    },
    {
        date: '2018-04-24T17:50:14.193Z',
        email: 'leaf2@hanashichat.com',
        id: '2',
        message: 'Hi',
    },
];

describe('Chat behavior', () => {
    it('testing new messages', () => {
        const chatInstance = TestRenderer.create(<Chat messages={messages} />).root;
        const numberMessages = chatInstance.findAllByProps({ className: 'message' }).length;
        expect(numberMessages).toEqual(messages.length);
    });
});
