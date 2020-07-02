import React from 'react';

export const Dashboard: React.FunctionComponent = () => {
    return (
        <div className="p-4 text-center">
            <h2>Temp Tracker Dashboard</h2>
            <iframe src="https://temptracker.pollyspeople.net/graph" style={{ border: 'none', width: '100%', height: '420px' }} ></iframe>
        </div>
    )
}
