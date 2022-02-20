const mongoose = require('mongoose')

const withdrawSchema = new mongoose.Schema({

    userId : {
        type: String
    },
    name: {
        type: String
    },
    wallet:{
        type: String
    },
    withdrawl_balance: {
        type: String
    },
    withdrawl_date: {
        type: Date,
        default: Date
    }

})

module.exports =  mongoose.model('withdrawl', withdrawSchema)