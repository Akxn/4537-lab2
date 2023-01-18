const express = require('express');
const bodyParser = require('body-parser');
const { dirname } = require('path');

const app = express();
const fetch = require('node-fetch');
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(__dirname+'/chatbox.html')});

app.get('/index.js', (req, res) => {
	res.sendFile(__dirname+'/index.js')}
);

app.post('/chatbot', (req, res) => {
	const message = req.body.message;
	const number = message.match(/\d+/);
	if (number) {
		fetch(`http://numbersapi.com/${number}?type=trivia`).then(response => response.text()).then(data => {
			res.json({
				text: data
			});
		}).catch(error => {
			res.json({
				text: "Sorry, I couldn't find any information about that number."
			});
		});
	} else {
		res.json({
			text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about."
		});
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});