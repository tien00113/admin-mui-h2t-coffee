import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './Redux/store';
import { getProfileAction } from './Redux/Admin/admin.action';
import HomePage from './pages/HomePage/HomePage';
import Authentication from './pages/Authentication/Authentication';

function App() {
  const admin = useSelector((state: RootState) => state.admin.auth);
  const status = useSelector((state: RootState) => state.admin.status);
  const dispatch: AppDispatch = useDispatch();
  const [prevJwt, setPrevJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const jwt: any = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getProfileAction(jwt));
    }
    setPrevJwt(jwt);

  }, [dispatch, prevJwt, status]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  console.log("admn là :", prevJwt)

  return loading ? (<Loader />) : (
    <>
      <Routes>
        <Route path='/*' element={admin ? <HomePage /> : <Authentication />} />
      </Routes>
    </>
  );
}

export default App;
