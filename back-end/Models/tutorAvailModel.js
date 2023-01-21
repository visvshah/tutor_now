import mongoose from 'mongoose';


export const tutorAvailSchema = mongoose.Schema({
    tutorId: {
        type: String,
        required: [true, 'Please have a tutorId']
    },
    courses: {
        //array of strings
        type: [String],
        required: [true, 'Please have a course']
    }
},
{
    timestamps: true
})

const tutorAvailModel = mongoose.model('tutorAvail', tutorAvailSchema);
export default tutorAvailModel;