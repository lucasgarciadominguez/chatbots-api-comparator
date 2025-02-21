const express = require("express");
const dotenv = require("dotenv");
const routes = require("./app/routes/indexOpenAI");

dotenv.config(); // load entorn variables

const app = express();
app.use(express.json()); // Middleware for parse JSON
app.use("/", routes);

// initialize the server in port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
