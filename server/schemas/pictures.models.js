const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    photo_url:{ 
        type:String, 
        unique:true, 
        required:true 
    },
    public_id:{ 
        type:String,
        unique:true, 
        required:true 
    }
},
{strictQuery: false}
)

module.exports = mongoose.model('pictures', pictureSchema);