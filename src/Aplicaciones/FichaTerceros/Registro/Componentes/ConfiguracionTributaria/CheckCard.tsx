import { CardActionArea, Checkbox } from '@mui/material'
import { Card, CardContent, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { ChangeEvent, useState } from 'react'

export interface CheckCardProps {
    title: string
}

const CheckCard = ({ title }: CheckCardProps) => {

    const [checked, setChecked] = useState(false);

    const [inputProps, setinputProps] = useState<Record<string, any>>({
        borderColor: "background.default"
    })

    const handleChange = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
        setChecked(checked);

        if (checked)
            setinputProps({
                backgroundColor: "rgb(0 139 176 /0.1)",
                borderColor: "secondary.main"
            })
        else
            setinputProps({
                borderColor: "background.default"
            })

    };

    return (
        <Stack width="100%">
            <Card variant="outlined" sx={{ ...inputProps }}>
                <CardActionArea>
                    <Stack>
                        <Stack p={2}>
                            <Stack direction="row" alignItems="center">
                                <Checkbox size="small" color="secondary" onChange={handleChange} checked={checked}></Checkbox>
                                <Typography variant="subtitle2">{title}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardActionArea>
            </Card>
        </Stack>
    )
}

export default CheckCard