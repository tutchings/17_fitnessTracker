const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
    const id = params.id;
    console.log('id: ', id);

    let workout =  {
        day: new Date().setDate(new Date().getDate()),
        exercises: [body]
    };

    if(id !== "undefined"){
        console.log('body', body);
        Workout.update(
            { _id: id },
            { $push: {exercises: body}}
        ).then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    } else {
        Workout.create(workout)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    }



});

module.exports = router;