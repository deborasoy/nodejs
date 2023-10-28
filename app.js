
const express = require("express");
const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

const people = require("./json/people.json"); // Importa los datos iniciales (generados en https://www.mockaroo.com/)
//raiz
app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});
 // Enviamos todo el array
app.get("/people", (req, res) => {
  res.json(people);
});
// Enviamos el elemento solicitado por su índice
app.get("/people/:index", (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < people.length) {
    res.json({
      index:`Indice actual del objeto: ${ index}`,
      person: people[index],
    }); 
    
  } else {
    res.status(404).send({message:"No existe una persona con ese Indice"})
  };

});
 // Añadimos un nuevo elemento al array
app.post("/people", (req, res) => {
  const personNew = req.body;
  people.push(personNew);
  res.send({
    message: "Persona añadida correctamente",
    personAdded: personNew,
    data: `Array actualizado: ${JSON.stringify(people)}`
  });
  
});
//COMPLETA EL CÓDIGO NECESARIO:Para que se pueda actualizar el objeto asociado al índice indicado en la URL
app.put("/people/:index", (req, res) => {
  const { id, first_name, last_name, email } = req.body;
  const { index } = req.params;
  if (index >= 0 && index < people.length) { 
    people[index].last_name = last_name;
    people[index].id = id;
    people[index].first_name = first_name;
    people[index].email = email;
    res.send({
      status: `OK`,
      message: `Persona con indice ${index} actualizada con exito!`,
      dataUpdate: JSON.stringify(people[index]),
      data: `Array actualizado: ${JSON.stringify(people)}`,
    });
  } else {
    res.status(404).send({message:"No existe una persona con ese Indice"})
  };
  
});

//COMPLETA EL CÓDIGO NECESARIO: Para que se pueda eliminar el objeto asociado al índice indicado en la URL 
app.delete("/people/:index", (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < people.length) {
    people.splice(index, 1);
    res.send({
      status:`OK`,
      message: `Se ha borrado la persona con indice ${index}`,
      lengthArray: `Largo actual del array: ${people.length}`,
      data: `Array actualizado: ${JSON.stringify(people)}`,
    });
  }
  else {
    res.status(404).send({message:"No existe una persona con ese Indice"});
  };
});


// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
