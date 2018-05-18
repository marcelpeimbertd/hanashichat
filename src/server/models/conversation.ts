import { Document, model, Model, Schema, SchemaDefinition } from 'mongoose';
const { ObjectId, String, Number } = Schema.Types;
import crypto from 'crypto';

type ConversationType = Base.IConversation & { messagesid: any };
export const conversationSchema: ConversationType = {
    convesationType: String,
    messagesid: {type: Schema.Types.ObjectId, ref: 'Messages'},
    participants: [{type: Schema.Types.ObjectId, ref: 'User'}],
};
const ConversationSchema = new Schema(
    (conversationSchema as ConversationType),
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

interface IConversationSchemaMethods {
}
export type ConversationDocumentType = ConversationType & Document;
type ConversationSchemaType = ConversationDocumentType & IConversationSchemaMethods;
type ConversationModelType = Model<ConversationSchemaType>;

const Conversation: ConversationModelType =
    model<ConversationSchemaType, ConversationModelType>('Conversation', ConversationSchema);
export default Conversation;
