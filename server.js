const express =require('express');
const bodyparse =require('body-parser');
const app = express();
const bcrypt=require('bcrypt-nodejs');
const cors = require ('cors');
const knex = require('knex');
const register= require('./controllers/register');
const signIn= require('./controllers/signIn');
const profile= require('./controllers/profile');
const image= require('./controllers/image');



const db=knex({
    client: 'pg',
    connection: {
        host:'127.0.0.1',
      user:'postgres',
      password:'test',
      database:'smartbrain'
    },
  });
 

app.use(bodyparse.json());
app.use(cors());


const database={
    users:[
        {
            id:'123',
            name:'john',
            password:'cookies',
            email:'john@gmail.com',
            entries:0,
            joined:new Date()
        },
        {
            id:'124',
            name:'sally',
            password:'bananas',
            email:'sally@gmail.com',
            entries:0,
            joined:new Date()
        }
    ],
    login:[
        {
            id:'987',
            hash:'',
            email:'john@gmail.com'
        }
    ]
}

app.get('/',(req,res)=>{
    res.json(database.users);
})

app.post('/signin',(req,res)=>{signIn.handleSignIn(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})
app.listen(process.env.PORT||3000,()=>{

    console.log(`app is running on port ${process.env.PORT}`);
}

)
