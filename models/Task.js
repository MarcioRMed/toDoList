//modelo de documento da minha coleção

const mongoose = require("mongoose");

//tabela
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    require: true,
  },
  check: {
    type: Boolean,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(), // data e hora do servidor local ou do servidor externo
  },
});

module.exports = mongoose.model("Task", taskSchema);
