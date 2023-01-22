import mongoose from 'mongoose';


export const tutorSchema = mongoose.Schema({
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
    school: {
        type: String,
        required: [true]
    },
    classYear: {
        type: String,
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
    studentId: {
        type: String,
        default: "",
    },
    courseToTutor: {
        type: String,
        default: "",
    },
    rating: {
        type: Number,
        default: 0.0,
    },
    ratingUsers: {
        type: Number,
        default: 0,
    },
    setAvailability: {
        type: Boolean,
        default: false,
    }
},

{
    timestamps: true
})

const tutorModel = mongoose.model('tutorModel', tutorSchema);
export default tutorModel;