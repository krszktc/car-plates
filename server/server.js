const express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

const plateService = require('./service');
const tableDataReloader = require('./table-data-reload');

const app = express();
const port = 4000;
const DB_URL = 'mongodb://localhost/plates'

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/', express.static(path.join(__dirname, 'ui')))

mongoose.connect(DB_URL, {useNewUrlParser: true}).then(
    () => {console.log('Successfully connected to DB')},
    err => {console.log('Cannot connect to DB')}
);

app.get('/api/dont-do-this-on-prod', function (req, res) {
    tableDataReloader.resetDatabasEntities(res);
})

app.get('/api/plates', function (req, res) {
    plateService.getPlates(res, req.query);
})

app.delete('/api/delete/:id', function (req, res) {
    plateService.daletePlate(res, req.params.id);
})

app.post('/api/add', function (req, res) {
     plateService.addPlate(res, req.body);
})

app.put('/api/update', function (req, res) {
    plateService.updatePlate(res, req.body);
})

const server = app.listen(port, function(){
    console.log('Running on port ' + port);
});
