//handler(function of all data recorded)|| to export
function getUserDetails(req, res) {
    // checks if users record is available
    if (userDetailsRecords.length >0) {
        // to send out user records
        res.status(200).send(userDetailsRecords);
    } else{
        // to send out user not recorded
        res.status(404).send("User not found");
    }
}

module.exports.getUserDetails = getUserDetails;
module.exports.userinfo = { name: "Emmanuel", age: "20"};

//const customModule = {
//    customExports: {}
//}
//customModule.exports = getUserDetails
