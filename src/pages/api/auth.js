const jwt = require("jsonwebtoken");


export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      res.send(authenticate()) 
    default:
      return res.status(405).end(`Method ${req.method} Not allowed`);
  }


  function authenticate() {
  
    return jwt.verify(req.query.token,jwt_secret,(err,decodedToken) => {
      if (err) {
        console.log("Error");
        return err;
      } else {
        return decodedToken;
      }
    })
  }
}
