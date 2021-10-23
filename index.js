// imports express from node_modules folder
const express = require ("express");
const user = require("./controller/user");
// const allUser = require("./controller/userDetails");

const upload = require("./config");


console.log(user)
// console.log(allUser)
// console.log(getUserDetails)


//converting express to app var
const app = express();

app.use(express.json());
app.use(express.json({ urlEncoded:false}));

app.get('/', user.homepage)


//get all user
app.get('/userDetails/all', user.getUserDetails);
//get a single user
app.get('/userDetails/:id', user.getSingleUser);

// update a users
app.put('/userDetails/:id', upload.single("avatar"), user.updateNewUser);
// get all user details
app.put('/userDetails/all', user.getUserDetails);

// deleted user
app.delete('/userDetails/:id', user.getDeleteUser);

// create user
app.post('/userDetails/:id', user.getCreateUser);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));