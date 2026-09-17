const { Email } = require('../value-objects');

class User {
  constructor({ id, name, email, password, role }) {
    this._id = id;
    this._name = name;
    this._email = email instanceof Email ? email : new Email(email);
    this._password = password;
    this._role = role || 'user';
  }

  get id() { return this._id; }
  get name() { return this._name; }
  get email() { return this._email.value; }
  get password() { return this._password; }
  get role() { return this._role; }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email.value,
      role: this._role,
    };
  }
}

module.exports = User;
