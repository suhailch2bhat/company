const express = require("express");
const router = express.Router();
const users = require("../models/base_concept");
const label = require("../models/base_label")

router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { id, concept_id, concept_name, concept_type, period_type } = req.body;

    if (!id,!concept_id || !concept_name || !concept_type || !period_type) {
        res.status(422).json("plz fill the data");
    }

    try {
        const adduser = new users({
            id, concept_id, concept_name, concept_type, period_type
        });

        await adduser.save();
        res.status(201).json(adduser);
        console.log(adduser);
        // }

    } catch (error) {
        res.status(422).json(error);
    }
})


// get userdata

router.get("/getdata", async (req, res) => {
    try {
        const userdata = await users.find();

        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

router.get("/getuser/:id", async (req, res) => {
    try {
        console.log(req.params);
        var { id } = req.params;
        console.log(id)
        const userindividual = await users.find({ _id: id });
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})
router.get("/getlabel", async (req, res) => {
    try {
        // console.log(req.params);
        // var {id} = req.params;
        // console.log(id)
        const userindividual = await label.find();
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})
router.get("/getlabel/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletuse = await label.find({ id: id })
        console.log(deletuse);
        res.status(201).json(deletuse);

    } catch (error) {
        res.status(422).json(error);
    }
})


// update user data

router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updateduser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });
        // const updateduser = await users.updateMany(id,{$set:req.body}
        // });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletuser = await users.findByIdAndDelete({ _id: id })
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})




module.exports = router;










