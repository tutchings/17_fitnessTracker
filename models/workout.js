const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String
    },

    name: {
        type: String,
        trim: true,
        required: "Enter Name of Exercise"
    },

    duration: {
        type: Number,
        required: "Enter a Duration for Exercise"
    },

    distance: {
        type: Number
    },

    weight: {
        type: Number
    },

    reps: {
        type: Number
    },

    sets: {
        type: Number
    }
});

const WorkoutSchema = new Schema({
    day: {type: Date, default: Date.now},
    exercises: [ExerciseSchema]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
