var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

function handleDateOutput(date) {
	return {
		unix: date.valueOf(),
		utc: date.toUTCString()
	}
}

app.get('/api/:date?', (req, res) => {
	let date = +req.params.date ? new Date(+req.params.date) : req.params.date ? new Date(req.params.date) : new Date();

	if (date instanceof Date && !isNaN(date.valueOf())) {
		res.json(handleDateOutput(date));
	} else {
		res.json({ error: "Invalid Date" });
	}
});

var listener = app.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});

