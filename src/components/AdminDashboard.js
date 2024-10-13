import React, { useState, useEffect } from 'react';
import { getProfiles, createProfile, deleteProfile, updateProfile } from '../api/profiles';

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    occupation: '',
    age: '',
    description: '',
    address: { street: '', city: '', state: '', country: '', zipCode: '' },
    bio: '',
    skills: '',
    image: '', // To hold Base64 image data
  });
  const [editingId, setEditingId] = useState(null); // Track if editing

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const data = await getProfiles();
    setProfiles(data);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result, // Set the Base64 image data
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        skills: formData.skills.split(',').map((skill) => skill.trim()),
      };

      if (editingId) {
        await updateProfile(editingId, data);
        setEditingId(null); // Reset after update
      } else {
        await createProfile(data);
      }

      fetchProfiles(); // Refresh the list
      setFormData({
        name: '',
        email: '',
        phone: '',
        occupation: '',
        age: '',
        description: '',
        address: { street: '', city: '', state: '', country: '', zipCode: '' },
        bio: '',
        skills: '',
        image: '', // Reset image
      });
    } catch (err) {
      console.error('Error submitting profile:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProfile(id);
      fetchProfiles();
    } catch (err) {
      console.error('Error deleting profile:', err);
    }
  };

  const handleEdit = (profile) => {
    setEditingId(profile._id);
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      occupation: profile.occupation,
      age: profile.age,
      description: profile.description,
      address: profile.address || { street: '', city: '', state: '', country: '', zipCode: '' },
      bio: profile.bio,
      skills: profile.skills.join(', '),
      image: profile.image || '', // Load the image if present
    });
  };

  return (
    <div className='flex flex-col gap-10'>
    <div className='border p-4 bg-violet-100 rounded-2xl'>
      <h2 className='text-center text-2xl mb-4'>{editingId ? 'Edit Profile' : 'Create Profile'}</h2>
      <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
        <input className='p-2 rounded-lg shadow-md hover:shadow-violet-300 bg-white' type="file" name="image" onChange={handleImageUpload} /> {/* Image upload input */}
        <input className='p-2 rounded-lg shadow-md hover:shadow-violet-300' type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
        <input className='p-2 rounded-lg shadow-md hover:shadow-violet-300' type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
        <input className='p-2 rounded-lg shadow-md hover:shadow-violet-300' type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" required />
        <input className='p-2 rounded-lg shadow-md hover:shadow-violet-300' type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" required />
        <input className='p-2 rounded-lg shadow-md hover:shadow-violet-300' type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} placeholder="Occupation" required />
        <input className='p-2 rounded-lg shadow-md hover:shadow-violet-300' type="text" name="skills" value={formData.skills} onChange={handleInputChange} placeholder="Skills (comma separated)" />
        <input className='p-2 rounded-lg shadow-md hover:shadow-violet-300' type="text" name="address.street" value={formData.address.street} onChange={handleInputChange} placeholder="Street" />
        <input className='p-2 rounded-lg shadow-md hover:shadow-violet-300' type="text" name="address.city" value={formData.address.city} onChange={handleInputChange} placeholder="City" />
        <input className='p-2 rounded-lg shadow-md hover:shadow-violet-300' type="text" name="address.state" value={formData.address.state} onChange={handleInputChange} placeholder="State" />
        <input className='p-2 rounded-lg shadow-md hover:shadow-violet-300' type="text" name="address.country" value={formData.address.country} onChange={handleInputChange} placeholder="Country" />
        <input className='p-2 rounded-lg shadow-md hover:shadow-violet-300' type="text" name="address.zipCode" value={formData.address.zipCode} onChange={handleInputChange} placeholder="Zip Code" />
        <textarea className='p-2 rounded-lg shadow-md hover:shadow-violet-300' name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Bio" />
        <textarea className='p-2 rounded-lg shadow-md hover:shadow-violet-300' name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
        <div className='col-span-2 flex flex-row justify-center'>
        <button className='border bg-violet-800 text-white rounded-lg py-2 px-6' type="submit">{editingId ? 'Update Profile' : 'Create Profile'}</button>
        </div>
      </form>
    </div>
    <div className='border p-4 bg-violet-100 rounded-2xl flex flex-col items-center'>    
      <h2 className='text-center text-2xl mb-4'>Existing Profiles</h2>
      <ul className='w-[75%] grid grid-cols-1 md:grid-cols-3 gap-4'>
        {profiles.map((profile) => (
          <li key={profile._id}>
            <div className='border bg-violet-50 p-4 shadow-lg md:hover:shadow-violet-300 rounded-xl h-64 text-wrap text-sm overflow-hidden flex flex-col justify-end items-center'>
                <div className='h-full flex flex-col justify-center'>
            {profile.image && <img className='rounded-full' src={profile.image} alt="Profile" style={{ width: '100px', height: '100px' }} />} {/* Display the image */}
                </div>
            <span className='text-2xl'>
                {profile.name}
            </span>     
            <span>    
                {profile.email}
            </span>
            <div className='flex flex-row gap-4 mt-4'>
            <button className='border bg-violet-800 text-white rounded-lg py-2 px-6' onClick={() => handleEdit(profile)}>Edit</button>
            <button className='border bg-violet-800 text-white rounded-lg py-2 px-6' onClick={() => handleDelete(profile._id)}>Delete</button>
            </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default AdminDashboard;
