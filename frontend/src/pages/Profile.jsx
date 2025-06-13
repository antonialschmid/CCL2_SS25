// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from '../services/axiosConfig';

function Profile() {
    const [profile, setProfile] = useState(null);
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userRes = await axios.get('/users/profile');
                const lettersRes = await axios.get('/letters/me');
                setProfile(userRes.data);
                setLetters(lettersRes.data);
            } catch (err) {
                console.error('Error fetching profile data:', err);
            }
        };

        fetchProfileData();
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="profile">
            <h1>{profile.name}</h1>
            <p><strong>Email:</strong> {profile.email}</p>
            {profile.bio && <p><strong>About you:</strong> {profile.bio}</p>}
            <p><strong>Letters written:</strong> {letters.length}</p>
            <p><strong>Part of this space since:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>

            {/* Optional buttons */}
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => window.location.href = '/write'}>Write a Letter</button>
                <button onClick={() => window.location.href = '/read'}>Read Letters</button>
                <button onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }}>Logout</button>
            </div>
        </div>
    );
}

export default Profile;
