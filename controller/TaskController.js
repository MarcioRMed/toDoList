//Rota do método da aplicação

const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasksList = await Task.find(); // pega as listas no bando dados await - espera o banco dados
    return res.render("index", { tasksList, task: null }); // separou o metodo da rota
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body; //objeto enviado

  if (!task.task) {
    // se nao tiver nada
    return res.redirect("/"); // carrega a página
  }

  try {
    //tentar
    await Task.create(task); // esperar
    return res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    const tasksList = await Task.find();
    res.render("index", { task, tasksList });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateOneTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id}, task); // erro nesta linha
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// exportando os métodos
module.exports = {
  getAllTasks,
  createTask,
  getById,
  updateOneTask,
};


