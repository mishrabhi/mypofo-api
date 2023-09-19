const app = require("./server/server");
const config = require("./server/config/config");
app.listen(config.port, () => {
  console.log(`API is up and running on port ${config.port}`);
});
