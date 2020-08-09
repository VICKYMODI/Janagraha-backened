import {body,query} from 'express-validator';
import User from '../models/User';


export class userValidator{

    static login() {
        return [query('email', 'email is Required').isString()
            .custom((email, {req}) => {
                return User.findOne({'email': email}).then(User => {
                    if (User) {
                        req.user = User;
                        return true;
                    } else {
                        throw  new Error('User Does Not Exist');
                    }
                });
            }), query('password', 'Password is Required').isAlphanumeric(),
        ];
    }

   

    static signup(){

        return [
        body('email', 'email is Required').isString().custom((email,{req})=>{
            return User.findOne({'email':email}).then(User => {
                if(User){
                    throw new Error("User with this Username already exist");
                }else{
                    return
                }
            })
        }),
        body('password', 'password is Required').isAlphanumeric().isLength({min: 5, max: 20}).withMessage('Password can be from 8-20 Characters only'),
        ];
    }

    static getByid(){
        return [query('id','id is required').isString().custom((id, {req})=>{
            return User.findOne({"_id":id}).then(agent => {
                if(agent){
                    req.agent = agent;
                    return true;
                } else{
                    throw new Error("User Doesnt exist")
                }
            })
         })
        ]
    }

   

    static editUser(){
        return[body('email', 'email is Required').isString().custom((email,{req})=>{
            return User.findOne({'email':email}).then(user => {
                if(user){
                    throw new Error("user with this Username already exist");
                }else{
                    return
                }
            })
        }),
            ];
    }

   

}