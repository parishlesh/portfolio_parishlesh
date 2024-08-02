const Service = require("../models/service-modal")

const services = async(req, res)=>{
    try {
        const response = await Service.find();
        if(!response){
            res.this.status(404).json({msg: "No services found"})
            return
        }
        res.status(200).json({response});

    } catch (error) {
        console.log(`services ${error}`)
    }
}

module.exports = services;