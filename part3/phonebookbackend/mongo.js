const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give at least the password');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.lungpw3.mongodb.net/phonebookApps?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
  },
);

const PhoneBook = new mongoose.model('PhoneBook', phonebookSchema);

if (process.argv.length === 3) {
  PhoneBook
    .find({})
    .then(
      (phonebooks) => {
        phonebooks.forEach((phonebook) => {
          console.log('phonebook:');
          console.log(phonebook.name);
          console.log(phonebook.number);
        });
        mongoose.connection.close();
      },
    );
} else {
  const name = process.argv[3];
  const number = process.argv[4];

  const userEntry = new PhoneBook({ name, number });

  userEntry.save().then((person) => {
    console.log(` added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
