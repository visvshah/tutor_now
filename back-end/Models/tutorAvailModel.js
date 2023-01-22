import mongoose from 'mongoose';


export const tutorAvailSchema = mongoose.Schema({
    tutorId: {
        type: String,
        required: [true, 'Please have a tutorId']
    },
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
    
    school: {
        type: String,
        required: [true]
    },
    classYear: {
        type: String,
        required: [false]
    },
    courses : {
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
    rating: {
        type: Number,
        default: 0.0,
    },
    ratingUsers: {
        type: Number,
        default: 0,
    },

},
{
    timestamps: true
})

const tutorAvailModel = mongoose.model('tutorAvail', tutorAvailSchema);
export default tutorAvailModel;