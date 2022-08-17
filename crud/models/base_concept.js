var mongoose  =  require('mongoose');

var csvSchema = new mongoose.Schema({
    id:{
        type:String
    },
    concept_id:{
        type:String
    },
    concept_name:{
        type:String
    },
    concept_type:{
        type:String
    },
    period_type:{
        type:String
    }
});

module.exports = mongoose.model('base_concept',csvSchema);