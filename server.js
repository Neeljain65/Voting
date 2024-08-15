const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'votes.json');

app.use(express.json());
app.use(express.static(__dirname));

app.post('/vote', (req, res) => {
    const { candidate } = req.body;

    // Read the existing vote counts
    let votes = {};
    if (fs.existsSync(FILE_PATH)) {
        votes = JSON.parse(fs.readFileSync(FILE_PATH));
    }

    // Increment the vote count for the selected candidate
    votes[candidate] = votes[candidate] ? votes[candidate] + 1 : 1;

    // Save the updated vote counts back to the JSON file
    fs.writeFileSync(FILE_PATH, JSON.stringify(votes));

    // Respond with the updated count for the selected candidate
    res.json(votes);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
