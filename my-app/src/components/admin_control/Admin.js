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
  console.log('axx',axx)

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
        // <div style={{marginTop:'100px'}}>
        //   <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        //   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        //   <button onClick={handleLogin}>Login</button>
        //   {error && <p>{error}</p>}
        // </div>
        <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  }}
>
  <div
    style={{
      background: '#fff',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      width: '300px',
    }}
  >
    <input
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  placeholder="Username"
  style={{
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    textAlign: 'center',
  }}
/>
<input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  style={{
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    textAlign: 'center', 
  }}
/>


    <button
      onClick={handleLogin}
      style={{
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Login
    </button>
    {error && (
      <p style={{ color: 'red', margin: 0, textAlign: 'center' }}>{error}</p>
    )}
  </div>
</div>

      }
    </div>
  );
};

export default Admin;