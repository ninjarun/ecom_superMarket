import Sales from "./sales_report/Sales";
import { useSelector } from 'react-redux'
import { fetchSalesAsync, selectSales } from '../../slicers/salesSlice'
import { useAppDispatch } from '../../app/hooks'
import { useEffect, useState } from "react";
// --- UPDATED IMPORTS ---
import { fetchUserAsync, selectAccess, selectLoginStatus, selectLoginError, clearLoginStatus } from "../../slicers/LoginSlice";
// -----------------------
import { useNavigate } from "react-router-dom";


const Admin = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const axx = useSelector(selectAccess)
  // --- NEW SELECTORS ---
  const loginStatus = useSelector(selectLoginStatus)
  const loginError = useSelector(selectLoginError)
  // ---------------------

  useEffect(() => {
    // dispatch(fetchSalesAsync())
    // Clear any previous error status when the component mounts
    dispatch(clearLoginStatus()); 

  }, [dispatch])

  // --- NEW useEffect to display and clear error ---
  useEffect(() => {
    if (loginStatus === 'failed') {
      setError(loginError || 'Authentication failed. Please check your credentials.');
    } else if (loginStatus === 'succeeded' && axx) {
        // Optionally navigate immediately on success, if desired
        // navigate('/admin/addproduct');
        setError(''); // Clear error on success
    } else if (loginStatus === 'idle') {
        setError(''); // Clear error if status is reset to idle
    }
  }, [loginStatus, loginError, axx, navigate]);

  // const sales = useSelector(selectSales)
  console.log('axx',axx)

  // #################
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // --- Updated input handlers to clear error when user starts typing ---
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) {
      setError('');
      dispatch(clearLoginStatus()); // Clear Redux state error
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) {
      setError('');
      dispatch(clearLoginStatus()); // Clear Redux state error
    }
  }
  // --------------------------------------------------------------------

  const handleLogin = async () => {
    // Clear any previous error before attempting new login
    setError('');
    dispatch(clearLoginStatus()); 
    dispatch(fetchUserAsync({ user: username, password: password }))
  }

  // #####################

  return (
    <div>
      {axx ?
        <Sales axx={axx}></Sales>
        :
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
              // --- UPDATED onChange ---
              onChange={handleUsernameChange}
              // ------------------------
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
              // --- UPDATED onChange ---
              onChange={handlePasswordChange}
              // ------------------------
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
              // --- ADDED disabled state to prevent double-clicks while loading ---
              disabled={loginStatus === 'loading'}
              // ------------------------------------------------------------------
              style={{
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                cursor: loginStatus === 'loading' ? 'not-allowed' : 'pointer', // Style for loading
                opacity: loginStatus === 'loading' ? 0.6 : 1, // Style for loading
              }}
            >
              {/* --- Display loading text while logging in --- */}
              {loginStatus === 'loading' ? 'Logging in...' : 'Login'}
              {/* ------------------------------------------- */}
            </button>
            {/* --- ERROR DISPLAY (Uses the component's 'error' state, updated from Redux) --- */}
            {error && (
              <p style={{ color: 'red', margin: 0, textAlign: 'center', fontWeight: 'bold' }}>
                {error}
              </p>
            )}
            {/* --------------------------------------------------------------------------------- */}
          </div>
        </div>
      }
    </div>
  );
};

export default Admin;