import {Schema, model, Document} from 'mongoose'

interface Answer {
    text: string;
}

interface Question {
    text: string;
    answers: Answer[];
    correctAnswer: number;
}

export interface TestDocument extends Document {
    title: string;
    questions: Question[];
    creatorId: Schema.Types.ObjectId
}

const answerSchema = new Schema<Answer>({
    text: {type: String, required: true}
})

const questionSchema = new Schema<Question>({
    text: {type: String, required: true},
    answers: {type: [answerSchema], required: true},
    correctAnswer: {type: Number, required: true}
})

const testSchema = new Schema<TestDocument>({
    title: {type: String, required: true},
    questions: {type: [questionSchema], required: true},
    creatorId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

const Test = model<TestDocument>('Test', testSchema)

export default Test