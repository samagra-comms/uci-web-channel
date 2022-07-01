import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();
const jwt = require("jsonwebtoken");

export default function handler(req, res) {
  console.log(req);
  switch (req.method) {
    case "POST":
      return authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not allowed`);
  }

  function authenticate() {
    const { otp, right_otp, number } = req.body;
    if (otp === right_otp) {
      const token = jwt.sign({ user: number }, serverRuntimeConfig.secret, {
        expiresIn: "7d",
      });
      return res.status(200).json({
        status: "success",
        number,
        token,
      });
    } else {
      return res.status(200).json({
        status: "failure",
        message: "OTP is wrong",
      });
    }
  }
}
