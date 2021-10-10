const app = require('./app.js');

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`);
    console.log(`API Testing UI: http://localhost:${PORT}/v0/api-docs/`);
});
