import { Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { LineChart } from '@mui/x-charts/LineChart';
import React from "react";

export default function NewGraphicalContainer() {
    const graphDataWebsiteClicks = [
        {
            "May": 14281,
            "June": 35462,
            "July": 37923,
            "August": 36624,
            "September": 40484,
            "October": 33955
        }
    ];

    const months = Object.keys(graphDataWebsiteClicks[0]);
    const values = Object.values(graphDataWebsiteClicks[0]);
    console.log("months is here : +++++" + months);
    console.log("Values is here : +++++" + values);
    // Create numerical indices for X-axis to plot line chart correctly
    const monthIndexes = months.map((_, index) => index + 1);

    return (
        <Grid container spacing={1} sx={{ m: 2 }}>
            <Grid item xs={12} sm={6} md={6}>
                <Card variant="outlined">
                    <CardContent>
                        <LineChart
                            xAxis={[
                                {
                                    data: values,
                                    label: 'Month',
                                    // ticks: monthIndexes.map((idx, i) => ({
                                    //     value: idx,
                                    //     label: months[i]
                                    // })) // Display month names as labels
                                }
                            ]}
                            yAxis={[
                                {
                                    min: 0,
                                    max: Math.max(...values) + 5000,
                                    label: 'Clicks'
                                }
                            ]}
                            series={[
                                {
                                    data: values,
                                    label: 'Website Clicks',
                                    area: true,
                                    color: '#02D5D1',
                                }
                            ]}
                            width={500}
                            height={300}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
