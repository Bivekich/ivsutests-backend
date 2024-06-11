import {Schema, model, Document} from 'mongoose'

interface IBanner extends Document {
    titles: string[];
    features: string[];
}

const bannerSchema = new Schema<IBanner>({
    titles: {
        type: [String],
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },
})

export default model<IBanner>('Banner', bannerSchema)