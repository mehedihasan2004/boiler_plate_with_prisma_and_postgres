import { Server } from "http";
import app from "./app";
import config from "./config";

const root = () => {
  try {
    const server: Server = app.listen(config.port, () =>
      console.log(`Server Running On http://localhost:${config.port}`)
    );

    const exitHandler = () => {
      if (server) server.close(() => console.log("Server Closed!"));

      process.exit(1);
    };

    const unexpectedErrorHandler = (err: unknown) => {
      console.log("Error From Unexpected Error Handlar --> ", err);

      exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);

    process.on("SIGTERM", () => {
      console.log("SIGTERM Received!");

      if (server) server.close();
    });
  } catch (err: any) {
    console.log("Error From Root --> ", err);
  }
};

root();
