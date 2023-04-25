import React, {useEffect, useState} from "react";
import axios from 'axios'

function ClubsItem(props) {

  const [isActive, setActive] = useState('false');
  const [name, setName] = useState(props.Clubs.name)
  const [desc, setDesc] = useState(props.Clubs.description)
  const [size, setSize] = useState(props.Clubs.size)
  const [status, setStatus] = useState(props.Clubs.status)
  const [email, setEmail] = useState(props.Clubs.email)
  const [image, setImage] = useState(props.Clubs.image)
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');

  const active = () => {
    if (props.Clubs.status) {
      return 'Active'
    } else {
      return 'Inactive'
    }
  }

  useEffect(()=>{
    setStatus(props.Clubs.status);
  },[])

  const handleAddTag = (name) => {
    const newTag = tag.trim();
    axios.put(`http://localhost:8000/api/club/${name}/tags/?tag=${newTag}`).then(res =>
    console.log(res.data))
  };

  const handleDeleteTag = (tag) => {
    axios.delete(`http://localhost:8000/api/club/${name}/tags/?tag=${tag}`).then(res =>
    console.log(res.data))
  };

  const handleToggle = () => {
    setActive(!isActive);
  };

  const deleteClubsHandler = (name) => {
    axios.delete(`http://localhost:8000/api/clubs/${name}`).then(res =>
    console.log(res.data))
  }

  const Clicks = (name) => {
    handleToggle();
    editClubsHandler(name);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = event.target.result;
      setImage(image);
    };

    reader.readAsDataURL(file);
  };

  const editClubsHandler = (name) => {
    axios.put(`http://localhost:8000/api/clubs/${name}/?desc=${desc}&size=${size}&status=${status}&email=${email}&image=${image}`).then(res =>
    console.log(res.data))
  }

  return (
    <div>
      <p>
        <div className={isActive ? "on" : "off"}>
          <div>
            <form onSubmit={() => handleAddTag(props.Clubs.name)}>
              <input type="text" name="tag" onChange={event => setTag(event.target.value)} placeholder="Add a tag..." />
              <button type="submit">Add</button>
            </form>
          </div>
          <span style={{ fontweight: 'bold, underline' }}>{props.Clubs.name} : </span> {props.Clubs.description} : {props.Clubs.size} : {active()} : {props.Clubs.email} :
            {props.Clubs.tags? (
              props.Clubs.tags.map(tag => (
                <span key={tag}> {tag} <button onClick={() => handleDeleteTag(tag)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>X Tag</button> :</span>
              ))
            ):(<span></span>)}
          <button onClick={handleToggle} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>edit</button>
          <button onClick={() => deleteClubsHandler(props.Clubs.name)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>x</button>
          <hr></hr>
        </div>
        <div className={isActive ? "off" : "on"}>
          <form onSubmit={() => Clicks(props.Clubs.name)}>
            <span className="card-text">
            <p style={{ fontweight: 'bold, underline' }}>{props.Clubs.name} </p>
            <input type="text" className="mb-2 form-control desIn" placeholder={props.Clubs.description} onChange={event => setDesc(event.target.value)}/>
            <input type="number" className="mb-2 form-control sizeIn" placeholder={props.Clubs.size} onChange={event => setSize(event.target.value)}/>
            <label> Active: <input type="checkbox" checked={status} onChange={event => setStatus(event.target.checked)}/></label>
            <input type="text" className="mb-2 form-control emailIn" placeholder={props.Clubs.email} onChange={event => setEmail(event.target.value)}/>
            <input type="file" accept="image/*" onChange={handleImageChange}/>
            <button type="submit" className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>confirm</button>
            </span>
          </form>
        </div>
      </p>
    </div>
  )
}

export default ClubsItem