import { Box, Pagination } from '@mui/material';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableTwo from '../../components/Tables/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tất Cả Sản Phẩm" />

      <div className="flex flex-col gap-10">
        <TableTwo />
        {/* <EnhancedTable/> */}
        <Box display='flex' justifyContent="center">
          <Pagination count={10} color='primary' />
        </Box>
      </div>
    </DefaultLayout>
  );
};

export default Tables;
