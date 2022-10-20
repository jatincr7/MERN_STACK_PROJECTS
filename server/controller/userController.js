import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken'
import upload from "../helper/imageHelper.js"
import fs from "fs";

export const register = function (req, res) {
  upload(req, res, async (err) => {
    if(err){
        console. log (err)
    }
    else{
      var newUser = new User({
        hash_password: bcrypt.hashSync(req.body.password, 10),
        profileImg: {
          data: fs.readFileSync("uploads/" + req.file.filename),
          contentType: 'image/png'
        },
        email: req.body.email
      });  
      await newUser.save(function(err, user) {
        if (err) {
          return res.status(400).send({
            message: err
          });
        } else {
          user.hash_password = undefined;
          return res.json(user);
        }
      });
    }
  })}
  

export const signIn = function (req, res) {
  try {
    User.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) throw err;
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      }
      return res.json({ token: jwt.sign({ email: user.email},'BUZZINGO'), data: user });
    });
  } catch (e) {
    console.log("error while login >>>>>>",e)
  }
  };

export const getUser = (req, res) => {
     return  res.send('works !')
}