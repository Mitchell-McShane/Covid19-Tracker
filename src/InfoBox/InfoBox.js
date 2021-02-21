import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

function InfoBox({ title, cases, total }) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox-title" color="textSecondary">
                    {title}
                </Typography>

                <h2 className="infoBox-cases">{cases}</h2>

                <Typography className="infoBox-total">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
