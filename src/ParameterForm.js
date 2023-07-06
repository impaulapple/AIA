import React, { useState } from 'react';
import { TextField, Button, Grid, CircularProgress, Box } from '@mui/material';
import Timer from './Timer';
import Text from './components/Text';
import { apiGetResult_DL, apiGetResult_ML } from './API';

const SIX_FEATURE_DEFAULT_VALUE = [
    0.0016667,
    0.007452,
    1,
    0.6,
    -0.321311475,
    -132.0895522
]

export default function App() {
    const [parameters1, setParameters1] = useState(Array(20).fill(''));
    const [parameters2, setParameters2] = useState(SIX_FEATURE_DEFAULT_VALUE);
    const [parameters3, setParameters3] = useState(SIX_FEATURE_DEFAULT_VALUE);
    const [showMask1, setShowMask1] = useState(false);
    const [showMask2, setShowMask2] = useState(false);
    const [showMask3, setShowMask3] = useState(false);
    const [paramResult2, setResult2] = useState('');
    const [paramResult3, setResult3] = useState('');

    const handleInputChange = (e, index, parameterType) => {

        if (parameterType === 'parameters1') {
            const newParameters = [...parameters1];
            newParameters[index] = e.target.value;
            setParameters1(newParameters);
        } else if (parameterType === 'parameters2') {
            const newParameters = [...parameters2];
            newParameters[index] = e.target.value;
            setParameters2(newParameters);
        } else if (parameterType === 'parameters3') {
            const newParameters = [...parameters3];
            newParameters[index] = e.target.value;
            setParameters3(newParameters);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setResult2(o => { return '' })
        setResult3(o => { return '' })
        const aNewParam2 = parameters2.map(str => parseFloat(str));
        const aNewParam3 = parameters3.map(str => parseFloat(str));
        setShowMask1(true);
        setShowMask2(true);
        setShowMask3(true);

        apiGetResult_ML(aNewParam2).then(oRes => {
            console.log(456465, oRes.data)
            setShowMask2(false);
            setResult2(oRes.data.prediction);
        });

        apiGetResult_DL(aNewParam3).then(oRes => {
            console.log(456465, oRes.data)
            setShowMask3(false);
            setResult3(oRes.data.prediction);
        });

        setTimeout(() => {
            setShowMask1(false);
        }, 500000);

    };

    return (
        <>

            <Grid container spacing={2} direction="row">
                {/* backgroundColor: '#F8E0D4'  */}
                <Grid item xs={4} container direction="column" spacing={2} sx={{}} className={`grid-item ${showMask1 ? 'show-mask' : ''}`}>
                    <Text text="Original" />
                    <Timer isRunning={showMask1} bClear={true} />
                    {showMask1 && (
                        <Box className="backdrop" >
                            <CircularProgress size={128} />
                        </Box>
                    )}
                    {parameters1.map((value, index) => (
                        <Grid item key={index}>
                            <TextField
                                type='number'
                                className="smallTextField"
                                label={`參數 ${index + 1}`}
                                value={value}
                                onChange={(e) => handleInputChange(e, index, 'parameters1')}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    ))}
                </Grid>
                {/* backgroundColor: '#E6E6FA'  */}
                <Grid item xs={4} container direction="column" spacing={2} sx={{}} className={`grid-item ${showMask1 ? 'show-mask' : ''}`}>
                    <Text text="Gradient Boosting" />
                    <Timer isRunning={showMask2} />
                    {showMask2 && (
                        <Box className="backdrop" >
                            <CircularProgress size={128} />
                        </Box>
                    )}
                    {parameters2.map((value, index) => (
                        <Grid item key={index}>
                            <TextField
                                type='number'
                                label={`參數 ${index + 1}`}
                                value={value}
                                onChange={(e) => handleInputChange(e, index, 'parameters2')}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    ))}
                    <Text text={`預測下沉量 (mm):`} />
                    <Text text={paramResult2} />
                </Grid>
                {/* backgroundColor: '#C1E1C1'  */}
                <Grid item xs={4} container direction="column" spacing={2} sx={{}} className={`grid-item ${showMask1 ? 'show-mask' : ''}`}>
                    <Text text="Deep Learning" />
                    <Timer isRunning={showMask3} />
                    {showMask3 && (
                        <Box className="backdrop" >
                            <CircularProgress size={128} />
                        </Box>
                    )}
                    {parameters3.map((value, index) => (
                        <Grid item key={index}>
                            <TextField
                                type='number'
                                label={`參數 ${index + 1}`}
                                value={value}
                                onChange={(e) => handleInputChange(e, index, 'parameters3')}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    ))}
                    <Text text={`預測下沉量 (mm):`} />
                    <Text text={paramResult3} />
                </Grid>

            </Grid>
            <Grid item container justifyContent="center" style={{ background: '#0000000d', padding: '3rem', borderTop: '1px solid #00000042' }}>
                <Button onClick={handleSubmit} type="submit" variant="contained" size='large' color="primary">
                    {'Submit'}
                </Button>
            </Grid>

        </>

    );
}