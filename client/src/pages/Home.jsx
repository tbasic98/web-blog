import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

const Home = () => {
    //The React useState Hook allows us to track state in a function component
    const [posts, setPosts] = useState([]);

    const cat = useLocation().search;

     //The useEffect Hook allows you to perform side effects in your components.
    //Some examples of side effects are: fetching data, directly updating the DOM, and timers.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/posts${cat}`);
                console.log(res);
                setPosts(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchData()
    },[cat]);

    //samo da mi izbaci one html tegove nakon update-a 
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    }

  return (
    <div className="home">
        <div className="posts">
            {posts.map((post) => {
                return (
                    <div className="post" key={post.id}>
                    <div className="img">
                        <img src={`../server/uploads/${post.img}`} alt="" />
                    </div>
                    <div className="content">
                        <Link className='link' to={`/post/${post.id}`}>
                            <h1>{post.title}</h1>
                        </Link>
                        <p>{getText(post.desc)}</p>
                        <button>Read more</button>
                    </div>
                </div>
                )
            })}
        </div>
    </div>
  )
}

export default Home


