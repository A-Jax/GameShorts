const express = require('express');
const path = require('path');
const app = express();


 // set static folder
app.use(express.static(__dirname + '/dist')); 

//catch all routes and send to Angular Router.
app.get('*/', (req, res) => { 
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})

// Set listening port
const port =  process.env.PORT || 1337
app.listen(port, () => {
    console.log(`Server running on ${port}`)
})
