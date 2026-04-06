import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');
    
    const navigate = useNavigate();

    // Fetch user roles when component loads
    useEffect(() => {
        const fetchUserRoles = async () => {
            try {
                const token = localStorage.getItem('token'); // Get JWT from login
                if (!token) throw new Error('No token found');

                const response = await axios.get('http://localhost:8080/api/student/roles', {
                    headers: {
                        Authorization: `Bearer ${token}` // Send JWT
                    }
                });

                setRoles(response.data.roles || []);
                
                // Optional: Get user name from localStorage or another API
                setUserName(localStorage.getItem('userName') || 'Student');
            } catch (error) {
                console.error('Error fetching roles:', error);
                // Redirect to login if token invalid or missing
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserRoles();
    }, [navigate]);

    const hasClubOrganizer = roles.includes('ROLE_club_organizer');
    const hasEventOrganizer = roles.includes('ROLE_event_organizer');

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading your dashboards...</div>;
    }

    return (
        <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ color: '#333' }}>
                Welcome, <span style={{ color: '#007bff' }}>{userName}</span>! 👋
            </h1>
            <p style={{ fontSize: '18px', color: '#555' }}>
                You are logged in as a <strong>Student</strong>.
            </p>

            <div style={{ marginTop: '40px' }}>
                <h2>Your Available Dashboards</h2>

                {/* Student Dashboard - Always visible */}
                <div 
                    style={{
                        background: '#007bff',
                        color: 'white',
                        padding: '25px',
                        borderRadius: '12px',
                        margin: '15px 0',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/student-dashboard')}
                >
                    <h3>🎓 Student Dashboard</h3>
                    <p>View events, clubs, announcements, and your profile</p>
                </div>

                {/* Club Organizer Dashboard */}
                {hasClubOrganizer && (
                    <div 
                        style={{
                            background: '#28a745',
                            color: 'white',
                            padding: '25px',
                            borderRadius: '12px',
                            margin: '15px 0',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/club-dashboard')}
                    >
                        <h3>🏛️ Club Organizer Dashboard</h3>
                        <p>Manage your clubs, post events, approve members</p>
                    </div>
                )}

                {/* Event Organizer Dashboard */}
                {hasEventOrganizer && (
                    <div 
                        style={{
                            background: '#ffc107',
                            color: '#000',
                            padding: '25px',
                            borderRadius: '12px',
                            margin: '15px 0',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/e-dashboard')}
                    >
                        <h3>📅 Event Organizer Dashboard</h3>
                        <p>Create and manage events, track registrations</p>
                    </div>
                )}

                {/* Admin Dashboard */}
                {roles.includes('ROLE_admin') && (
                    <div 
                        style={{
                            background: '#dc3545',
                            color: 'white',
                            padding: '25px',
                            borderRadius: '12px',
                            margin: '15px 0',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/admin/dashboard')}
                    >
                        <h3>⚙️ Admin Dashboard</h3>
                    </div>
                )}

                {/* Advertisement Manager Dashboard */}
                {roles.includes('ROLE_advertisement_manager') && (
                    <div 
                        style={{
                            background: '#6f42c1',
                            color: 'white',
                            padding: '25px',
                            borderRadius: '12px',
                            margin: '15px 0',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/ads/dashboard')}
                    >
                        <h3>📢 Advertisement Manager Dashboard</h3>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '50px' }}>
                <button 
                    onClick={() => {
                        localStorage.clear();
                        navigate('/login');
                    }}
                    style={{
                        padding: '12px 25px',
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default StudentDashboard;