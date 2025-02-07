const app = require('./app'); // Importera den konfigurerade appen

const port = 5001;
app.listen(port, () => console.log(`Server started at port ${port}`));
