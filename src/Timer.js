import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ isRunning }) => {
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            if (!intervalRef.current) {
                startTimeRef.current = Date.now();
                intervalRef.current = setInterval(() => {
                    setTime(Date.now() - startTimeRef.current);
                }, 10);
            }
        } else {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isRunning]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor((time % 1000) / 10);

        return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color:'#eb2f2f' }}>Time: {formatTime(time)}</p>
        </div>
    );
};

export default Timer;
