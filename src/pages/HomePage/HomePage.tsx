import { Route, Routes } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'
import ECommerce from '../Dashboard/ECommerce'
import Order from '../Order'
import Profile from '../Profile'
import FormElements from '../Form/FormElements'
import FormLayout from '../Form/FormLayout'
import Tables from '../Product/Product'
import Settings from '../Settings'
import Chart from '../Chart'
import Alerts from '../UiElements/Alerts'
import Buttons from '../UiElements/Buttons'
import AddProduct from '../Product/AddProduct'

const HomePage = () => {
  return (
    <div>
      <Routes>
        <Route
          path='/'
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | H2T - Coffee" />
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
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | H2T - Coffee" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | H2T - Coffee" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | H2T - Coffee" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/san-pham"
          element={
            <>
              <PageTitle title="Tables | H2T - Coffee" />
              <Tables />
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
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | H2T - Coffee" />
              <Chart />
            </>
          }
        />
        <Route
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
        />
        <Route
          path='/san-pham/them'
          element={
            <>
              <PageTitle title="Thêm sản phẩm | H2T - Coffee" />
              <AddProduct />
            </>
          }
        />
        </Routes>
    </div>
  )
}

export default HomePage