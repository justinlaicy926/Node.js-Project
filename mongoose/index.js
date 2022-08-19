const boolean = require('joi/lib/types/boolean');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log("connected to MongoDB"))
    .catch(()=>console.error('could not connect to MongoDB'))

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true, maxlength: 140},
    category: {
        type: String,
        enum: ['web', 'front-end', 'back-end', 'full-stack', 'interview prep']
    },
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        }
    }
});


const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
    const course = new Course({
        name: 'Node.js',
        author: "Chenyang",
        tags: ['node', 'backend'],
        isPublished: true
    });
    try { 
        const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
    }
    
}

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
    const result = await course.save();
    console.log(result);    
}