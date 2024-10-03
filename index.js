const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
const apiUrl = "https://127.0.0.1:8000/users";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

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
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'hsac_payment.html'));
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/proxy', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: "http://222.127.109.129:8080/LBP-LinkBiz-RS/rs/postpayment", // URL to proxy
            data: req.body,
            headers: req.body.headers 
        });
        res.send(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

// app.get('/users', (req, res) => {
    
//     axios.get('http://127.0.0.1:8000/users', req.body, {
//         // headers: {
//         //     'Content-Type': 'application/json'
//         // }
//     })
//     .then(response => {
//         console.log(response)
//         res.send(response.data);
//     })
//     .catch(error => {
//         res.status(error.response ? error.response.status : 500).send(error.message);
//     });
// });

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
