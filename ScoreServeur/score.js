const express = require('express');
const fs = require('fs').promises; // Use the promise-based version of fs
const app = express();
const port = 5000;

const scoresFilePath = './model/score.json'; // Define the file path once for reuse

// Middleware to parse request bodies, assuming you're sending JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getScore', async (req, res) => {
  try {
    const scores = await fs.readFile(scoresFilePath, 'utf8');
    res.json(JSON.parse(scores));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving scores');
  }
});

app.get('/getScoreByUsername/:username', async (req, res) => {
    const username = req.params.username; 
  
    try {
      const scoresData = await fs.readFile(scoresFilePath, 'utf8'); 
      const scores = JSON.parse(scoresData); 
  
      // Recherche du score par nom d'utilisateur
      const userScore = scores.find(score => score.username === username);
  
      if (userScore) {
        res.json(userScore); 
      } else {
        res.status(404).send('User score not found'); 
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving scores');
    }
  });  

  

app.get('/setScore', async (req, res) => {
    try {
      const { username} = req.query;
      console.log("res",username);
      const data = await fs.readFile(scoresFilePath, 'utf8');
      const scores = JSON.parse(data);
  
      const userIndex = scores.findIndex(user => user.username === username);
  
      if (userIndex !== -1) {
        // User found, update score
        scores[userIndex].score = scores[userIndex].score + 1; // Ensure score is an integer before incrementing
      } else {
        // User not found, add new
        scores.push({ username, score:  1 }); // Convert score to int for new user as well
      }
  
      await fs.writeFile(scoresFilePath, JSON.stringify(scores, null, 2)); // Pretty print JSON
      res.send('Score updated successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating scores');
    }
  });
  

app.listen(port, () => {
  console.log(`Score server running on port ${port}`);
});
