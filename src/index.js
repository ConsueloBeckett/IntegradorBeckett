const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const path = require("path");
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const messageRouter = require('./routes/message.router');
const port = 8080

//MiddLewars
app.use(express.json())
app.use(express.urlencoded({extend: true}))

//public fields
app.use(express.urlencoded(path.join(__dirname, 'public')))

//routes
app.use('/api/carts', cartsRouter);
app.use("/api/products", productsRouter);
app.use("/api/message", messageRouter);

//html file
app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.listen(port, () =>{
console.log(`server ${port}`)

})

app.use(express.json())

mongoose.connect("mongodb+srv://pruebaCoder:9zhXvimsIRCZadOc@cluster0.c2raoho.mongodb.net/?retryWrites=true&w=majority")

.then(()=>{
    console.log("connected to DB")
})
.catch(e =>{
    console.e("cant conect to the DB", e)
})

