import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express'
import cors from 'cors'
import { Configuration, OpenAIApi } from "openai"

const PORT= process.env.PORT || 5000;
const app = express()
app.use(cors())
app.use(express.json())


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

app.post("/api/askChatGpt",async(req,res)=>{
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body.prompt,
            temperature: 0.5,
            max_tokens: 3000,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
          });
        res.status(200).json({data:(response.data.choices[0].text).trim()})
    } catch (error) {
        console.log("error",error)
        res.status(400).json({"error":"Something went wrong"})
    }
})






app.listen(PORT,()=>{
     console.log(`App is listening on port ${PORT}`)
})