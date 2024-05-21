import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  
  const [emailExists, setEmailExists] = useState(false);

  const onTextChange = e => {
    const copy = { ...formData };
    copy[e.target.name] = e.target.value;
    setFormData(copy);
  }

  const onFormSubmit = async e => {
    e.preventDefault();
    const { data } = await axios.get(`/api/Account/EmailExists?email=${formData.email}`);
    setEmailExists(data.exists);
    if(data.exists) {
      return;
    }
    await axios.post('/api/account/signup', formData);
    navigate('/login');
  }
  
  return (
      <div className="row" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
          <h3>Sign up for a new account</h3>
          {emailExists && <span className='text-danger'>There's already an account associated with this email. Try a different email</span>}
          <form onSubmit={onFormSubmit}>
            <input onChange={onTextChange} value={formData.firstName} type="text" name="firstName" placeholder="First Name" className="form-control" />
            <br />
            <input onChange={onTextChange} value={formData.lastName} type="text" name="lastName" placeholder="Last Name" className="form-control" />
            <br />
            <input onChange={onTextChange} value={formData.email} type="text" name="email" placeholder="Email" className="form-control" />
            <br />
            <input onChange={onTextChange} value={formData.password} type="password" name="password" placeholder="Password" className="form-control" />
            <br />
            <button className="btn btn-primary">Signup</button>
          </form>
        </div>
      </div>
  );
}

export default Signup;