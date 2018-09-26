const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({
    message: 'status OK'
  })
})
server.listen(3000, () => console.log('Express is listenning on port 3000'));