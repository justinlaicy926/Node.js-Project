//const { response } = require('express');
const { response } = require('express');
const express = require('express');

const app = express();

const courses =  [
    {id: 1, name: "course1"},
    {id: 1, name: "course1"},
    {id: 1, name: "course1"},
];

app.get('/', (req, res) => {
    res.send('Hello world.');

});

app.get('/api/courses', (req, res)=> {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id) );
    if (!course) response.status(404).send("This course was not found.");
    res.send(course);
});

const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`listening on port ${port}.`));