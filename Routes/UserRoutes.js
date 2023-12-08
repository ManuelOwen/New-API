import {loginEMp,registerEmp} from '../Controllers/empController.js'

const user= (app)=>{
      // register employee
      app.route("/emp/register").post(registerEmp)
      //login employee
      app.route("/emp/login").post(loginEMp)
}
export default user