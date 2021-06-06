const Clarifai =require('clarifai');
const app = new Clarifai.App({
    apiKey: 'ff8b9b0f0abf42ceb0f1e03152eb4c40'
  });

  const handleApiCall=(req,res)=>{

      app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data=>{
          res.json(data);
      }).catch(err=>res.status(400).json('unable to work with api'))
  }
const handleImage=(req,res,db)=>{
    const {id}=req.body;
    db('users').where('id', '=', id)
    .increment('entries',1).returning('entries').then(entries=>{
        res.json(entries[0]);
    }).catch(err=>res.status(400).json('enable to get count'))
}
module.exports={
    handleImage:handleImage,
    handleApiCall:handleApiCall
}