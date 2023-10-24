var PORT = process.env.PORT || 3001;
var ServerSecretKey = process.env.SECRET || "123";
var POSTSECRET = process.env.POSTSECRET || "1231321";
var dbURI = process.env.dbURI || "mongodb+srv://dev_user:gBvyFb1J@cluster0.e5lzl.mongodb.net/car-bucks-database?retryWrites=true&w=majority"



module.exports = {
    PORT : PORT,
    ServerSecretKey : ServerSecretKey,
    POSTSECRET : POSTSECRET,
    dbURI : dbURI,
}