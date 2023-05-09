import { db } from "../db.js"
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM  posts WHERE category = ?" : "SELECT * FROM  posts"; 

    db.query(q, [req.query.cat], (err, data) => {
        if(err) return req.status(500).send(err);
        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    const q = "SELECT p.id, u.username, p.title, p.desc, p.img as `postImg`, u.img as `userImg`, p.category, p.date FROM users u JOIN posts p ON u.id = p.user_id WHERE p.id = ?";
    
    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.status(500).send(err);
        return res.status(200).json(data[0]);
    })
}

export const addPost = (req, res) => {
    const token =  req.cookies.access_token;

    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid");

        const q = "INSERT INTO posts(`title`, `desc`, `img`, `category`, `date`, `user_id`) VALUES(?)"
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.category,
            req.body.date,
            userInfo.id,
        ];

        console.log(values);

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.json("Post has been created!");
        });

    })
}

export const deletePost = (req, res) => {
    //console.log(req)
    const token =  req.cookies.access_token;
    
    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid");
        const postId = req.params.id;
        const q = "DELETE from posts WHERE id = ? AND user_id = ?";

        db.query(q, [postId, userInfo.id ], (err, data) =>{
            if(err) return res.status(403).json("You can delete only your posts!")
            return res.status(200).json("Post has been deleted");
        });
    })
}

export const updatePost = (req, res) => {
    const token =  req.cookies.access_token;

    if(!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid");

        const postId = req.params.id;
        const q = "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `category` = ? WHERE `id` = ? AND `user_id` = ?"
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ];

        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.json("Post has been updated!");
        });

    })
}