import React, { useState, useEffect } from 'react';
import "../../scss/door.scss"
import door1 from "../../assets/picture/door.png"
import door2 from "../../assets/picture/door2.gif"
function DoorControl() {
    const [status, setStatus] = useState('Locked');
    const [password, setPassword] = useState('');
    const [correctCode, setCorrectCode] = useState('1234');
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);
    const [history, setHistory] = useState([]);
    const [showChangeTrigger, setShowChangeTrigger] = useState(true);
    const [showChangeForm, setShowChangeForm] = useState(false);
    const [newCode, setNewCode] = useState('');
    const [failCount, setFailCount] = useState(0);
    const [alertVisible, setAlertVisible] = useState(false); // 👈 trạng thái hiện thông báo cảnh báo

    const addToHistory = (result) => {
        const entry = { time: new Date(), result };
        setHistory(prev => [entry, ...prev]); // hiển thị mới nhất lên đầu
    };

    useEffect(() => {
        if (alertVisible) {
            const timer = setTimeout(() => setAlertVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [alertVisible]);

    const handleUnlock = () => {
        if (password === correctCode) {
            setStatus('Unlocked');
            setError('');
            addToHistory('Success');
            setFailCount(0);

            // Chỉ tự động khóa nếu cửa chưa bị khóa thủ công
            if (!isManuallyLocked) {
                setTimeout(() => {
                    setStatus('Locked');
                    addToHistory('Auto Locked');
                }, 10000);
            }
        } else {
            setShake(true);
            const newFailCount = failCount + 1;
            setFailCount(newFailCount);
            setError('Wrong code!');
            addToHistory('Failed');

            if (newFailCount >= 3) {
                setError('🚨 Warning: Too many failed attempts!');
                setAlertVisible(true); // 👈 hiện cảnh báo
                addToHistory('🚨 3 Failed Attempts');
                setFailCount(0);
            }

            setTimeout(() => setShake(false), 500);
        }
        setPassword('');
    };

    const handleLock = () => {
        setStatus('Locked');
        addToHistory('Manually Locked');
    };

    const handleChangeCode = () => {
        if (newCode.trim() === '') return;
        setCorrectCode(newCode);
        setNewCode('');
        setShowChangeForm(false);
        addToHistory('Password Updated');
        setShowChangeTrigger(true);
        
    };

    const getIconForResult = (result) => {
        switch (result) {
            case 'Success': return '🔓';
            case 'Failed': return '❌';
            case 'Auto Locked': return '⏱️';
            case 'Password Updated': return '🛠️';
            case '🚨 3 Failed Attempts': return '🚨';
            case 'Manually Locked': return '🔒';
            default: return '';
        }
    };

    return (
        <div className="door-control">
            <h2>DOOR CONTROL</h2>

            {/* 🔔 Cảnh báo trên web khi nhập sai 3 lần */}
            {alertVisible && (
                <div className="alert alert-danger text-center fw-bold">
                    🚨 Warning: 3 Failed Attempts Detected!
                </div>
            )}

            <div className="center-section">
                <h4>
                    Status:
                    <span className={`status ${status === 'Unlocked' ? 'open' : 'locked'}`}>
                        {status === 'Unlocked' ? '🔓 Unlocked' : '🔒 Locked'}
                    </span>
                </h4>

                <div className={`code-box ${shake ? 'shake' : ''}`}>
                    <input
                        type="password"
                        placeholder="Enter code"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                    />
                    <button className="btn btn-success ms-2" onClick={handleUnlock}>Unlock</button>
                    {/* Nút khóa khi cửa đang mở */}
                    {status === 'Unlocked' && (
                        <button className="btn btn-danger ms-2" onClick={handleLock}>Lock</button>
                    )}
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}

                {status === 'Unlocked' && showChangeTrigger && !showChangeForm && (
                    <div className="change-trigger mt-4" onClick={() => setShowChangeForm(true)} role="button">
                        <span className="gear-icon">⚙️</span>
                        <span className="change-label ms-2">Change Password</span>
                    </div>
                )}


                {status === 'Unlocked' && showChangeForm && (
                    <div className="change-code mt-3">
                        <h5>Update Code</h5>
                        <input
                            type="password"
                            placeholder="New code"
                            value={newCode}
                            onChange={(e) => setNewCode(e.target.value)}
                        />
                        <button className="btn btn-warning ms-2" onClick={handleChangeCode}>Update</button>
                    </div>
                )}

            </div>

            <div className="bottom-section mt-4">
                <div className="image-box">
                    <img src={status === 'Unlocked' ? door2 : door1} alt="Smart Lock" />
                </div>

                <div className="history-box">
                    <h4 className="cangiua">Access History</h4>
                    <ul>
                        {history.map((item, index) => (
                            <li key={index}>
                                {getIconForResult(item.result)} [{item.time.toLocaleTimeString()}] - {item.result}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DoorControl;
