import { Box, IconButton, InputBase, Menu, MenuItem } from '@mui/material';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';
import DefaultLayout from '../layout/DefaultLayout';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const Order = () => {
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);

  // const handleClick = (event: any) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Đơn hàng" />
      {/* <div className='flex'>
        <div>
          <Box
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
          >
            <IconButton
              sx={{ p: '10px' }}
              aria-label="menu"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Chờ Xác Nhận</MenuItem>
              <MenuItem onClick={handleClose}>Chờ Giao Hàng</MenuItem>
              <MenuItem onClick={handleClose}>Đang Giao</MenuItem>
              <MenuItem onClick={handleClose}>Hoàn Thành</MenuItem>
              <MenuItem onClick={handleClose}>Đã Hủy</MenuItem>
            </Menu>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Tìm Đơn Hàng..."
              inputProps={{ 'aria-label': 'search order' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
        </div>
      </div> */}
      <TableThree />
    </DefaultLayout>
  );
};

export default Order;
