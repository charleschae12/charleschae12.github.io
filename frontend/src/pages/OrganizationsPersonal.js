import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import logo from '../components/Logo.png';
import classes from './ClubPersonal.module.css';
import { AiOutlineMail, AiFillCheckCircle } from 'react-icons/ai';
import { BsFillTagFill } from 'react-icons/bs';
import { RiQuillPenFill, RiCalendarEventFill } from 'react-icons/ri';
import { FaUserFriends } from 'react-icons/fa';

function OrganizationsPersonal() {
  const [club, setClub] = useState({});
  const [events, setEvents] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orgs/${name}`);
        setClub(response.data);
        const response2 = await axios.get(`http://localhost:8000/api/events/${name}?clubName=${name}`);
        setEvents(response2.data);
      } catch (error) {
        console.error('Error fetching organizations data:', error);
      }
    };

    fetchClubData();
  }, [name]);

  return (
    <div className={classes.container}>
      <img className={classes.logo} src={club.image ? club.image : logo} alt="Club logo" />
      <h2 className={classes.clubName} style={{ color: club.status ? 'blue' : 'red' }}>
        {club.name}
      </h2>
      <div className={`${classes.subContainer} ${classes.status}`}>
        <div>
          <h3 className={classes.clubInfo}>
            <AiFillCheckCircle />
            Active
          </h3>
          <p>{club.status ? 'Yes' : 'No'}</p>
        </div>
        <div className={classes.members}>
          <h3 className={classes.clubInfo}>
            <FaUserFriends />
            Members
          </h3>
          <p>{club.size}</p>
        </div>
      </div>
      <div className={`${classes.subContainer} ${classes.description}`} style={{
        width: '100%',
      }}>
        <h3 className={classes.clubInfo}>
          <RiQuillPenFill />
          Description
        </h3>
        <p>{club.description}</p>
      </div>
      <div className={`${classes.subContainer} ${classes.tags}`}>
        <h3 className={classes.clubInfo}>
          <BsFillTagFill />
          Tags
        </h3>
        <p>{club.tags && club.tags.join(', ')}</p>
      </div>
      <div className={`${classes.subContainer} ${classes.email}`}>
        <h3 className={classes.clubInfo}>
          <AiOutlineMail />
          Email
        </h3>
        <p>{club.email}</p>
      </div>
      <div className={`${classes.subContainer} ${classes.events}`}>
        <h3 className={classes.clubInfo}>
          <RiCalendarEventFill />
          Events
        </h3>
        {events.map((event) => (
          <p key={event.id} className={classes.event}>{event.name}</p>
        ))}
      </div>
    </div>
  );
}

export default OrganizationsPersonal;
