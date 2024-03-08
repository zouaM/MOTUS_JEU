const express = require('express');
const dotenv = require('dotenv').config(); // Immediately call config
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'www' directory
app.use(express.static('www'));

// Load users from JSON file
const usersFilePath = './model/users.json';
let users = require(usersFilePath);

// Signup endpoint
app.post('/signup', (req, res) => {
    const { username } = req.body;
    let userExists = users.some(user => user.username === username);

    if (!userExists) {
        // Add new user
        users.push(req.body);
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error saving user');
            }
            console.log("New user added");

            // Generate JWT
            const token = jwt.sign({ time: Date.now(), username }, process.env.JWT_SECRET_KEY);
            console.log(token);
            res.redirect(`http://localhost:3000/callback?token=${token}`);
        });
    } else {
        res.redirect('/signup.html');
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    let user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // User found, generate JWT
        const token = jwt.sign({ time: Date.now(), username }, process.env.JWT_SECRET_KEY);
        console.log(token);
        res.redirect(`http://localhost:3000/callback?token=${token}`);
    } else {
        res.redirect('/login.html');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
