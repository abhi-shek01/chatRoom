import mongoose from 'mongoose'


// const whatsappSchema = mongoose.Schema({
//     message: String,
//     name: String,
//     timestamp: String,
//     received: Boolean
// });

const whatsappSchema = mongoose.Schema({
    roomName: String,
    messages: [{
        message: String,
        name: String,
        timestamp: String,
        received: Boolean
    }],

});


export default mongoose.model("rooms", whatsappSchema)
// export default mongoose.model("messagecontents", whatsappSchema)


