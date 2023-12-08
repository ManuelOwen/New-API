import express from 'express'
import bodyParser from 'body-parser'
import config from './Db/config.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
// import { request } from 'http'

const app = express();
// middlewares
app.use(bodyParser);
app.use(bodyParser.urlencoded({extended:true}));
app.use (express.json());
app .use(cors());
 
app.use((req, res, next)=>{
      if(
             req.headers && //used to check if request has the header
             req.headers.authorization &&//used  if request has authorization header
             req.headers.authorization.split("")[0]==="JWT"//used to check if header has jwt token

      ){
            jwt.verify(
                  req.headers.authorization.split(" ")[1],
                  config.jwt_secret,
                  (err, decode)=>{
                        if(err)req.user=undefined;
                        req.user=decode;
                        next();
                  }
            );
      }else{
            req.user= undefined;
            next();
      }
});
app.get("/", (req, res)=>{
      res.send("it's me I and myself")
})
app.listen(config.port|| 5000, ()=>{
      console.log('server is running on', config.port || 5000)
});