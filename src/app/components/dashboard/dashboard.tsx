import React from 'react';
import { config } from '../../../config';

export const Dashboard: React.FunctionComponent = () => {
    return (
        <div className="p-4 text-center">
            <h2>Temp Tracker Dashboard</h2>
            <iframe src={config.GRAPH_URL} style={{ border: 'none', width: '100%', height: '420px' }} ></iframe>
        </div>
    )
}
