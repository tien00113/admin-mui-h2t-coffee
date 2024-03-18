import { Route, Routes } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Authentication = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/dang-nhap' element={<SignIn/>}/>
            <Route path='/dang-ky' element={<SignUp/>}/>
        </Routes>
    </div>
  )
}

export default Authentication