import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfiles } from '../api/profiles';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const data = await getProfiles();
      setProfiles(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch profiles');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ul className='w-full grid grid-cols-2 md:grid-cols-4 gap-4'>
        {profiles.map((profile) => (
          <li key={profile._id} >
            <Link to={`/profile/${profile._id}`}>
            <div className='border p-4 shadow-lg md:hover:shadow-violet-300 rounded-xl h-64 text-wrap text-sm overflow-hidden flex flex-col justify-center items-center'>
                <div>
                {profile.image && <img className='rounded-full mb-1' src={profile.image} alt="Profile" style={{ width: '75px', height: '75px' }} />}
                </div>
                <h1 className='text-xl font-semibold'>
                    {profile.name}
                </h1>
                
                <h1>
                    {profile.occupation}
                </h1>
                <h1>
                    {profile.address.city}
                </h1>
                <h1 className='text-wrap mt-3 text-center'>
                    {profile.bio}
                </h1>
            </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;