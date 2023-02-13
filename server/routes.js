const app = require('express')();

app.use("/api", require('./routes/product'));
app.use("/api", require('./routes/category'));
app.use("/api", require('./routes/owner'));


module.exports = app;