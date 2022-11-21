import React, { useState } from 'react';

// React-Router
import { Link, useNavigate } from 'react-router-dom';

// Toast
import { toast } from 'react-toastify';

// Components
import Logo from '../../components/Logo';
import FormRow from '../../components/FormRow';

// CSS
import './Login.css';
// API
import { API } from '../../backend';
import { signIn, authenticate } from '../../helper/login/loginHelper';

const initialState = {
  email: '',
  password: '',
  success: false,
  error: '',
};

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);

  console.log(`${API}`);

  const handleChange = (e) => {
    console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);

    setValues({ ...values, error: false, [name]: value });
  };

  // When user Enter Email and Password
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);

    const { email, password } = values;

    if (!email || !password) {
      console.log('Please Fill out all the Fields');
      return toast.error('Please Fill out all the Fields');
    }
    setValues({ ...values, error: false });
    console.log(values);

    signIn({ email, password })
      .then((data) => {
        console.log(data);
        if (data.statusCode == 400) {
          toast.error(data.message);
          setValues({ ...values, error: data.message, success: false });
        } else if (data.statusCode == 200) {
          authenticate(data, () => {
            setValues({
              ...values,
              success: true,
              isMember: false,
            });
            console.log('THIS IS DATA', data);
            toast.success('User Login Successfully!!');
            console.log('Ankush');

            setTimeout(() => {
              navigate('/');
              navigate(0);
            }, 3000);
          });
        }
      })
      .catch((error) => {
        toast.error('Login Request Failed');
        console.log('Login Request Failed', error);
      });
  };

  return (
    <div>
      <div className="full-page-login">
        <form className="form-login" onSubmit={onSubmit}>
          <Logo />

          {/* Email Field */}
          <FormRow
            type="email"
            name="email"
            values={values.email}
            handleChange={handleChange}
          />

          {/* Password Field */}
          <FormRow
            type="password"
            name="password"
            values={values.password}
            handleChange={handleChange}
          />
          <span>
            <Link
              to="/resetPassword"
              className="member-btn-login forgetPassword-login"
            >
              Forget Password?
            </Link>
          </span>

          <button
            type="submit"
            className="btn-login btn-block-login"
            onClick={onSubmit}
          >
            Login
          </button>
          {/* <p>
            Not a Member Yet? {''}
            <Link to='/Registration' className='member-btn-login'>
              Register
            </Link>
            <span>
              <Link to='/LoginNumber' className='member-btn-login'>
                Login with Phone Number
              </Link>
            </span>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
