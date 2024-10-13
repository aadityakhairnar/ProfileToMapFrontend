import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Map from './Map';
const ProfileDetail = () => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    const res = await axios.get(`http://localhost:5000/api/profiles/${id}`);
    setProfile(res.data);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>Email: {profile.email}</p>
      <div className='flex flex-row'>
      <div className='col-span-1'>
      <p>Bio: {profile.bio}</p>
      <h2>Skills</h2>
      <ul>
        {profile.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
        ))}
      </ul>
      <h2>Address</h2>
      <p>{profile.address.street}, {profile.address.city}, {profile.address.state}, {profile.address.country} {profile.address.zipCode}</p>
      </div>
      <div className='col-span-1'>
      <Map address={profile.address}/>
      </div>
      </div>
    </div>
  );
};

export default ProfileDetail;