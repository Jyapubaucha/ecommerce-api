const mongoose = require('mongoose');
const validateMongoDbId = (id)=>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid){
        throw new Error('Invalid ID or not found!');
    }
};
module.exports = validateMongoDbId;