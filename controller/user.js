const userDetailsRecords = require("../model/userRecord");

exports.homepage = function(req, res) {
    res.render('index');
};

exports.getUserDetails = function (req, res) {
    // checks if users record is available
    if (userDetailsRecords.length >0) {
        // to send out user records
        res.status(200).send(userDetailsRecords);
    } else{
        // to send out user not recorded
        res.status(404).send("User not found");
    }
};


//exports.name = "Edeke Emmanuel";
exports.updateNewUser = function (req, res) {
    // defining the id params
    const id = parseInt(req.params.id);
    // defining updated user
    const newUser = userDetailsRecords.find((newUser, index) =>{
        //returns the user with their index(position) in the array (database)
        if (newUser.id === id){
             newUser.dataId = index;
             return newUser;
        // return false if user is not found
        } else return false;
    });

    if (newUser) {
        // create a new user object
        let updatedUserRecord = {};
        //upload updated record var to the newuser var
        updatedUserRecord.name = req.body.name || newUser.name;
        updatedUserRecord.age = req.body.age || newUser.age;
        updatedUserRecord.gender = req.body.gender || newUser.gender;
        updatedUserRecord.job = req.body.job || newUser.job;
        updatedUserRecord.location = req.body.location || newUser.location;
        updatedUserRecord.photo = req.file.path || user.photo;
        updatedUserRecord.id = newUser.id;
       
        
        //upload the user record with the updated one
        userDetailsRecords.splice(newUser.dataId, 1, updatedUserRecord);
        //send out all users records with the updated one
        res.status(201).json({ success: true, data: updatedUserRecord, message: "User updated successfully"});
    } else res.status(404).json({success: true, message: "user not found"})
}
// function update() {
//     allUserRecords.push(userRecord);
// }

//get single user
exports.getSingleUser = function(req, res) {
    const id = req.params.id;
    // console.log(id)
    
    const oneUser = userDetailsRecords.find(oneUser => {
        console.log(oneUser.id === Number(id));
        if (oneUser.id === Number(id)) return oneUser
        else return false
    });
    // check if user send out exist
    if (oneUser) res.status(200).send(oneUser);
    else res.status(400).send("User not found");   
}

exports.getDeleteUser = function(req, res) {
    const id = parseInt(req.params.id);
    // filters through the userRecords
    const user = userDetailsRecords.find((user, index) => {
        // check if the user id matches the id in the url
        if(user.id === id) {
            //attaches the user id matches the id in the url
            user.dataId = index;
            return user;
        }else {return false;}
    });

if(user) {
    // delete all user using their index
    allUserRecords.splice(user.dataId, 1);
    res.status(200).send({success: true, data:user, message: "User deleted successfully"});
} else res.status(404).send("User not found")
};

// create a user
exports.getCreateUser = function(req, res) {
    //console.log(req.body);
    // object define
    const {name, age, gender, job, location} = req.body;
    // checks if the request data is empty
    if (name && age && gender && job && location) {
        // gets the last users and increment it by 1
        const id = userDetailsRecords[userDetailsRecords.length - 1].id + 1;
        req.body.id = id;
        // save the data in our database
        userDetailsRecords.push(req.body);
        // send out response to the client
        res.status(201).json({ success: true, data: req.body });
    } else{
        res.status(401).json({success: false, message: "Data Empty"});
    }
};

