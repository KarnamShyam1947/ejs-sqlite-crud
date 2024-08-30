const express = require('express')
const sequelize = require("./database")
const productRouter = require("./routes/ProductRouter")

const app = express()
const port = 3000

sequelize.sync().then(() => {
  console.log("Database is ready")
})

app.use(express.json())

app.use("/api/v1/products", productRouter)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


