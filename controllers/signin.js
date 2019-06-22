const jwt = require('jsonwebtoken');
const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_URI);

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject('unable to get user!'))
      } else {
        Promise.reject('wrong credentials')
      }
    })
    .catch(err => Promise.reject('wrong credentials'))
}

const getAuthTokenId = () => {
  console.log(" verify ")
}

const createSession = (user) => {
  // JWT TOKEN and return user data
  const { email, id } = user;
  const token = signToken(email);
  return { success: true, userId: id, token}
}

const signToken = (email) => {
  const payload = { email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2 days'});
}

const authenticateUser = (db, bcrypt) => (req, res, next) => {
  const { authorization } = req.headers;

  if(authorization) {
    return getAuthTokenId()
  }  else {
    handleSignin(db, bcrypt, req, res).then(data => {

      if (data.id && data.email) {
        return createSession(data)
      }
      return Promise.reject(data)
    })
      .then(session => res.json(session))
      .catch(err => res.status(400).json(err))
  }
}
 
module.exports = {
  handleSignin,
  authenticateUser
}