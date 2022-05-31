import React from 'react'
import styles from './Login-Signup.module.css';
import { Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useFormik} from 'formik'
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../redux/actions/UserActions';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('*Invalid email address!').required('*Email is Required!'),
            password: Yup.string().required("*Password is required!")
        }),
        onSubmit: async (values) => {
            console.log(values);
            let isSuccess = await dispatch(loginAction(values));
            if(isSuccess) navigate("/");
            else {
                formik.setFieldError('email', ' ');
                formik.setFieldError('password', '*Email or Password is invalid!');
            }
        },
    });

    const styleError = {
        borderColor: 'rgb(219, 15, 15)',
        boxShadow: 'none',
    }
    

    return (
        <form onSubmit={formik.handleSubmit} className={styles['form']}>
            <h1 className={styles['title']}>Login</h1>
            <div className={styles['field']}>
                <Input style={formik.touched.email && formik.errors.email 
                    ? styleError
                    : null }
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email} 
                    size="large" 
                    placeholder=" abc@gmail.com"
                    prefix={<UserOutlined />} />
                <p className={styles['error']}>
                    {formik.touched.email && formik.errors.email 
                    ? formik.errors.email
                    : ""}
                </p>
            </div>
            <div className={styles['field']}>
                <Input style={formik.touched.password && formik.errors.password 
                    ? styleError
                    : null }
                    name='password'
                    onChange={formik.handleChange}
                    value={formik.values.password} 
                    size="large" 
                    placeholder=" Password"
                    prefix={<LockOutlined />}
                    type="password" />
                <p className={styles['error']}>
                    {formik.touched.password && formik.errors.password 
                    ? formik.errors.password
                    : ""}
                </p>
            </div>
            <button type='submit' className={styles['button']}>Login</button>
            <p className={styles['navigate']}>
                Not a member? <NavLink to="/signup" className={styles['navigate']}>Sign up</NavLink>
            </p>
        </form>
    )
}
