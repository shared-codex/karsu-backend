import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./database";
import { config } from "./config";

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

AppDataSource.initialize()
  .then(() => {
    // TODO: later i should have app init here
  })
  .catch((error) => {
    console.error("Error during Data Source initialization", error);
  });
