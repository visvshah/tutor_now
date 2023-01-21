import mongoose from 'mongoose';
import tutorSchema from './tutorModel';

const tutorAvailSchema = mongoose.Schema({
    tutorId: {
        type: String,
        required: [true, 'Please have a tutorId']
    },
},
{
    timestamps: true
})

const tutorAvailModel = mongoose.model('tutorAvail', tutorAvailSchema);
export default tutorAvailModel;