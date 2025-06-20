import { Mail, Notifications, Pets, ShoppingCart } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState, type FC } from 'react';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width: '40%',
}));

const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

interface NavbarProps {
  onSearch: (value: string) => void;
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: FC<NavbarProps> = ({ onSearch, cartCount, onCartClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
          DEVNOLOJA
        </Typography>
        <Pets sx={{ display: { xs: 'block', sm: 'none' } }} />
        <Search>
          <InputBase
            placeholder="search..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </Search>
        <Icons>
          <Badge badgeContent={cartCount} onClick={onCartClick} color="error">
            <ShoppingCart />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://i.pravatar.cc/100"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://i.pravatar.cc/100"
          />
          <Typography component="span">email</Typography>
        </UserBox>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
