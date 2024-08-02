
const User = require("../models/user-models")
const Contact = require("../models/contact-modal")
const Service = require("../models/service-modal")

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 })
        if (!users || users.length === 0) {
           return res.status(404).json({ message: "no users found" })
        }
       return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const getAllContacts = async(req, res, next)=>{
    try {
        const contacts = await Contact.find()
        if(!contacts|| contacts.length===0 ){
           return res.status(404).json({
                message:"contacts not found"
            })

        }
      return res.status(200).json(contacts)
    } catch (error) {
        next(error)
    }
}

const getAllServices = async(req, res, next)=>{
    try {
        const services = await Service.find()
        if(!services || services.length===0 ){
            return res.status(404).json({
                message: "services not found"
            })
        }
        return res.status(200).json(services)
    } catch (error) {
        next(error)
    }
}

const deleteUserById= async(req, res, next)=>{
    try {
        const id = req.params.id
        await User.deleteOne({_id: id})
        return res.status(200).json({message: "User Deleted Successfully"})
    } catch (error) {
        next(error)
    }
}

const getUserById= async(req, res, next)=>{
    try {
        const id = req.params.id
        const data = await User.findOne({_id: id}, {password:0})
        return res.status(200).json(data)
        console.log("data from getuserbyid:",id)
    } catch (error) {
        next(error)
    }
}

const updateUserById=async(req, res, next)=>{
    try {
        const id = req.params.id
        const updatedUserData = req.body

        const updatedData = await User.updateOne({_id: id},{
            $set: updatedUserData
        })
        return res.status(200).json(updatedData)
    } catch (error) {
        next(error)
    }
}

const deleteContactById= async(req, res, next)=>{
    try {
        const id = req.params.id
        await Contact.deleteOne({_id: id})
        return res.status(200).json({message: "contact Deleted Successfully"})
    } catch (error) {
        next(error)
    }
}

module.exports = {getAllUsers, getAllContacts, getAllServices, deleteUserById, getUserById,updateUserById, deleteContactById }