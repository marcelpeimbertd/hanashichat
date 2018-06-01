import crypto from 'crypto';
import { Document, model, Model, Schema, SchemaDefinition } from 'mongoose';
import { MessagesSchema } from './messages';

type ConversationType = Base.IConversation & { messages: any };
export const conversationSchema: ConversationType = {
    isGroup: Boolean,
    isPublic: Boolean,
    messages: MessagesSchema,
    name: String,
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', require: true }],
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
