const jwt = require("jsonwebtoken");

// figure out secret and expiration
const secret = "mysecretssh";
const expiration = "2h";

module.exports = {
  autthMiddleware: function ({ req }){
    // setup token by either the request body query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // if the token is made through the header fix the string
    if(req.headers.authorization){token = token.split(" ").pop().trim();}

    // if the token is undefined return the request
    if(!token){return req;}

    // verify the user's token and send the data
    // if there's an error log "Invalid Token"
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (error) {console.log("Invalid Token");}
  },
  signToken: function({ username, password, _id}){
    // setup the payload with the user's username and their password
    const payload = {username, password, _id};
    // send signed jwt with payload with secret and expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};