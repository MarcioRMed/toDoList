//Rota do método da aplicação

const Task = require("../models/Task");

const getAllTasks = async (req, res) => {

  try{
    const tasksList = await Task.find(); // pega as listas no bando dados await - espera o banco dados
    return res.render("index", {tasksList}); // separou o metodo da rota
  } catch (err){
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

// exportando os métodos
module.exports = {
  getAllTasks,
  createTask,
};
