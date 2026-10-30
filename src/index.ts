import express from "express";
import cors from "cors";
// import simpleGit from "simple-git";
import { simpleGit } from "simple-git";
import { generate } from "./utils.js";
import path from "path";
import { getAllFiles } from "./file.js";

const app = express();
app.use(cors());
app.use(express.json());


//postman
app.post("/deploy", async(req,res) => {
    const repoUrl = req.body.repoUrl;
    const id=generate();
    await simpleGit().clone(repoUrl, path.join(__dirname,`output/${id}`));


    const files = getAllFiles(path.join(__dirname, `output/${id}`));
    console.log(files);
    // put this to s3
    res.json({
        id: id
    })
})

app.listen(3000);






// app.post("/deploy", async (req, res) => {
//     try {
//         console.log("POST /deploy reached");
//         console.log("Request body:", req.body);

//         const repoUrl = req.body.repoUrl;
//         const id = generate();

//         console.log("Generated ID:", id);

//         await simpleGit().clone(repoUrl, `output/${id}`);

//         console.log("Repository cloned successfully");

//         return res.status(200).json({ id });
//     } catch (error) {
//         console.error("Deployment error:", error);
//         return res.status(500).json({
//             error: "Failed to clone repository"
//         });
//     }
// });

// app.listen(3000, () => {
//     console.log("Server running at http://localhost:3000");
// });
