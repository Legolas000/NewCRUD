import mongoose from 'mongoose';

var courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    title: String,
    watchHref: String,
    authorId: String,
    length: String,
    category: String,
    created: { 
        type: Date,
        default: Date.now
    }
});

var CourseDB = mongoose.model('course', courseSchema);

export default CourseDB;