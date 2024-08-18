import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/loginStudent');
  };

  return (
    <button
      style={{
        backgroundColor: '#fff',
        color: 'black',
        padding: '10px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        position: 'relative',  // Added for tooltip
      }}
      onClick={handleLogout}
      title="Logout"  // Added for tooltip
    >
      <FiLogOut size={"20px"} /> 
    </button>
  );
};

export default LogoutButton;
