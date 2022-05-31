import React from 'react'
import styles from './Login-Signup.module.css';
import { Input } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import {useFormik} from 'formik'
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginAction, signupAction } from '../../redux/actions/UserActions';
import { SHOW_TOAST } from '../../redux/types/ToastType';

export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            "email": "",
            "passWord": "",
            "name": "",
            "phoneNumber": ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email('*Invalid email address!').required('*Email is Required!'),
            passWord: Yup.string().required("*Password is required!"),
            name: Yup.string().required("*Name is required!"),
            phoneNumber: Yup.string().required("*Phone number is required!"),
        }),
        onSubmit: async (values) => {
            console.log(values);
            let isSuccess = await dispatch(signupAction(values));
            if(isSuccess) {
                dispatch({
                    type: SHOW_TOAST,
                    toast: {
                        id: Date.now(),
                        type: "success",
                        title: "Yay! Everything worked.",
                        description: "Login now!!"
                    }
                })
            }
            else {
                formik.setFieldError('email', ' ');
                formik.setFieldError('passWord', ' ');
                formik.setFieldError('name', ' ');
                formik.setFieldError('phoneNumber', '*Something is invalid!');
            }
        },
    });

    const styleError = {
        borderColor: 'rgb(219, 15, 15)',
        boxShadow: 'none',
    }
    

    return (
        <form onSubmit={formik.handleSubmit} className={styles['form']}>
            <h1 className={styles['title']}>Sign Up</h1>
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
                <Input style={formik.touched.passWord && formik.errors.passWord 
                    ? styleError
                    : null }
                    name='passWord'
                    onChange={formik.handleChange}
                    value={formik.values.password} 
                    size="large" 
                    placeholder=" Password"
                    prefix={<LockOutlined />} />
                <p className={styles['error']}>
                    {formik.touched.passWord && formik.errors.passWord 
                    ? formik.errors.passWord
                    : ""}
                </p>
            </div>
            <div className={styles['field']}>
                <Input style={formik.touched.name && formik.errors.name 
                    ? styleError
                    : null }
                    name='name'
                    onChange={formik.handleChange}
                    value={formik.values.name} 
                    size="large" 
                    placeholder=" Name"
                    prefix={<UserOutlined />} />
                <p className={styles['error']}>
                    {formik.touched.name && formik.errors.name 
                    ? formik.errors.name
                    : ""}
                </p>
            </div>
            <div className={styles['field']}>
                <Input style={formik.touched.phoneNumber && formik.errors.phoneNumber 
                    ? styleError
                    : null }
                    name='phoneNumber'
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber} 
                    size="large" 
                    placeholder=" PhoneNumber"
                    prefix={<PhoneOutlined />} />
                <p className={styles['error']}>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber 
                    ? formik.errors.phoneNumber
                    : ""}
                </p>
            </div>
            <button type='submit' className={styles['button']}>Login</button>
            <p className={styles['navigate']}>
                Have an account? <NavLink to="/login" className={styles['navigate']}>Login now</NavLink>
            </p>
        </form>
    )
}

