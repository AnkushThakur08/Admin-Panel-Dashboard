import React, { useState } from 'react';

// React-Router
import { Link, useNavigate } from 'react-router-dom';

// Toast
import { toast } from 'react-toastify';

// Components
import Logo from '../../components/Logo';
import FormRow from '../../components/FormRow';
import ForgetPasswordImage from '../../Assets/forgetPassword.svg';

// API
import { API } from '../../backend';
import { forgetPassword } from '../../helper/login/loginHelper';

// CSS
import '../Login/Login.css';

const initialState = {
  email: '',
  success: false,
  error: '',
};

const ForgetPassword = () => {
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

    const { email } = values;

    if (!email) {
      console.log('Please Enter your Email');
      return toast.error('Please Enter your Email');
    }
    setValues({ ...values, error: false });
    console.log(values);

    forgetPassword({ email })
      .then((data) => {
        console.log(data);
        if (data.statusCode == 400) {
          toast.error(data.message);
          setValues({ ...values, error: data.message, success: false });
        } else if (data.statusCode == 200) {
          setValues({
            ...values,
            success: true,
          });
          toast.success('Reset Password Mail Send');
          console.log('Ankush');

          setTimeout(() => {
            navigate('/login');
          }, 3000);
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
          <h3 className="heading">
            <h3>Forget Password</h3>
            <img
              className="img-fluid smallforgetPassword"
              src={ForgetPasswordImage}
              alt=""
            />
          </h3>

          {/* Email Field */}
          <FormRow
            type="email"
            name="email"
            values={values.email}
            handleChange={handleChange}
          />

          <button
            type="submit"
            className="btn-login btn-block-login"
            onClick={onSubmit}
          >
            Send Mail
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
