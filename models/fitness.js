const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
    },

    name: {
        type: String,
        trim: true,
        required: "Name of Exercise is Required"
    },

    duration: {
        type: Number,
        required: "Enter a Duration for Exercise"
    },

    weight: {
        type: Number,
        required: "Enter a Weight for Exercise"
    },

    reps: {
        type: Number,
        required: "Enter Number of Reps for Exercise"
    },

    sets: {
        type: Number,
        required: "Enter Number of Sets for Exercise"
    }
});

const FitnessSchema = new Schema({
    day: {type: Date, default: Date.now},

    exercises: [ExerciseSchema]
});

const Fitness = mongoose.model("Fitness", FitnessSchema);

module.exports = Fitness;
