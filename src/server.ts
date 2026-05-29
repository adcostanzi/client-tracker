import "dotenv/config";
import app from "./app";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Client tracker API running on port: ${PORT}`);
});
