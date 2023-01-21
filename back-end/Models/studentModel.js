import mongoose from 'mongoose';


const studentSchema = mongoose.Schema({
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
        type: Number,
        required: [false]
    },
},
{
    timestamps: true
})

const studentModel = mongoose.model('studentModel', studentSchema);
export default studentModel;