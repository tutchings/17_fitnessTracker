const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
    ])
    .then(dbWorkout => {
        console.log(dbWorkout);

        res.json(dbWorkout);
    })
    .catch(err => {
            res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {

    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
    ])
    .then(dbWorkout => {
        console.log(dbWorkout);

        res.json(dbWorkout);
    })
    .catch(err => {
            res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {

    let workout =  {
        day: new Date().getDate(),
        exercises: [body]
    };

    Workout.create(workout)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });

})

router.put("/api/workouts/:id", ({ body, params }, res) => {
    const id = params.id;
    console.log('id: ', id);

    let workout =  {
        day: new Date().getDate(),
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