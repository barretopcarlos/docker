const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySQL');
});

app.get('/', (req, res) => {
  const name = generateRandomName();
  const sql = `INSERT INTO people (name) VALUES ('${name}')`;
  db.query(sql, (err) => {
    if (err) throw err;
    console.log(`Nomes inseridos: ${name}`);
  });
  db.query('SELECT name FROM people', (err, results) => {
    if (err) throw err;
    const names = results.map(result => result.name).join('<br>');
    res.send(`<h1>Full Cycle Rocks!</h1><br>- Lista de nomes cadastrada no banco de dados:<br>${names}`);
  });
});

const generateRandomName = () => {
  const names = ['Carlos', 'Bianca', 'Claudia'];
  return names[Math.floor(Math.random() * names.length)];
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});