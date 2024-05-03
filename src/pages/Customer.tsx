import React from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'
import TableOne from '../components/Tables/TableOne'

const Customer = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Khách Hàng" />
      <TableOne />
    </DefaultLayout>
  )
}

export default Customer