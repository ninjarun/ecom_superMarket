import Sales from "./sales_report/Sales";
// import TrackUpdate from "./tracking_update/TrackUpdate";
import { useSelector } from 'react-redux'
import { fetchSalesAsync, selectSales } from '../../slicers/salesSlice'
import { useAppDispatch } from '../../app/hooks'
import { useEffect, useState } from "react";
import { fetchUserAsync, selectAccess } from "../../slicers/LoginSlice";
import { useNavigate } from "react-router-dom";


const Admin = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const axx = useSelector(selectAccess)

  useEffect(() => {
    // dispatch(fetchSalesAsync())

  }, [dispatch])

  // const sales = useSelector(selectSales)
  console.log(axx)

  // #################
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    dispatch(fetchUserAsync({ user: username, password: password }))
    // {axx && navigate('/admin/addproduct')}
  }

  // #####################

  return (
    <div>
      {axx ?
        <Sales axx={axx}></Sales>
        :
        <div style={{marginTop:'100px'}}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button onClick={handleLogin}>Login</button>
          {error && <p>{error}</p>}
        </div>
      }
    </div>
  );
};

export default Admin;