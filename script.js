function vote(candidate) {
    fetch('https://voting-h0un.onrender.com/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidate: candidate }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = `Thank you for voting! Current count for ${candidate}: ${data[candidate]}`;
    })
    .catch(error => console.error('Error:', error));
}
