import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import GreekLifeView from '../components/GreekLifeView';


function Search_Organizations() {

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortMethod, setSortMethod] = useState('name');
  const [greekLifeList, setgreekLifeList] = useState([])
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [size, setSize] = useState(0)
  const [status, setStatus] = useState(false)
  const [email, setEmail] = useState('')
  const [selectedTag, setSelectedTag] = useState('');
  const [tagList, setTagList] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  function refreshPage() {
    window.location.reload();
  } 

  // Read all clubss
  useEffect(() => {
    axios.get('http://localhost:8000/api/orgs')
      .then(res => {
        if (selectedTag !== '') {
          setFilteredData(res.data.filter(club => club.tags.includes(selectedTag)));
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
        setgreekLifeList(sortedData);
      })
      .catch(error => console.log(error));
  }, [sortOrder, sortMethod, selectedTag, filteredData, refreshPage]);
  
  // Post a club
  const addClubsHandler = () => {
    axios.post('http://localhost:8000/api/orgs', { 'name': name, 'description': desc, 'size': size, 'status': status, 'email': email, 'tags': []})
    .then(res => console.log(res))
  }

  return (
    <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{"width":"800px", "paddingTop":"120px"}}>
    <h1 className="card text-white bg-primary mb-1" styleName="max-width: 20rem;">Organizations</h1>
    <div className="card-body">
    <h5 className="card text-white bg-dark mb-3">Add a Orginization</h5>
    <form onSubmit={addClubsHandler}>
      <span className="card-text">
        <input type="text" className="mb-2 form-control nameIn" onChange={event => setName(event.target.value)} placeholder='Name'/>
        <input type="text" className="mb-2 form-control desIn" onChange={event => setDesc(event.target.value)} placeholder='Description'/>
        <input type="number" className="mb-2 form-control sizeIn" onChange={event => setSize(event.target.value)} placeholder='0'/>
        <label> Active: <input type="checkbox" onChange={event => setStatus(event.target.checked)}/></label>
        <input type="text" className="mb-2 form-control emailIn" onChange={event => setEmail(event.target.value)} placeholder='Email'/>
        <button className="btn btn-outline-primary mx-2 mb-3" style={{'borderRadius':'50px', "font-weight":"bold"}}>Add Orginization</button>
      </span>
    </form>

      <h5 className="card text-white bg-dark mb-3">Clubs:</h5>
      <span>
        <select value={sortMethod} onChange={(event) => setSortMethod(event.target.value)}>
          <option value="nameAsc">Sort by name asc</option>
          <option value="nameDesc">Sort by name desc</option>
          <option value="sizeAsc">Sort by size asc</option>
          <option value="sizeDesc">Sort by size desc</option>
          <option value="Active">Sort by Active</option>
          <option value="Inactive">Sort by Inactive</option>
        </select>
        <select value={selectedTag} onChange={(event) => setSelectedTag(event.target.value)}>
          <option value="">All tags</option>
          {tagList.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </span>
      <div>
        <GreekLifeView greekLifeList={greekLifeList} />
      </div>
    </div>
    </div>
  );
}

export default Search_Organizations;
