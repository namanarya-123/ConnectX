import React, { useContext, useEffect, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import './home.css'
import { AuthContext } from '../contexts/AuthContext'

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [recentMeetings, setRecentMeetings] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const [userName, setUserName] = useState("");

    const { addToUserHistory, getHistoryOfUser } = useContext(AuthContext);

    useEffect(() => {
        const storedName = localStorage.getItem("name");
        if (storedName) setUserName(storedName);

        fetchRecentMeetings();
    }, []);

    const fetchRecentMeetings = async () => {
        try {
            const history = await getHistoryOfUser();
            // Take the 3 most recent meetings, newest first
            const sorted = Array.isArray(history)
                ? [...history].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
                : [];
            setRecentMeetings(sorted);
        } catch (err) {
            setRecentMeetings([]);
        } finally {
            setLoadingHistory(false);
        }
    };

    const handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return;
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    const handleStartNewMeeting = () => {
        const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        navigate(`/${newCode}`);
    };

    const handleRejoin = (code) => {
        navigate(`/${code}`);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate("/auth");
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const isSameDay = (a, b) =>
            a.getDate() === b.getDate() &&
            a.getMonth() === b.getMonth() &&
            a.getFullYear() === b.getFullYear();

        const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (isSameDay(date, today)) return `Today, ${timeStr}`;
        if (isSameDay(date, yesterday)) return `Yesterday, ${timeStr}`;
        return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
    };

    const todayLabel = new Date().toLocaleDateString([], {
        weekday: 'long', day: 'numeric', month: 'long'
    });

    return (
        <div className='hm'>

            {/* ── Navbar ── */}
            <nav className='hm-nav'>
                <div className='hm-logo'>
                    <div className='hm-logo-box'>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7" />
                            <rect x="1" y="5" width="15" height="14" rx="2" />
                        </svg>
                    </div>
                    ConnectX
                </div>
                <div className='hm-nav-r'>
                    <div className='hm-nav-link' onClick={() => navigate("/history")}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="12 8 12 12 14 14" />
                            <path d="M3.05 11a9 9 0 1 1 .5 4" />
                            <polyline points="3 16 3 11 8 11" />
                        </svg>
                        History
                    </div>
                    <div className='hm-avatar'>
                        {userName ? userName.substring(0, 2).toUpperCase() : 'U'}
                    </div>
                    <div className='hm-logout' onClick={handleLogout}>Logout</div>
                </div>
            </nav>

            {/* ── Hero ── */}
            <div className='hm-center'>
                <div className='hm-time'>{todayLabel}</div>
                <h1 className='hm-greeting'>
                    {userName ? `Welcome back, ${userName.split(' ')[0]}` : 'Video calls made simple'}
                </h1>

                <div className='hm-actions'>
                    <button className='hm-btn-primary' onClick={handleStartNewMeeting}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7" />
                            <rect x="1" y="5" width="15" height="14" rx="2" />
                        </svg>
                        New meeting
                    </button>
                    <div className='hm-input-group'>
                        <input
                            className='hm-input'
                            placeholder='Enter a code'
                            value={meetingCode}
                            onChange={(e) => setMeetingCode(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleJoinVideoCall(); }}
                        />
                        <button className='hm-join-btn' onClick={handleJoinVideoCall}>Join</button>
                    </div>
                </div>
            </div>

            {/* ── Recent meetings ── */}
            <div className='hm-section'>
                <div className='hm-section-title'>Recent meetings</div>

                {loadingHistory ? (
                    <div className='hm-empty'>
                        <div className='hm-empty-title'>Loading...</div>
                    </div>
                ) : recentMeetings.length === 0 ? (
                    <div className='hm-empty'>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 12, opacity: 0.5 }}>
                            <polyline points="12 8 12 12 14 14" />
                            <path d="M3.05 11a9 9 0 1 1 .5 4" />
                            <polyline points="3 16 3 11 8 11" />
                        </svg>
                        <div className='hm-empty-title'>No meetings yet</div>
                        <div className='hm-empty-desc'>
                            Once you join or start a meeting, it'll show up here for quick rejoin.
                        </div>
                    </div>
                ) : (
                    <div>
                        {recentMeetings.map((meeting, idx) => (
                            <div className='hm-meet-row' key={meeting._id || idx}>
                                <div className='hm-meet-left'>
                                    <div className='hm-meet-icon'>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="23 7 16 12 23 17 23 7" />
                                            <rect x="1" y="5" width="15" height="14" rx="2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className='hm-meet-name'>{meeting.meetingCode}</div>
                                        <div className='hm-meet-time'>{formatDate(meeting.date)}</div>
                                    </div>
                                </div>
                                <button className='hm-rejoin-btn' onClick={() => handleRejoin(meeting.meetingCode)}>
                                    Rejoin
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Features ── */}
            <div className='hm-section'>
                <div className='hm-section-title'>Why ConnectX</div>
                <div className='hm-feat-grid'>
                    <div className='hm-feat-card'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <div className='hm-feat-title'>Encrypted</div>
                        <div className='hm-feat-desc'>Peer-to-peer WebRTC, no recordings stored.</div>
                    </div>
                    <div className='hm-feat-card'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        <div className='hm-feat-title'>Screen share</div>
                        <div className='hm-feat-desc'>Share your screen instantly in any call.</div>
                    </div>
                    <div className='hm-feat-card'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <div className='hm-feat-title'>Live chat</div>
                        <div className='hm-feat-desc'>Message without interrupting the call.</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default withAuth(HomeComponent)