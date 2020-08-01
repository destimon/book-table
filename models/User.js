const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let bcrypt_cost = 12;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  finishedBooks: [
    {
      bookId: {
        type: String,
        required: true,
      },
      review: {
        type: String,
      },
      grade: {
        type: Number,
      },
    },
  ],
});

UserSchema.statics.hashPassword = (passwordRaw, cb) => {
  if (process.env.NODE_ENV === "test") {
    bcrypt_cost = 1;
  }
  bcrypt.hash(passwordRaw, bcrypt_cost, cb);
};

UserSchema.statics.comparePasswordAndHash = (password, passwordHash, cb) => {
  bcrypt.compare(password, passwordHash, cb);
};

module.exports = mongoose.model("user", UserSchema);
