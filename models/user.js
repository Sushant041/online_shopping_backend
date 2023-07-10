const momgoose = require('mpngoose');

const userSchema = new Schema({
    name:{
        type: string,
        required: true
    },
    email:{
        type: string,
        required: true,
        unique: true
    },
    password:{
        type: string,
        required: true
    },
    date:{
        type: date,
        default: Date.now
    },
})

module.exports = mongoose.model('user', userSchema);