const User = require('../model/User');
const Goals = require('../model/Goals');
const bcrypt = require('bcrypt');
const Wallet = require('../model/Wallet');
const ObjectId = require('mongodb').ObjectId;

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required.' });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    const _id = new ObjectId();

    //create and store the new user
    const result = await User.create({
      _id,
      username: username,
      password: hashedPwd,
    });
    await Wallet.create({
      uid: _id.toString(),
    });
    console.log('1.');
    await Goals.create({
      uid: _id.toString(),
    });
    console.log('2.');
    console.log(result);

    res.status(201).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
