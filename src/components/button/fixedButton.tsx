import PhoneIcon from '@mui/icons-material/Phone';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';

const StyledIconButton = styled(IconButton)(() => ({
  position: 'fixed',
  bottom: '50px',
  right: '50px',
  zIndex: 1000,
  backgroundColor: '#1EA582',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  color: 'white',
  border: "1px solid white",
  animation: 'pulse 1.5s infinite',
  '&:hover': {
    backgroundColor: '#1EA582',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
      boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.2)',
    },
    '50%': {
      transform: 'scale(1.05)',
      boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
    },
    '100%': {
      transform: 'scale(1)',
      boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.2)',
    },
  },
}));

const FixedButton = () => {
  return (
    <StyledIconButton
      aria-label="call"
    >
      <PhoneIcon />
    </StyledIconButton>
  );
};

export default FixedButton;
