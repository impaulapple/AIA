import React, { useState } from 'react';
import { TextField, Button, Grid, CircularProgress, Box } from '@mui/material';
import Timer from './Timer';
import Text from './components/Text';



export default function App() {
    const [parameters1, setParameters1] = useState(Array(20).fill(''));
    const [parameters2, setParameters2] = useState(Array(6).fill(''));
    const [parameters3, setParameters3] = useState(Array(6).fill(''));
    const [showMask1, setShowMask1] = useState(false);
    const [showMask2, setShowMask2] = useState(false);
    const [showMask3, setShowMask3] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        setShowMask1(true);
        setTimeout(() => {
            setShowMask1(false);
        }, 500000);

        setShowMask2(true);
        setTimeout(() => {
            setShowMask2(false);
        }, 3000);

        setShowMask3(true);
        setTimeout(() => {
            setShowMask3(false);
        }, 1500);


        // 模擬提交的延遲
        setTimeout(() => {
            // 在這裡處理輸入按鈕的邏輯，例如呼叫一個函式並傳遞參數
            console.log('參數1:', parameters1);
            console.log('參數2:', parameters2);
            console.log('參數3:', parameters3);

            setIsLoading(false);
        }, 2000);
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
                                label={`參數 ${index + 1}`}
                                value={value}
                                onChange={(e) => handleInputChange(e, index, 'parameters2')}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    ))}
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
                                label={`參數 ${index + 1}`}
                                value={value}
                                onChange={(e) => handleInputChange(e, index, 'parameters3')}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    ))}
                </Grid>

            </Grid>
            <Grid item container justifyContent="center" style={{ background: '#0000000d', padding: '3rem', borderTop: '1px solid #00000042' }}>
                <Button onClick={handleSubmit} type="submit" variant="contained" size='large' color="primary" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
            </Grid>

        </>

    );
}