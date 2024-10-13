import React from 'react';
import ProfileList from '../components/ProfileList';

const ProfileListPage = () => {
  return (
    <div className='md:mx-20 mx-6 my-5 flex flex-col items-center'>
      <h1 className='text-3xl font-semibold md:text-4xl mb-8'>Profiles</h1>
      <ProfileList />
    </div>
  );
};

export default ProfileListPage;