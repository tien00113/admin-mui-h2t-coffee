import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableTwo from '../../components/Tables/TableTwo';
import DefaultLayout from '../../layout/DefaultLayout';

const Product = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tất Cả Sản Phẩm" />

      <div className="flex flex-col gap-10">
        <TableTwo />
        {/* <EnhancedTable/> */}
      </div>
    </DefaultLayout>
  );
};

export default Product;
