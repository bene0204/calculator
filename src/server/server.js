import express from "express"
import fs from "fs/promises"
import cors from "cors"

const app = new express();

app.use(express.json())
app.use(cors())

app.post("/save", async (req,res) => {
    try{
        const { number } = req.body;
        if(typeof number !== "number"){
            return res.status(400).send("Must be a valid number.")
        }
        await fs.writeFile("memory.txt", number.toString())


         return res.status(201).send()
    } catch (error){
        return res.status(500).send(error.message);
    }
})

app.get("/read", async (req,res) =>{
    try {
        const number = await fs.readFile("memory.txt");
        res.send({
            number: number.toString()
        })
    } catch (error){
        res.status(500).send(error.message);
    }

})

app.listen(5000, () => {
    console.log("App running on port 5000.")
})
