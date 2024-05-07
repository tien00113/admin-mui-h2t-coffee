import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';
import DefaultLayout from '../layout/DefaultLayout';



const Order = () => {
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Đơn hàng" />
      <TableThree />
    </DefaultLayout>
  );
};

export default Order;
