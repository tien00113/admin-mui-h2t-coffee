import { Box, InputBase, Pagination, alpha, styled } from '@mui/material';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';
import DefaultLayout from '../layout/DefaultLayout';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const Calendar = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Đơn hàng" />
      <Search>
        <SearchIconWrapper>
          ID:
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Tìm đơn hàng ..."
        // inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      <TableThree />
      <Box display='flex' justifyContent="center" paddingTop="1rem">
        <Pagination count={10} color='primary' />
      </Box>
    </DefaultLayout>
  );
};

export default Calendar;
