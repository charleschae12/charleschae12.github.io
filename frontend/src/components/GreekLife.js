import React, {useEffect, useState} from "react";
import axios from 'axios'

function GreekLifeItem(props) {

  const [isActive, setActive] = useState('false');
  const [name, setName] = useState(props.GreekLife.name)
  const [desc, setDesc] = useState(props.GreekLife.description)
  const [size, setSize] = useState(props.GreekLife.size)
  const [status, setStatus] = useState(props.GreekLife.status)
  const [email, setEmail] = useState(props.GreekLife.email)
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState('');

  const active = () => {
    if (props.GreekLife.status) {
      return 'Active'
    } else {
      return 'Inactive'
    }
  }

  const handleAddTag = (name) => {
    const newTag = tag.trim();
    axios.put(`http://localhost:8000/api/orgs/${name}/tags/?tag=${newTag}`).then(res =>
    console.log(res.data))
  };

  const handleDeleteTag = (tag) => {
    axios.delete(`http://localhost:8000/api/orgs/${name}/tags/?tag=${tag}`).then(res =>
    console.log(res.data))
  };

  const handleToggle = () => {
    setActive(!isActive);
  };

  const deleteClubsHandler = (name) => {
    axios.delete(`http://localhost:8000/api/orgs/${name}`).then(res =>
    console.log(res.data))
  }

  const editClubsHandler = (name) => {
    axios.put(`http://localhost:8000/api/orgs/${name}/?desc=${desc}&size=${size}&status=${status}&email=${email}`).then(res =>
    console.log(res.data))
  }

  const Clicks = (name) => {
    handleToggle();
    editClubsHandler(name);

  }

  return (
    <div>
      <p>
        <div className={isActive ? "on" : "off"}>
          <div>
            <form onSubmit={() => handleAddTag(props.GreekLife.name)}>
              <input type="text" name="tag" onChange={event => setTag(event.target.value)} placeholder="Add a tag..." />
              <button type="submit">Add</button>
            </form>
          </div>
          <span style={{ fontweight: 'bold, underline' }}>{props.GreekLife.name} : </span> {props.GreekLife.description} : {props.GreekLife.size} : {active()} : {props.GreekLife.email} :
            {props.GreekLife.tags? (
              props.GreekLife.tags.map(tag => (
                <span key={tag}> {tag} <button onClick={() => handleDeleteTag(tag)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>X Tag</button> :</span>
              ))
            ):(<span></span>)}
          <button onClick={handleToggle} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>edit</button>
          <button onClick={() => deleteClubsHandler(props.GreekLife.name)} className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>x</button>
          <hr></hr>
        </div>
        <div className={isActive ? "off" : "on"}>
          <form onSubmit={() => Clicks(props.GreekLife.name)}>
            <span className="card-text">
            <p style={{ fontweight: 'bold, underline' }}>{props.GreekLife.name} </p>
            <input type="text" className="mb-2 form-control desIn" placeholder={props.GreekLife.description} onChange={event => setDesc(event.target.value)}/>
            <input type="number" className="mb-2 form-control sizeIn" placeholder={props.GreekLife.size} onChange={event => setSize(event.target.value)}/>
            <label> Active: <input type="checkbox" checked={props.GreekLife.status} onChange={event => setStatus(event.target.checked)}/></label>
            <input type="text" className="mb-2 form-control emailIn" placeholder={props.GreekLife.email} onChange={event => setEmail(event.target.value)}/>
            <button type="submit" className="btn btn-outline-danger my-2 mx-2" style={{'borderRadius':'50px',}}>confirm</button>
            </span>
          </form>
        </div>
      </p>
    </div>
  )
}

export default GreekLifeItem