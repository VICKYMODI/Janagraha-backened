import {Router} from 'express';
import { userController } from '../Controller/userController';
import { userValidator } from '../validators/UserValidators';
import { GlobalMiddleWare } from '../middleware/Globalmiddleware';

class userRouter {

    public router: Router;

    constructor(){
        
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
    }

    getRoutes(){

        
        this.router.get('/login',userValidator.login(),GlobalMiddleWare.checkError,userController.login);
        this.router.get('/get',userValidator.getByid(),GlobalMiddleWare.checkError,userController.getByid);

    }

    postRoutes(){

        this.router.post('/signup',userValidator.signup(), GlobalMiddleWare.checkError,userController.signup); 

    }

    patchRoutes(){

        this.router.patch('/edit/:id',userValidator.editUser(), GlobalMiddleWare.checkError ,userController.editUser)


    }


}

export default new userRouter().router;