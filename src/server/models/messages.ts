import { Document, model, Model, Schema, SchemaDefinition } from 'mongoose';
const { ObjectId, Number, String } = Schema.Types;

type MessagesType = Base.Versionable<{}>;
export const messagesSchema: MessagesType = {
    current: {
        date: Date,
        message: String,
        userid: String,
    },
    previous: [{
        date: Date,
        message: String,
        userid: String,
    }],
};
export const MessagesSchema = new Schema(
    (messagesSchema as MessagesType),
    { _id: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export type MessagesDocumentType = Versionable<Model.IMessages> & Document;
interface IMessagesSchemaMethods { }
type MessagesSchemaType = MessagesDocumentType & IMessagesSchemaMethods;
type MessagesModelType = Model<MessagesSchemaType>;
const Messages: MessagesModelType =
    model<MessagesSchemaType, MessagesModelType>('Confirmation', MessagesSchema);
export default Messages;
