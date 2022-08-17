var mongoose  =  require('mongoose');

var csvSchema = new mongoose.Schema({
    id:{
        type:String
    },
    label_type_id:{
        type:String
    },
    concept_id:{
        type:String
    },
    label_description:{
        type:String
    },
    language:{
        type:String
    }
});

module.exports = mongoose.model('base_label',csvSchema);