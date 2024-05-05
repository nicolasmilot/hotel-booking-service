import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json({ type: 'application/json' }))

// app.use("/api/v1/users", searchUsersFeature);

app.get('/', (req, res) => {
    res.send("Hello, how are you today ?");
});

export { app };
