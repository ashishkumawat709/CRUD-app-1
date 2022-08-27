const Userdb = require('../model/model')

//creating and saving new user
exports.create = (req, res) => {
    //validating request....ki agr body empty h to 400 ka staus bhej dena
    if (!req.body) {
        res.status(400).send({ message: 'content cannot be empty' })
        return;
    }
    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })

    //saving user in database
    user.save(user)
        .then((data) => {
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || 'some error occured while creating' })
        })
}


//retrieving all or single user
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id

        Userdb.findById(id)
        .then((data)=>{
            if(!data){
                res.status(404).send({message:'no user found with the id'})
            }else{
                res.send(data)
            }
        })
        .catch((err)=>{
            res.status(500).send({message: 'error retrieving user'})
        })
    }else{
        Userdb.find()
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || 'some error occured while creating' })
        })
    } 
}


//updating a user
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "no data available for updating" })
    }
    const id = req.params.id
    Userdb.findByIdAndUpdate(id, req.body)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: `cannot update user with ${id}` })
            } else {
                res.send(data)
            }
        })
        .catch((err)=>{
            res.status(500).send({message:'cannot update info of user'})
        })
}


//deleting a user
exports.delete = (req, res) => {
    const id = req.params.id
    Userdb.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: `cannot delete user with ${id}` })
            } else {
                res.send({message:'user deleted'})
            }
        })
        .catch((err)=>{
            res.status(500).send({message:'cannot delete'})
        })
}
