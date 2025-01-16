import { keyframes, Skeleton, styled } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import { grayColor } from '../../constants/color';

//it will return a styled component that will be used just like a normal react component
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


export const SearchField = styled("input")`
  padding: 1rem 2rem;
  border-radius: 1.8rem;
  width: 100%; // Full width for mobile, will be adjusted in AppBar
  max-width: 20rem;
  border: none;
  outline: none;
  background-color: #f1f1f1;
  box-shadow: inset 1px 2px 6px rgba(0, 0, 0, 0.2);
  font-size: 1.1rem;
`

export const CurveButton = styled("button")`
  padding: 0.8rem 2rem;
  border-radius: 1.8rem;
  border: none;
  outline: none;
  background-color: #f1f1f1;
  box-shadow: inset 1px 2px 6px rgba(0, 0, 0, 0.2);
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(0,0,0,0.7);

  :hover {
    background-color: #f7f7f7;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.8rem 1rem;
  }

`

const bounceAnimation = keyframes`
  0% {transform:scale(1);}
  50% {transform:scale(1.5);}
  100% {transform:scale(1);}
`

export const BouncingSkeleton = styled(Skeleton)(()=>({
  animation: `${bounceAnimation} 1s infinite`,

}))
