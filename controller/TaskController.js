//Rota do método da aplicação


const getAll = (req, res) => {
  return res.render("index"); // separou o metodo da rota
};

module.exports = { // exportando o método
  getAll,
};