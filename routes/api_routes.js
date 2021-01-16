// npm and file requirements
const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
const Workout = require("../models/workout.js");

// get route with aggregate function to sum total exercise duration and add new total duration field to each exercise in database
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
    ])
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
            res.status(400).json(err);
    });
});

// get route with aggregate function to sum total exercise duration and add new total duration field to each exercise in database
router.get("/api/workouts/range", (req, res) => {

    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
    ])
    .then(dbWorkout => {
        dbWorkout = dbWorkout.slice(Math.max(dbWorkout.length - 7, 0));
        console.log(dbWorkout);
        res.json(dbWorkout);
    })
    .catch(err => {
            res.status(400).json(err);
    });
});

// post route to create new workout
router.post("/api/workouts", (req, res) => {

    Workout.create({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });

})

// put route to add exercise to existing workout
router.put("/api/workouts/:id", ({ body, params }, res) => {

    Workout.findByIdAndUpdate(
        params.id,
        { $push: {exercises: body}},
        {new: true}
    ).then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });

});

module.exports = router;