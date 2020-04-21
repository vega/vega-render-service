import app from './app';
const port = 8090; // default port to listen

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
