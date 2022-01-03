import React, { useEffect } from 'react'
import { Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { editorkey } from '../../util/constant';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Form.module.css';
import './CustomAntd.css';
import { updateProjectAction } from '../../redux/actions/ProjectActions';
import { HIDE_DRAWER } from '../../redux/types/DrawerType';

const {Option} = Select;

export default function FormUpdateProject() {
    const {categories, projectUpdate} = useSelector(state => state.ProjectReducer);
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            "id": projectUpdate?.id || 1,
            "projectName": projectUpdate?.projectName || "",
            "description": projectUpdate?.description || "",
            "categoryId": projectUpdate?.categoryId || 1
        },
        validationSchema: Yup.object({
            projectName: Yup.string().required('*Project Name is Required!'),
            description: Yup.string().required('*Description is Required!'),
        }),
        onSubmit: async (values) => {
            const isSuccess = dispatch(updateProjectAction(values));
            if(isSuccess) {
                dispatch({type: HIDE_DRAWER})
            }
        }
    })

    

    const handleEditorChange = (value) => {
        formik.setFieldValue("description", value);
    }

    const handleSelectChange = (value) => {
        formik.setFieldValue("categoryId", value);
    }

    const renderOptions = () => {
        return categories?.map((cate, index) => {
            return <Option key={index} value={cate.id}>{cate.projectCategoryName}</Option>
        })
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={styles['form']}>
                <div className={styles['field']}>
                    <p>Project Name</p>
                    <input value={formik.values.projectName} name="projectname" onChange={formik.handleChange} placeholder='type something...' className={styles['field-input']} type='text' name='projectName' />
                    <p className={styles['error']}>
                        {formik.touched.projectName && formik.errors.projectName ? formik.errors.projectName : ""}
                    </p>
                </div>
                <div className={styles['field']}>
                    <p>Description</p>
                    <Editor
                        value={formik.values.description}
                        name="description"
                        onEditorChange={handleEditorChange}
                        apiKey={editorkey}
                        init={{
                        height: 180,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    <p className={styles['error']}>
                        {formik.touched.description && formik.errors.description ? formik.errors.description : ""}
                    </p>
                </div>
                <div className={styles['field']}>
                    <p>Category</p>
                    <Select name="categoryId" onSelect={handleSelectChange} className={styles['field-input']} value={formik.values.categoryId } style={{ width: '100%'}}>
                        {renderOptions()}
                    </Select>
                </div>
                <button type='submit' className={styles['button']}>Save Changes</button>
            </form>
        </div>
    )
}
