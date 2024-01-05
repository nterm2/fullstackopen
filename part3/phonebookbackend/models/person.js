const mongoose = require('mongoose');

const password = process.env.DB_PASSWORD;

const url = `mongodb+srv://fullstack:${password}@cluster0.lungpw3.mongodb.net/phonebookApps?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },

  number: {
    type: String,
    validate: {
      validator(v) {
        return /\d{3}-\d/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    minLength: 8,
  },
});

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', phonebookSchema);
