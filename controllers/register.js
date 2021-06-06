const handleRegister= (req,res,db,bcrypt)=>{
   
    const{email,name,Password}=req.body;
    if(!email||!name||!Password)
{
    return res.status(400).json('incorrect form submission');
}
    console.log('register pass:',Password);
   
    const hash = bcrypt.hashSync(Password);
    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        }).into('login').returning('email').then(LoginEmail=>{
          return trx('users').returning('*').insert({
               email: LoginEmail[0],
               name:name,
               joined:new Date()
           }).then(user=>{
               res.json(user[0]);
           }).catch(err=>{
               console.log("err", err)
               res.status(400).json(err)
           })
        }).then(trx.commit).catch(trx.rollback)
    })
   
   .catch(err=>res.status(400).json('unable to register'))
    
   
   }
   module.exports={
       handleRegister:handleRegister
   };