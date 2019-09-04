const express = require('express');
const router = express.Router();
const Users = require('./userDb');
const Posts = require('../posts/postDb');
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
//fix this shit
router.post('/:id/posts',validateUserId, validatePost,(req, res) => {
    const user_id = req.params.id;
    const userText = req.body.text;
    const PostInfo = { user_id, userText};

    Posts.insert(PostInfo)
        .then(userPost => {
           res.status(201).json(userPost);
        })
        .catch(()=> {
            res.status(500).json({
                errorMessage: "can't make that post happen"
            })
        })


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
//succceessssss
router.get('/:id/posts', (req, res) => {
    const {id} = req.params;
    Users.getUserPosts(id)
        .then(userPosts => {
            res.status(200).json(userPosts)
        })
        .catch(()=> {
            res.status(500).json({errorMessage: "couldn't get this user's posts"})
        })
});
//completed delete
router.delete('/:id', validateUserId, (req, res) => {
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
//completed put with validateUser
router.put('/:id', validateUser, (req, res) => {
    
    const { id } = req.params;

        Users.update( id, req.body)
        .then(user => {
            if(user){
                res.status(200).json(req.body)
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
})


//custom middleware

function validateUserId(req, res, next) {
const {id} = req.params;
Users.getById(id)
    .then(userInfo => {
        if(userInfo){
            req.user = userInfo
        } else {
            res.status(400).json({errorMessage: "invalid user id"})
        }
    })
    .catch(error => console.log(error))
    next()

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
