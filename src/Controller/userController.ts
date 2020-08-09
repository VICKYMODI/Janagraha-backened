import User from '../models/User';
import { validationResult } from 'express-validator';
import { Utils } from '../utils/Utils';
import * as Bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';




export class userController {


    static async login(req, res, next) {

        //const username = req.query.username;
        const user = req.user;
        const password = req.query.password;
        User.findOne({email : user.email}).then((user:any)=>{
                if(user){
                    
                    res.send(req.user)

                } else {

                    next (new Error('Username and Password doesnt match'));

                } 
            })
        
        

        
        

        



    }

    static async signup(req, res, next) {

        //console.log(Utils.generateVarificationToken());


        


        try {

            

            const newuserData = {
                
                FullName : req.body.FullName,
                email : req.body.email,
                password : req.body.password,
            };

            const error = validationResult(req);

            if (!error.isEmpty()) {
                console.log(error.array(), 'called error');
                const newError = new Error(error.array()[0].msg);
                next(newError);
                return;
            }

            console.log("userData", newuserData)

            let user = await new User(newuserData).save();

            res.send({status_code:200,
                data:user});
            //send varification email
            

        } catch (e) {
            next(e);
        }



    }

    static async editUser(req, res, next) {
        const ID = req.params.id;

        console.log("test", ID)

        try {
            const updateuser = await User.findOneAndUpdate({ "_id": ID }, {

                //start modification

                ID: req.body.ID,
                FullName : req.body.Status,
                email: req.body.Username,
                Password: req.body.Password,
                

                //end modification

            }, { new: true });

            if (updateuser) {
                res.send({
                    status_code: 200,
                    data: updateuser
                })
                //res.send(updateuser)
            } else {
                throw new Error("user doesnt exist")
            }
        } catch (err) {
            next(err)
        }
    }

    static getByid(req,res,next){
        const ID = req.query.ID;
        res.send(req.agent);
    }

    

}