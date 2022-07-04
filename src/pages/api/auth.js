const jwt = require("jsonwebtoken");

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      res.send(authenticate());
    default:
      return res.status(405).end(`Method ${req.method} Not allowed`);
  }

  function authenticate() {
    try {
      const decoded = jwt.verify(
        `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im13dV85WjA2SDJoNjZuZmZoMWFaNlBfNWxNTSJ9.eyJhdWQiOiIyM2U1ZTI5MS1kYzg3LTRhZjUtYTYyZi01NzgxOThmMTM0ODMiLCJleHAiOjE2NjA1MjYyMTUsImlhdCI6MTY1NjkyNjIxNSwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiJhNWNmY2FiMS1kYjQ2LTQ2NzMtYmYwYi05ZjcwOTQ2Y2M0ZWMiLCJqdGkiOiIzZjQ1ZjAyZi0wZmVlLTQwZTUtOWZmYi0zYjM1ZmIxODA2MmEiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsInByZWZlcnJlZF91c2VybmFtZSI6Ijg1ODg5MDUwMDAiLCJhcHBsaWNhdGlvbklkIjoiMjNlNWUyOTEtZGM4Ny00YWY1LWE2MmYtNTc4MTk4ZjEzNDgzIiwicm9sZXMiOltdfQ.UrNQ-82AJG9b9TmU8eL86iNH4HsNqsEfG7ldkqOqgOROXM2UR6lwP7rqISFrjFk1q5gpGDSK9DklPDbg50JCuMMeTHd5c9eKJt1g5Ot-tY2WVrihmJt0-6WDMBmdnNp1PVs-Qpjtv_QamHz8wDQayTX7FV1dMM--Q3kqx_NB5TZd9HwQZlW5WbibMRzBJG7oG_cR1BnKtvsXG5jP59crBiPp8jOgKAUUHhwWb_CJnIvPHTbyLRAH-VFy9dmrv7kbpuzjaXagM3KikCndmdsTxZrRsWt8yYfFhxiU64t_RN3MhAyMQV_C9sbLzv4ke7QFiFov6c3eH396EBqHhIYuCw`,
        `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo\n4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u\n+qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh\nkd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ\n0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdg\ncKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc\nmwIDAQAB\n-----END PUBLIC KEY-----`,
        { algorithms: ["RS256"] }
      );
      return decoded;
    } catch (err) {
      throw err;
    }
  }
}
