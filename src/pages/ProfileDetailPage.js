import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../api/profiles';
import Map from '../components/Map';

const ProfileDetail = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(id);
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!profile) return <div className="text-center py-4">Profile not found</div>;

  return (
    <div className="max-w-full mx-auto p-4 ">
      <div className='md:grid md:grid-cols-2 m-5 p-10 bg-white rounded-2xl'>
      <div className='flex flex-col items-center'>
      {profile.image && <img className='rounded-full' src={profile.image} alt="Profile" style={{ width: '150px', height: '150px' }} />}
      <h2 className="text-4xl font-bold mt-4">{profile.name}</h2>
      <p className="text-lg font-regular mb-4">{profile.email}</p>
      <p className=""><strong>Bio:</strong></p> 
      <p className='text-center'>{profile.bio}</p>
      <p className="mt-2"><strong>Skills:</strong>
        </p> 
      <p className='text-center'>{profile.skills.join(', ')}</p>
      <div className="mb-4">
        <h3 className="text-xl text-center font-semibold mb-2">Address</h3>
        <p className='text-center'>{profile.address.street}, {profile.address.city}, {profile.address.state}, {profile.address.country} {profile.address.zipCode}</p>
      </div> 
      </div>
      <div className="mt-4 md:mt-0">
        <h3 className="text-xl font-semibold mb-2">Location</h3>
        <div className='shadow-inner rounded-3xl h-20'>
        <Map address={profile.address}/>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfileDetail;