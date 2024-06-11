import React from 'react';
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

function getScreenSize() {

    if (typeof (window) === "undefined") return 0;
    const width = window.innerWidth;
    if (width >= 300 && width < 476) {
        return 340;
    } else if (width >= 476 && width < 768) {
        return 350;
    } else if (width >= 768 && width < 1024) {
        return 350;
    } else if (width >= 1024 && width < 1279) {
        return 380;
    } else if (width >= 1280 && width < 1536) {
        return 600;
    } else if (width >= 1536) {
        return 600;
    } else {
        return 'unknown';
    }
}

export default function RadarChartComponent() {
    // to be passed as a prop default for now
    const data = [
        { name: 'A', x: [1, 2, 3, 4] },
        { name: 'B', x: [22] },
        { name: 'C', x: [-32] },
        { name: 'D', x: [-14] },
        { name: 'E', x: [-51] },
    ];


    return (
        <RadarChart height={getScreenSize()} width={getScreenSize()}
            outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar dataKey="x" stroke="green"
                fill="green" fillOpacity={0.5} />
        </RadarChart>
    )
}
