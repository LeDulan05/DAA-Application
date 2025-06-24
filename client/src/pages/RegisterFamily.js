import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";

function RegisterFamily() {
  return (
    <div className='RegisterFamilyPage'>
        <Formik >
            <Form>
                <label>Family Name:</label>
                <Field 
                id="inputRegisterFamily" 
                name="Name" 
                placeholder="Garcia"/>
            </Form>
        </Formik>
    </div>
  )
}

export default RegisterFamily
