import sql from "mssql";
import config from "../Db/config.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
//login required
export const loginRequired =(req, res, next)=>{
      if (req.user){
            next();
      }else{
            return.res.status(401).json({message:"unauhorized user!"})
      }
};
//register employee
export const registerEmp = async (req,res)=>{
      const {email,password}= req.body;
      const hashedPassword = bcrypt.hashSync(password,10);
      try{
            //if user exist
            let pool= await sql.connect(config.sql);
            let result = await pool
            .request()
            .input("email", sql.VarChar, email)
            .query("SELECT * FROM Users WHERE email =@email AND password=@password");

            const user = result.recordset[0];
            if (user){
                  return.res.status(409).json({console.error(:"user already exist");})
            }else{
                  //if employee does not exist
                  await pool 
                  .request()
                  .input("useremail", sql.VarChar, useremail)
                  .query("INSERT INTO Users username VAALUES@username, Userpassword VALUES @userpassword, useremail@seremail")
                        res.status(200).json({message:"employee created succesfully"});

            }

      }catch(error){
            res.status(409).json(error.message);
      
      }finally{
            sql.close();
      }
};
// Login emp
export const loginEmp =async(req,res)=>{
      const{email,password}=req.body;//destructuring
      try{
            let pool= await sql.connect(config.sql);
            let result =await pool.request()
            .input("useremail",sql.VarChar, useremail)
            .input("userpassword",sql.VarChar, userpassword)
            .query(SELECT * FROM employees WHERE useremail=@useremail, userpassword=@userpassword);
            const employee =result.recordset[0];
            if(!employee){
                  return res.status(401).json({"invalid credentials"});

            }else{
                  //create token
                  const token  =`Jwt & {jwt.sign(
                        {
                              useremail:user.useremail,
                              userpassword: user.userpassword,
                              userid:user.userid,
                        }, 
                        config.jwt_secret,
                        {expiresIn:"1h"}
                  )}`;
                  res.status(200).json({useremail:user.useremal,
                  userpassword:user.userpassword,
                  userid: user.userid,
                  token:token,
                  });

            }catch(error){
                  res.status(409).json(error.message);
            }finally{
                  sql.close();
            }
      }
}