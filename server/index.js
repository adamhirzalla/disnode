// Imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
const path = require("path");
const chalk = require("chalk");
const createError = require("http-errors");

const ENV = process.env.NODE_ENV || "development";
const PATH = path.resolve(__dirname, "./.env." + ENV);

require("dotenv").config({ path: PATH });

// Web server config
const PORT = process.env.PORT || 8001;
const app = express();

app.use(cors());
// app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Import Route Handlers
const { auth } = require("./src/middleware/auth");
const uploadRoute = require("./src/routes/upload");
const debugRoutes = require("./src/routes/debugRoutes");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const serverRoutes = require("./src/routes/serverRoutes");
const channelRoutes = require("./src/routes/channelRoutes");
const friendRoutes = require("./src/routes/friendRoutes");

// Enable debug routes on non-prod environments
if (ENV !== "production") {
  app.use("/api/debug", debugRoutes);
}

// Add routes
app.use("/", uploadRoute);
app.use("/api", authRoutes);
app.use("/api", auth, userRoutes);
app.use("/api", auth, serverRoutes);
app.use("/api", auth, channelRoutes);
app.use("/api", auth, friendRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
require("./src/socket/index")(io);

server.listen(PORT, () => {
  console.log(
    chalk.cyan(`-> Disnode server listening on PORT ${PORT} in ${ENV} mode!`)
  );
});
