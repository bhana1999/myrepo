const usermodel = require("../Models/usermodel")
//---------------------------------creating user-----------------------------------------
const createuser = async function (req, res) {

    try {

        let dataa = req.body;
        let newdata = await usermodel.create(dataa);

        res.status(201).send({ status: true, data: newdata })
    }
    catch (error) {
        res.status(500).send({ msg: error.message })
    }
}

//-------------------------getting user-----------------------------------------------------

const getuser = async function (req, res) {



    try {
        const { location, verified, name } = req.query
        const query = {
            // name: {
            //     $regex: /^[a-zA-Z\s]+$/
            //     , $options: 'i'
            // },
            // location: { $in: [Banglore, Mathura] },
            verified: true
        };





        const filtereduser = await usermodel.find(query).sort({ name: 1, location: 1 })
        if (filtereduser) {

            return res.status(200).send({ status: true, data: filtereduser })

        } else res.status(404).send("data not found")

    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}


module.exports = { createuser, getuser }; // exporting functions