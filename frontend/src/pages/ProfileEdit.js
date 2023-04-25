import React, { useState, useEffect } from 'react';
import '../App.css';
import Bgimg from './Main_page.png';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../components/AuthContext';

function ProfileEdit() {
  const [user, setUser] = useState({});
  const [major, setMajor] = useState('');
  const [graduateYear, setGraduateYear] = useState('');
  const [discord, setDiscord] = useState('');
  const [rcsid, setRcsid] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const { authData } = useAuth();
  const email = authData.data.user;

  useEffect(() => {
    async function fetchUserProfile() {
      const response = await axios.get(`http://localhost:8000/api/profile/${email}`);
      setRcsid(response.data.rcsid);
      setUser(response.data);
      setMajor(response.data.major);
      setGraduateYear(response.data.graduate_year);
      setDiscord(response.data.discord);
      setDescription(response.data.description);
    }
    fetchUserProfile();
  }, [email]);

  async function handleSubmit() {
    await axios.put(`http://localhost:8000/api/profile/${email}/?major=${major}&graduate_year=${graduateYear}&discord=${discord}&description=${description}`).then((res) => console.log(res.data));
    alert("Profile updated!");
    navigate('/profile');
  };


  return (
    <ProfileContainer style={{ backgroundImage: `url(${Bgimg})` }}>
      <ProfileCard className="App">
        <ProfileHeader>Profile</ProfileHeader>
        <UserInfo>
          <p>RCSID: {rcsid}</p>
          <p>Email: {email}</p>
        </UserInfo>
        <ProfileForm>
          <FormField>
            <label>Major:&nbsp;</label>
            <input type='text' onChange={(e) => setMajor(e.target.value)} placeholder={major} />
          </FormField>
          <FormField>
            <label>Graduate Year:&nbsp;</label>
            <input type='text' onChange={(e) => setGraduateYear(e.target.value)} placeholder={graduateYear} />
          </FormField>
          <FormField>
            <label>Discord:&nbsp;</label>
            <input type='text' onChange={(e) => setDiscord(e.target.value)} placeholder={discord}/>
          </FormField>
          <FormField>
            <label>Description:&nbsp;</label>
            <input type='text' onChange={(e) => setDescription(e.target.value)} placeholder={description}/>
          </FormField>
        </ProfileForm>
        <ButtonContainer>
          <UpdateLink onClick={handleSubmit}>Save</UpdateLink>
          <HomeLink to="/">Home</HomeLink>
        </ButtonContainer>
      </ProfileCard>
    </ProfileContainer>
  );
}

export default ProfileEdit;

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

const ProfileForm = styled.div`
  background-color: #ffffff90;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;


export const HomeLink = styled(Link)`
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
