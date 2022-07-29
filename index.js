const Joi = require("joi");
const { response } = require('express');
const express = require('express');

const app = express();

app.use(express.json());

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

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

app.post('/api/courses', (req, res) => {
    //object destructuring
    const {error} = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length +1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});   

app.put('.api.courses.:id', (req, res)=> {
    const {error} = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;

    res.send(course);
});

app.delete('/api/courses/:id', (req, res)=> {
    const course = courses.find(c => c.id === parseInt(req.params.id) );
    if (!course) return response.status(404).send("This course was not found.");
     
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`listening on port ${port}.`));