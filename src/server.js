const express = require('express')
const server = express()
const db = require('./database/db')

server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))

//Template Engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
})

server.get("/", (req, res) => {
  return res.render("index.html", { title: "um titulo" })
})
server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
  const datas = req.body

  const query = `
      INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
      ) VALUES (
        ?,?,?,?,?,?,?);
    `
  const values = [
    `${datas.image}`,
    `${datas.name}`,
    `${datas.address}`,
    `${datas.address2}`,
    `${datas.state}`,
    `${datas.city}`,
    `${datas.items}`
  ]
  db.run(query, values, function(err) {
    if (err) {
      console.log(err)
      return res.send("Erro no cadastro")
    }
  })
  console.log(datas)

  return res.render("create-point.html", { saved: true })
})

server.get("/search-results", (req, res) => {

  const search = req.query.search

  if (search == ""){
    return res.render("search-results.html", { total: 0 })
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${ search }%'`, function(err, rows) {
    if(err){
      return console.log(err)
    }
    
    const total = rows.length

    return res.render("search-results.html", { places: rows, total })
  })
})

server.listen(3000)
