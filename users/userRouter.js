const express = require('express');
const router = express.Router();
const Users = require('./userDb');
//completed post with validateUser
router.post('/', validateUser, (req, res) => {
    const userData = req.body;
    Users.insert(userData)
        .then(user =>{
            console.log('user post', user)
            res.status(200).json(user)
        })
        .catch(()=> {
            res.status(500).json({
                errorMessage: "there was an error while saving the user"
            })
        })

});

router.post('/:id/posts', (req, res) => {

});
//completed get /
router.get('/', (req, res) => {
    Users.get()
        .then(users =>{
            res.status(200).json(users)
        })
        .catch(()=> {
            res.status(500).json({
                errorMessage: "The users could not be retrieved."
            })
        })

});
//completed get by id
router.get('/:id', (req, res) => {
    Users.getById(req.params.id)
        .then(user => {
            if(user){
                res.status(200).json(user)
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                })
            }
        })
        .catch(()=> {
            res.status(500).json({
                errorMessage: "The user info could not be retrieved"
            })
        })

});

router.get('/:id/posts', (req, res) => {

});
//completed delete
router.delete('/:id', (req, res) => {
    Users.remove(req.params.id)
        .then(user => {
            if(user){
                res.status(200).json({
                    message: "the user was deleted."
                })
            } else {
                res.status(404).json({
                    message: "the user with the specified ID doesn't exist."
                })
            }
        })
        .catch(()=> {
            res.status(500).json({
                errorMessage: "The user could not be removed."
            })
        })

});

router.put('/:id', (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    if(!name){
        res.status(400).json({
            errorMessage: "please provide the name"
        })

    } else{
        Users.update( id, name)
        .then(user => {
            if(user){
                res.status(200).json(name)
            } else {
                res.status(404).json({
                    message: "the user with the specified ID doesn't exist"
                })
            }
        })
        .catch(()=> {
            res.status(500).json({
                error: "the user information could not be modified"
            })
        })
    }

});

//custom middleware

function validateUserId(req, res, next) {
if (req.params.id){
    res.status(200)
} else {
    res.status(400).json({
        message: "invalid user id"
    })
}

};
//completed validateUser
function validateUser(req, res, next) {
    if(!req.body){
        res.status(400).json({
            message: "missing user data"
        });
    } else if (!req.body.name){
        res.status(400).json({
            message: "missing required name field."
        })
    }
    next()

};
//completed validatePost
function validatePost(req, res, next) {
    if(!req.body){
        res.status(400).json({
            message: "missing post data"
        })
    } else if (!req.body.text){
        res.status(400).json({
            message: 'missing required text field'
        })
    }
    next()

};

module.exports = router;
