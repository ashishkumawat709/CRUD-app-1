const axios = require('axios')

exports.homeRoutes = (req,res)=>{
    //make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        
        res.render('index', {users:response.data})   //hm chahte to yhi index k aage ejs code likh dete jo b dikhna h vo
    })                                               //pr hmne use users name k var me store kiya or use var ko index me cal kiya
    .catch((err)=>{
        res.send(err)
    })
}

exports.add_user = (req,res)=>{
    res.render('add_user')
}

exports.update_user = (req,res)=>{
    axios.get('http://localhost:3000/api/users', {params:{id:req.query.id}})
.then((userdata)=>{
    res.render('update_user', {user:userdata.data})
})
.catch((err)=>{
    res.send(err)
})   
}

