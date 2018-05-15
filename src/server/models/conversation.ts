import { Document, model, Model, Schema, SchemaDefinition } from 'mongoose';
const { ObjectId, Number, String } = Schema.Types;

type ConversationType = Base.Versionable<{}>;
export const conversationSchema: ConversationType = {
    current: new Schema({
        feedback: String,
        status: Number,
    }),
    previous: [{
        feedback: String,
        status: Number,
    }],
};
const ConversationSchema = new Schema(
    (conversationSchema as ConversationType),
    { _id: false, timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export type ConversationDocumentType = Versionable<Model.IConversation> & Document;
interface IConversationSchemaMethods { }
type ConversationSchemaType = ConversationDocumentType & IConversationSchemaMethods;
type ConversationModelType = Model<ConversationSchemaType>;
const Conversation: ConversationModelType =
    model<ConversationSchemaType, ConversationModelType>('Confirmation', ConversationSchema);
export default Conversation;