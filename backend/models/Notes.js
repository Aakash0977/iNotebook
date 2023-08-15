const mongoose = require ('mongoose');

const NotesSchema = new Schema({
    title:{
        type: string,
        required: true
    },
    decription:{
        type: string,
        required: true,
    },
    tag:{
        type: string,
        default: 'general'
    },
    date:{
        type: date,
        default: date.now
    },
})

module.exports = mongoose.model('notes', NotesSchema);