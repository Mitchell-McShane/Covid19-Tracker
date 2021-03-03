import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './InfoBox.css';

function InfoBox({ title, cases, active, total, ...props }) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'}`}>
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
