const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add CORS headers
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        console.log('Request Origin:', origin);
    } else {
        console.log('No Origin header in the request');
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // No Content
    }
    next();
});

app.get('/', (req, res) => {
    res.send('Proxy server is running!!');
});

app.get('/home', (req, res) => {
    res.send('This is my home');
});

app.post('/proxy', (req, res) => {
    axios.post('http://222.127.109.129:8080/LBP-LinkBiz-RS/rs/postpayment', req.body, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        res.status(error.response ? error.response.status : 500).send(error.message);
    });
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
