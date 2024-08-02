const contact= require("../models/contact-modal")

const contactForm = async(req, res, next)=>{
    try{
        const response= req.body;
        await contact.create(response);
        return res.status(200).json({ message: "message sent successfully"})
    }catch(error){
        next({
            status: 500,
            message: "Internal server error, message is not delivered",
            extraDetails: error.message
        });
    }
}

module.exports= contactForm;