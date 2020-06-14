const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       image TEXT,
//       name TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     );
//   `)
//   const query = `
//       INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//       ) VALUES (
//         ?,?,?,?,?,?,?);
//     `
//   const values = [
//     "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1174&q=80",
//     "Colectoria",
//     "Guilherme Gemballa, Jardim América",
//     "Número 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Resíduos Eletrônicos e Lâmpadas"
// ]
  // db.run(query, values, function(err) {
  //   if (err) {
  //     return console.log(err)
  //   }

  //   console.log("Cadastrado com sucesso")
  //   console.log(this)
  // })

  // db.run(`DELETE FROM places WHERE id = ?`, [8], function(err){
  //   if(err){
  //     return console.log(err)
  //   }
  //   console.log("Registro deletado com sucesso!")
  // })
  // db.all(`SELECT * FROM places`, function(err, rows) {
  //   if(err){
  //     return console.log(err)
  //   }
  //   console.log("Aqui estão seus registros: ")
  //   console.log(rows)
  // })
})

module.exports = db