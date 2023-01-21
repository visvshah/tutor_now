import mongoose from 'mongoose';


const requestSchema = mongoose.Schema({
    fName: {
        type: String,
        required: [true, 'Please have a first name']
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
        type: Number,
        required: [false]
    },
    course: {
        type: String,
        required: [true, 'Please add a course']
    },
    tutorId:  {
        type: String,
        required: [false]
    },
    timeStamp: {
        type: Date,
        default: new Date(),
    }
},
{
    timestamps: true
})

const requestModel = mongoose.model('requestModel', requestSchema);
export default requestModel;