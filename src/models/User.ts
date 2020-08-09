import * as mongoose from 'mongoose';

import {model} from 'mongoose';


const userSchema = new mongoose.Schema({
    created_at          :  {type: Date, required:true, default: new Date()},
    updated_at          :  {type: Date, required:true, default: new Date()},
    email              :   {type: String, required:true},
    password           :   {type: String, required:true},
    FullName           :  {type: String, required:true}

});


export default model('User',userSchema);