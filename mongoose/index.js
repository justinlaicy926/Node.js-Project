const boolean = require('joi/lib/types/boolean');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log("connected to MongoDB"))
    .catch(()=>console.error('could not connect to MongoDB'))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);
const course = new Course({
    name: 'Node.js',
    author: "Chenyang",
    tags: ['node', 'backend'],
    isPublished: true
});

const result = await course.save();

async function getCourses(){
    const courses =  await Course.find();
    console.log(courses);
}

getCourses();


async function updateCourse(id){
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = true;
    course.author = "another author";
}