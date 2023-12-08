import { error } from "console";

// factory functions
export const  handleValidationErrors = (error, res) =>{
res.status(400).json({
      error:error.details[0].message,
});
};

export const handleMissingParramsError = (errror, res) =>{
  res.status(100).json({
      error:"missing URL parameter"
  });    
};

export const hanLEServerError =(error,res) =>{
      res.status(500).json({
            error:`Internal Server Error:&{error.message}`,
      });
};
// try catch wrapper
export const tryCatchWrapper = async (handler,req,res)=>{
      try{
            await handler(req,res);

      }catch(error){
            handleServerError(error,res);
      }
};
//user factory functions
export const handleInvalidUser =(res) =>{
      res.status(401).json({
            message:"user account not found.Contact admin"
      });
};
export const handleUserNotFound = (res)=>{
      res.status(401).json({
            message:"wrong credentials.",
      });
};

export const handleUserExists =(res)=>{
      res.status(409).json({
            message:"user already exist. choose a unique username or email.",

      });
};