import React, { useState } from 'react'; //https://www.w3schools.com/react/default.asp
import ReactQuill from 'react-quill';  //https://www.npmjs.com/package/react-quill
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'; //https://www.npmjs.com/package/axios
import { useLocation } from 'react-router-dom'; //https://reactrouter.com/en/main
import moment from 'moment'; //https://www.npmjs.com/package/moment

//Frontend za dodavanej i update posta na blogu :)
const WritePost = () => {

  //state koji smo poslali sa SinglePost.jsx prilikom pritiska na edit, ukoliko imamo ovaj state radimo update, u suprotnom je add new post
  const state = useLocation().state;

  //Ako je state poslan onda postavljamo vrijednosti inputa na vrijednosti posta kojeg updateamo
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || "");
  const [file,setFile] = useState(null);
  const [cat, setCat] = useState(state?.category || "");

  const upload = async () => {
    try {
      //The FormData interface provides a way to construct a set of key/value pairs representing form fields and their values, which can be sent using the fetch() or XMLHttpRequest.send() method.
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8800/api/uploads", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  //funkcija koju pozivamo kada stisnemo publish, ovisno je li update ili add radimo axios upit na naš api endpoint koji smo def u serveru
  const handleSubmit = async e => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state ? await axios.put("http://localhost:8800/api/posts/" + state.id, {
        title: title, 
        desc:value,
        category: cat,
        img:file? imgUrl : ""
      },{
        withCredentials : true
      }) : await axios.post("http://localhost:8800/api/posts/", {
        title: title, 
        desc:value,
        category: cat,
        img:file? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      },{
        withCredentials : true
      });
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='title' onChange={e => setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input type="file" onChange={e => setFile(e.target.files[0])}/>
          <label className='file' htmlFor="file">Upload image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>  
        <div className="item">
          <h1>Category</h1>
          <div className='cat'>
              <input type="radio" checked={cat === "art"} name="cat" value="art" id="art"onChange={e => setCat(e.target.value)}/>
              <label htmlFor="art">Art</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "science"} name="cat" value="science" id="science" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="art">Science</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "tehnology"} name="cat" value="tehnology" id="tehnology" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="art">Tehnology</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "desing"} name="cat" value="desing" id="desing" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="art">Design</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="food">Food</label>
          </div>
        </div> 
      </div>  
    </div>
  )
}

export default WritePost