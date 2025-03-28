import jwt from 'jsonwebtoken';

const authToken = (req, res, next) => {
  const token = req.cookies['coderCookie'];

  if (!token) {
    return res.status(401).send({ status: "error", error: "No token provided" });
  }

  try {
    const user = jwt.verify(token, 'tokenSecretJWT');
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).send({ status: "error", error: "Invalid or expired token" });
  }
};

export default authToken;
