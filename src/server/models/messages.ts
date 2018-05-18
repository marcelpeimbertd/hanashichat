import { Document, model, Model, Schema, SchemaDefinition } from 'mongoose';
const { ObjectId, Number, String } = Schema.Types;

type MessagesType = Base.Versionable<{}>;
const messagesSchema: MessagesType = {
    current: new Schema({
        feedback: String,
        status: Number,
    }),
    previous: [{
        feedback: String,
        status: Number,
    }],
};
const MessagesSchema = new Schema(
    (messagesSchema as MessagesType),
    {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export type MessagesDocumentType = Versionable<Model.IMessages> & Document;
interface IMessagesSchemaMethods { }
type MessagesSchemaType = MessagesDocumentType & IMessagesSchemaMethods;
type MessagesModelType = Model<MessagesSchemaType>;
const Messages: MessagesModelType =
    model<MessagesSchemaType, MessagesModelType>('Confirmation', MessagesSchema);
export default Messages;
