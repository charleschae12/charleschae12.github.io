import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventsView from '../components/EventsView';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";

function Manage_Events() {

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortMethod, setSortMethod] = useState('name');
  const [eventList, setEventList] = useState([])
  const [selectedTag, setSelectedTag] = useState('');
  const [tagList, setTagList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState('')
  const [clubName, setClubName] = useState('')
  const [desc, setDesc] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState(null)

  function refreshPage() {
    window.location.reload();
  } 

  // Read all clubs
  useEffect(() => {
    axios.get('http://localhost:8000/api/events')
      .then(res => {
        if (selectedTag !== '') {
          setFilteredData(res.data.filter(event => event.tags.includes(selectedTag)));
        } else {
          setFilteredData(res.data);
        }
        const sortedData = filteredData.sort((a, b) => {
          if (sortMethod === 'nameAsc') {
            if (sortOrder === 'asc') {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          } else if (sortMethod === 'nameDesc') {
              if (sortOrder === 'asc') {
                return b.name.localeCompare(a.name);
              } else {
                return a.name.localeCompare(b.name);
            }
          } else if (sortMethod === 'sizeAsc') {
            if (sortOrder === 'asc') {
              return a.size - b.size || a.name.localeCompare(b.name);
            } else {
              return b.size - a.size || b.name.localeCompare(a.name);
            }
          } else if (sortMethod === 'sizeDesc') {
            if (sortOrder === 'asc') {
              return b.size - a.size || a.name.localeCompare(b.name);
            } else {
              return a.size - b.size || b.name.localeCompare(a.name);
            }
          } else if (sortMethod === 'Active') {
            if (sortOrder === 'asc') {
              return 1 || a.name.localeCompare(b.name);
            } else {
              return -1 || b.name.localeCompare(a.name);
            }
          } else if (sortMethod === 'Inactive') {
            if (sortOrder === 'asc') {
              return -1 || a.name.localeCompare(b.name);
            } else {
              return 1 || b.name.localeCompare(a.name);
            }
          }
        });
        const uniqueItems = [];
        const tags = res.data.flatMap((obj) => obj.tags);
        tags.map((tag) => {
          if (uniqueItems.indexOf(tag) === -1) {
            uniqueItems.push(tag);
          }
        });
        setTagList(uniqueItems);
        setEventList(sortedData);
      })
      .catch(error => console.log(error));
  }, [sortOrder, sortMethod, selectedTag, filteredData, refreshPage]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = event.target.result;
      setImage(image);
    };

    reader.readAsDataURL(file);
  };

  // Post a club
  const addEventsHandler = () => {
    axios.post('http://localhost:8000/api/events', { 'clubName': clubName, 'name': name, 'description': desc, 'date': moment(date).tz("America/New_York").format("YYYY-MM-DDTHH:mm:ssZ"), 'image': image})
    .then(res => console.log(res))
  }

  return (
    <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{"width":"800px", "paddingTop":"120px"}}>
    <h1 className="card text-white bg-primary mb-1" styleName="max-width: 20rem;">Events</h1>
    <div className="card-body">
    <h5 className="card text-white bg-dark mb-3">Add an Event</h5>
    <form onSubmit={addEventsHandler}>
      <span className="card-text">
        <input type="text" className="mb-2 form-control nameIn" onChange={event => setName(event.target.value)} placeholder='Name'/>
        <input type="text" className="mb-2 form-control nameIn" onChange={event => setClubName(event.target.value)} placeholder='Club Name'/>
        <input type="text" className="mb-2 form-control desIn" onChange={event => setDesc(event.target.value)} placeholder='Description'/>
        <DatePicker selected={date} onChange={(date) => setDate(date)} showTimeSelect dateFormat="yyyy/MM/dd HH:mm:ss"/>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button className="btn btn-outline-primary mx-2 mb-3" style={{'borderRadius':'50px', "font-weight":"bold"}}>Add Event</button>
      </span>
    </form>

      <h5 className="card text-white bg-dark mb-3">Events:</h5>
      <span>
        <select value={sortMethod} onChange={(event) => setSortMethod(event.target.value)}>
          <option value="nameAsc">Sort by name asc</option>
          <option value="nameDesc">Sort by name desc</option>
          <option value="sizeAsc">Sort by size asc</option>
          <option value="sizeDesc">Sort by size desc</option>
          <option value="Active">Sort by Active</option>
          <option value="Inactive">Sort by Inactive</option>
        </select>
      </span>
      <div>
        <EventsView eventList={eventList} />
      </div>
    </div>
    </div>
  
  );

}

export default Manage_Events;