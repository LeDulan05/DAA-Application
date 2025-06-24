import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup'

function RegisterFamily() {

    const intialValues ={
        Name:"",
        Address:"",
        Contact:"",
    }

    const validationSchema = Yup.object().shape({
        Name: Yup.string().required(),
        Address: Yup.string(),
        Contact: Yup.string()
    })

    const onSubmit = (data) => {
        console.log(data);
    }
  return (
    <div className='RegisterFamilyPage'>
        <Formik initialValues={intialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <label>Family Name:</label>
                <ErrorMessage name="Name" component="span"/>
                <Field
                autoComplete="off" 
                id="inputRegisterFamily" 
                name="Name" 
                placeholder="Garcia"/>

                <label>Address:</label>
                <ErrorMessage name="Address" component="span"/>
                <Field 
                autoComplete="off"
                id="inputRegisterFamily" 
                name="Address" 
                placeholder="7th Street"/>

                <label>Contact:</label>
                <ErrorMessage name="Address" component="span"/>
                <Field 
                autoComplete="off"
                id="inputRegisterFamily" 
                name="Contact" 
                placeholder="0991234141"/>

                <button type = "submit">Register Family</button>
            </Form>
        </Formik>
    </div>
  )
}

export default RegisterFamily
