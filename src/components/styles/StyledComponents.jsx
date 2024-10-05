import { styled } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import { grayColor } from '../../constants/color';

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

export const InputBox = styled("input")`
  width: 100%;
  height: 2.9rem;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 2rem;
  background-color: #f7f7f7;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1); // Subtle inner shadow
  transition: all 0.3s ease;

  &:focus {
    // box-shadow: 0px 0px 10px rgba(255, 165, 0, 0.4); // Orange glow on focus
    // outline: none;
  }
`;