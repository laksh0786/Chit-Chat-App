import { styled } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';

export const VisuallyHiddenInput = styled('input')({
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    border: 0
})

export const Link = styled(RouterLink)`
text-decoration: none;
color: black;
padding:1rem;
&:hover{
    background-color: rgba(0,0,0,0.1);
}
`