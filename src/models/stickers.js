import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const stickers = new Schema({
    stickerId: String,
    filePath: String,
    // searchWords: [{type: Schema.Types.ObjectId, ref: 'Searchword'}]
});

stickers.virtual('searchWords', {
    ref: 'Searchword',
    localField: 'stickerId',
    foreignField: 'parentStickerId',
    justOne: false,
});

stickers.set('toJSON', { getters: true, virtuals: true });

mongoose.model('Stickers', stickers);