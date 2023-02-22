const app = require('express')();

app.use("/", require('./routes/product'));
app.use("/", require('./routes/category'));
app.use("/", require('./routes/owner'));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/review"));
app.use("/", require("./routes/address"));
app.use("/", require("./routes/payment"));
app.use("/", require("./routes/order"));


module.exports = app;