var crypto = require('crypto');

const createSalt = () => {
  return crypto.randomBytes(16).toString('hex');
}

const encryptPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex')
}

const users = [
  {
    email: "rhojda@pratt.edu",
    name: "Rafa",
    salt: "3ffc2b91d34a97d967849a29c05d01bd",
    encryptedPassword: "64deece749ff5bd793015ce1d4f0ca9aeba53d0bea08b029ccb5dcd31f4f6d32"
  }
];

exports.add = (user) => {
  let salt = createSalt();
  let new_user = {
    email: user.email,
    name: user.name,
    salt: salt,
    encryptedPassword: encryptPassword(user.password, salt)
  }
  users.push(new_user);
}

exports.getByEmail = (email) => {
  return users.find((user) => user.email === email);
}

exports.login = (login) => {
  let user = exports.getByEmail(login.email);
  if (!user) {
    return null;
  }
  let encryptedPassword = encryptPassword(login.password, user.salt);
  console.log(encryptedPassword);
  if (user.encryptedPassword === encryptedPassword) {
    return user;
  }
  return null;
}

exports.all = users