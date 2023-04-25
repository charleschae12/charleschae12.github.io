import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Bgimg from './Main_page.png';
import { HomeLink } from './ProfileEdit';
import { useAuth } from '../components/AuthContext';
import styled from 'styled-components';

function Profile() {
  const [user, setUser] = useState({});
  const [rcsid, setRcsid] = useState('');
  
  const { authData } = useAuth();
  const email = authData.data.user;

  useEffect(() => {
    async function fetchUserProfile() {
      const response = await axios.get(`http://localhost:8000/api/profile/${email}`);
      setRcsid(response.data.rcsid);
      setUser(response.data);
    }
    fetchUserProfile();
  }, [email]);

  return (
    <ProfileContainer style={{ backgroundImage: `url(${Bgimg})` }}>
      <ProfileCard className="App">
        <ProfileHeader>Profile</ProfileHeader>
        <UserInfo>
          <p>RCSID: {rcsid}</p>
          <p>Email: {email}</p>
          <p>Major: {user.major}</p>
          <p>Graduate Year: {user.graduate_year}</p>
          <p>Discord: {user.discord}</p>
          <p>Description: {user.description}</p>
        </UserInfo>
        <ButtonContainer>
          <UpdateLink to="/profile-edit">Update</UpdateLink>
          <HomeLink to="/">Home</HomeLink>
        </ButtonContainer>
      </ProfileCard>
    </ProfileContainer>
  );
}

export default Profile;

// Styled components
const ProfileContainer = styled.div`
  background-repeat: repeat;
  background-position: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileCard = styled.div`
  width: 500px;
  background-color: #2066ED;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ProfileHeader = styled.h1`
  color: white;
  font-size: 45px;
  margin: 0;
  text-align: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;


const UpdateLink = styled(Link)`
  color: #f0f0f0;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  background-color: #202060;
  width: 100px;
  justify-content: center;
  border-radius: 15px;
  font-size: 20px;
  transition: background-color 0.3s;
  &:hover {
    background-color: cyan;
    color: #202060;
  }
  &.active {
    color: #000000;
  }
  @media screen and (max-width: 500px) {
    font-size: 16px;
    width: 80px;
    height: 40px;
    border-radius: 10px;
  }
`;
