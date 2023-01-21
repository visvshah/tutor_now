import mongoose from 'mongoose';


const tutorSchema = mongoose.Schema({
    fName: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lName: {
        type: String,
        required: [true, 'Please add a last name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    number: {
        type: String,
        required: [true, 'Please add an phone'],
        unique: true
    },
    venmo: {
        type: String,
        required: [true, 'Please add an Venmo'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    classYear: {
        type: Number,
        required: [false]
    },
    classes : {
        type: [String],
        required: [false]
    },
    gpa : {
        type: Number,
        required: [false]
    },
    about: {
        type: String,
        required: [false],
    },
},
{
    timestamps: true
})

const tutorModel = mongoose.model('tutorModel', tutorSchema);
export default tutorModel;