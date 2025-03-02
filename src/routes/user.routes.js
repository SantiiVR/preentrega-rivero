import express from "express"
import User from "../models/user.models.js"

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users=await User.find();
    res.status(200).send({status:"succes", payload:users})
  } catch (error) {
    res.status(500).send({status:"error", message:"error al recuperar los datos de los usuarios"})
  }
})

userRouter.post("/", async (req,res) => {
    try {
        const {first_name, last_name, email} = req.body
        if(!first_name, !last_name, !email) 
        return res.status(400).send({status: "error", message:"error al carar los datos"});

        const response = await User.insertOne({first_name, last_name, email})
        res.status(201).send({status:"success", payload: response })
    } catch (error) {
        res.status(500).send({status:"error"})
    }
})

    userRouter.put("/:id", async (req,res) => {
        try {
            const {id}=req.params
            const userUpdates=req.body

            const response = await User.updateOne({_id:uid}, userUpdates)
            res.status(200).send({status:"success", payload: response})
        } catch (error) {
            
        }
    })

export default userRouter