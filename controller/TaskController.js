//Rota do método da aplicação - funções de rotas

const Task = require("../models/Task");

let message = "";
let type = "";

const getAllTasks = async (req, res) => {
  try {
    setTimeout(() => {
      message = "";
    }, 1000);

    const tasksList = await Task.find(); // pega as listas no bando dados await - espera o banco dados

    return res.render("index", {
      tasksList,
      task: null,
      taskDelete: null,
      message,
      type,
    }); // separou o metodo da rota
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body; //objeto enviado

  if (!task.task) {
    message = "Insira um texto, antes de adicionar a tarefa!";
    type = "danger";
    // se nao tiver nada
    return res.redirect("/"); // carrega a página
  }

  try {
    //tentar
    await Task.create(task); // esperar
    message = "Tarefa criada com sucesso!";
    type = "success";
    return res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const tasksList = await Task.find();
    if (req.params.method == "update") {
      const task = await Task.findOne({ _id: req.params.id });
      res.render("index", {
        task,
        taskDelete: null,
        tasksList,
        message,
        type,
      });
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", {
        task: null,
        taskDelete,
        tasksList,
        message,
        type,
      });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateOneTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);
    message = "Tarefa atualizada com sucesso!";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const deleteOneTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    message = "Tarefa apagada com sucesso!";
    type = "success";

    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const taskCheck = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });

    task.check ? (task.check = false) : (task.check = true);

    await Task.updateOne({ _id: req.params.id }, task);
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
  deleteOneTask,
  taskCheck,
};
