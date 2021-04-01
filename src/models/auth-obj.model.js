const mongoose = require('mongoose');

const AuthObjSchema = mongoose.Schema({
    objName: {
        type: String,
        require: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('AuthObj', AuthObjSchema);