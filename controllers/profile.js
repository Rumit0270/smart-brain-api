const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

const handleProfileUpdate = (req, res, db) => {

  const { id } = req.params;
  const { name, age, pet } = req.body.formInput;

  db('users')
    .where({ id })
    .update({ name })
    .then(response => {
      if (response) {
        return res.json("success")
      } else {
        return res.status(404).json("Unable to update")
      }
    })
    .catch(err => res.status(400).json('Error updating user'));

}

module.exports = {
  handleProfileGet,
  handleProfileUpdate
}