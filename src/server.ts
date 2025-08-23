import "dotenv/config";
import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./database";

const PORT = process.env.PORT || 3000;

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
