const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  const password = process.argv[2];
  const url = `mongodb+srv://fullstack:${password}@cluster0-i5urs.mongodb.net/console?retryWrites=true&w=majority`;
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Phonebook: ");
  Person.find({}).then(persons => {
    persons.map(p => {
      console.log(p.name, p.number);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 4) {
  console.log("give password as argument");
  process.exit(1);
} else if (process.argv.length === 5) {
  const password = process.argv[2];
  const name = process.argv[3];
  const number = process.argv[4];
  const url = `mongodb+srv://fullstack:${password}@cluster0-i5urs.mongodb.net/console?retryWrites=true&w=majority`;

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  const person = new Person({
    name: name,
    number: number
  });

  person.save().then(res => {
    console.log(`added ${res.name} number ${res.number} to the phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("invalid arguments [password, name, number]");
  process.exit(1);
}
