import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup'
import axios from "axios";


function RegisterFamily() {
    const intialValues ={
        Name:"",
        Address:"",
        Contact:"",
        Email:"",
        RepresentativeConfirmation:false,
    }

    const validationSchema = Yup.object().shape({
        Name: Yup.string().required(),
        Address: Yup.string(),
        Contact: Yup.string(),
        Email: Yup.string(),
        RepresentativeConfirmation: Yup.boolean()
        .oneOf([true], "You must confirm this statement")
        .required("Confirmation is required")
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/FamilyTableRoute", data).then((response)=>{
      console.log("IT WORKED")
    });
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
                <ErrorMessage name="Contact" component="span"/>
                <Field 
                autoComplete="off"
                id="inputRegisterFamily" 
                name="Contact" 
                placeholder="0991234141"/>

                <label>Email:</label>
                <ErrorMessage name="Address" component="span"/>
                <Field 
                autoComplete="off"
                id="inputRegisterFamily" 
                name="Email" 
                placeholder="Dulan@Gmail.com"/>

                <div className="confirmation-checkbox">
                <label>
                <Field 
                type="checkbox" 
                name="RepresentativeConfirmation" 
                required/>
                I confirm that I am the sole representative of my household applying for this assistance.
                </label>
                <ErrorMessage name="confirmation" component="div" className="error-message"/>
                </div>

                <button type = "submit">Register Family</button>
            </Form>
        </Formik>
    </div>
  )
}

export default RegisterFamily
