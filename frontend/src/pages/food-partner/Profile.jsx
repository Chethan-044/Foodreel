import React, { useState, useEffect } from 'react';
import '../../styles/profile.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      axios
  .get(`http://localhost:3000/api/foodpartner/${id}`, { withCredentials: true })
  .then(response => {
    console.log("✅ API response:", response.data);
    setProfile(response.data.foodPartner);
    setVideos(response.data.foodPartner?.foodItems || []);
  })

      .catch(error => {
        console.error("❌ Error fetching profile:", error);
      });
  }, [id]);

  return (
    <main className="profile-page">
      <section className="profile-header">
        <div className="profile-meta">
          <img
            className="profile-avatar"
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60"
            alt=""
          />

          <div className="profile-info">
            <h1 className="profile-pill profile-business" title="Business name">
              {profile?.fullname || "Unknown Partner"}
            </h1>
            <p className="profile-pill profile-address" title="Address">
              {profile?.address || "Address not available"}
            </p>
          </div>
        </div>

        <div className="profile-stats" role="list" aria-label="Stats">
          <div className="profile-stat" role="listitem">
            <span className="profile-stat-label">total meals</span>
            <span className="profile-stat-value">{profile?.totalMeals ?? 0}</span>
          </div>
          <div className="profile-stat" role="listitem">
            <span className="profile-stat-label">customers served</span>
            <span className="profile-stat-value">{profile?.customersServed ?? 0}</span>
          </div>
        </div>
      </section>

      <hr className="profile-sep" />

      <section className="profile-grid" aria-label="Videos">
        {Array.isArray(videos) && videos.length > 0 ? (
          videos.map((v, index) => (
            <div key={v._id || index} className="profile-grid-item">
              <video
                className="profile-grid-video"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                src={v.video}
                muted
                controls
              />
            </div>
          ))
        ) : (
          <p style={{ color: 'white', textAlign: 'center' }}>No videos found</p>
        )}
      </section>
    </main>
  );
};

export default Profile;
