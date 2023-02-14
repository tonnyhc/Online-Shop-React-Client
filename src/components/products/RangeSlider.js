import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `$${value}`;
}

export const RangeSlider = ({value, onChange}) => {
    const handleChange = (event, newValue) => {
        onChange(newValue);
    };

    return (
        <Box sx={{ width: 300 }}>
            <Slider
                getAriaLabel={() => 'Price Range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                marks
                min={0}
                max={1000}
                sx={{
                    '& .MuiSlider-thumb': {
                        color: '#ff4e00',
                    },
                }}
            />
        </Box>
    );
}