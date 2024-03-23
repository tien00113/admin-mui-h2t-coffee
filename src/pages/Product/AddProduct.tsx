import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../Redux/store'
import { createProductAction } from '../../Redux/Product/product.action'
import FormElements from '../Form/FormElements'
interface Data {
  name: String
}
const item: Data = {
  name: "ngu vl"
}
const AddProduct = () => {
  const dispatch: AppDispatch = useDispatch();
  const product = useSelector((state: RootState) => state.product.product);

  // useEffect(() => {
  //   dispatch(createProductAction(item))
  // }, [product])
  return (
    <div>
      <FormElements />
    </div>
  )
}

export default AddProduct