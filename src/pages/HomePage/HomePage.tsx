import { Route, Routes } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'
import ECommerce from '../Dashboard/ECommerce'
import Order from '../Order'
import Profile from '../Profile'
import FormElements from '../Form/FormElements'
import FormLayout from '../Form/FormLayout'
import Settings from '../Settings'
import Chart from '../Chart'
import Alerts from '../UiElements/Alerts'
import Buttons from '../UiElements/Buttons'
import AddProduct from '../Product/AddProduct'
import OrderDetail from '../OrderDetail'
import EnhancedTable from '../../components/Tables/EnhancedTable'
import Customer from '../Customer'
import Product from '../Product/Product'


const HomePage = () => {
  return (
    <div>
      <Routes>
        <Route
          path='/'
          index
          element={
            <>
              <PageTitle title="Home | H2T - Coffee" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/don-hang"
          element={
            <>
              <PageTitle title="Đơn hàng | H2T - Coffee" />
              <Order />
            </>
          }
        />
        <Route
          path="/don-hang/chi-tiet"
          element={
            <>
              <PageTitle title="Đơn hàng | H2T - Coffee" />
              <OrderDetail />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | H2T - Coffee" />
              <Profile />
            </>
          }
        />
        {/* <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | H2T - Coffee" />
              <FormElements />
            </>
          }
        /> */}
        <Route
          path="/khach-hang"
          element={
            <>
              <PageTitle title="Khách hàng| H2T - Coffee" />
              <Customer />
            </>
          }
        />
        {/* <Route
          path="/tablepage"
          element={
            <>
              <PageTitle title="Form Layout | H2T - Coffee" />
              <EnhancedTable/>
            </>
          }
        /> */}
        <Route
          path="/san-pham"
          element={
            <>
              <PageTitle title="Sản phẩm | H2T - Coffee" />
              <Product />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | H2T - Coffee" />
              <Settings />
            </>
          }
        />
        {/* <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | H2T - Coffee" />
              <Chart />
            </>
          }
        /> */}
        {/* <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | H2T - Coffee" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | H2T - Coffee" />
              <Buttons />
            </>
          }
        /> */}
        <Route
          path='/san-pham/them'
          element={
            <>
              <PageTitle title="Thêm sản phẩm | H2T - Coffee" />
              <AddProduct />
            </>
          }
        />
        <Route
          path='/san-pham/chinh-sua'
          element={
            <>
              <PageTitle title="Sửa sản phẩm | H2T - Coffee" />
              <FormElements />
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default HomePage