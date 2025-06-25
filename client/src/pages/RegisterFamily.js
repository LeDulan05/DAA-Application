import React,{useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup'
import axios from "axios";


function RegistrationPage() {
    const [familyId, setFamilyId] = useState(null);
    const [familyRegistered, setFamilyRegistered] = useState(false);

    return (
        <div className='RegistrationPage'>
            <h1>Family Registration</h1>
            <RegisterFamily 
                onFamilyRegistered={(id) => {
                    setFamilyId(id);
                    setFamilyRegistered(true);
                }} 
            />
            
            {familyRegistered && (
                <>
                    <hr />
                    <h2>Household Composition</h2>
                    <p>Registering for Family ID: {familyId}</p>
                    <RegisterHouseComp familyId={familyId} />
                </>
            )}
        </div>
    )
}


function RegisterFamily({onFamilyRegistered}) {
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

      const createdFamily = response.data;
            if (createdFamily && createdFamily.FamilyID) {
                onFamilyRegistered(createdFamily.FamilyID);
            }
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
                id="inputRegisterFamily1" 
                name="Name" 
                placeholder="Garcia"/>

                <label>Address:</label>
                <ErrorMessage name="Address" component="span"/>
                <Field 
                autoComplete="off"
                id="inputRegisterFamily2" 
                name="Address" 
                placeholder="7th Street"/>

                <label>Contact:</label>
                <ErrorMessage name="Contact" component="span"/>
                <Field 
                autoComplete="off"
                id="inputRegisterFamily3" 
                name="Contact" 
                placeholder="0991234141"/>

                <label>Email:</label>
                <ErrorMessage name="Address" component="span"/>
                <Field 
                autoComplete="off"
                id="inputRegisterFamily4" 
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

function RegisterHouseComp({familyId}){
    const InitialValues ={
        FamilyID: familyId || '',
        NumChildren:'',
        NumSeniors:'',
        NumPWD:'',
    }
    const validationSchema = Yup.object().shape({
       NumChildren: Yup.number().integer(),
        NumSeniors: Yup.number().integer(),
        NumPWD: Yup.number().integer(),
    })

    const onSubmit = (data) => {

         const submissionData = {
            ...data,
            FamilyID: familyId
        };

        axios.post("http://localhost:3001/HouseCompRoute", submissionData).then((response)=>{
      console.log("HouseCOMP WORKED")
    });
    }

    return (
    <div className='RegisterHouseComp'> 
        <Formik initialValues={InitialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <label>Input Number of Children:</label>
                <ErrorMessage name="Input Number of Children" component="span"/>
                <Field 
                autoComplete="off"
                id="inputRegisterHouseComp1" 
                name="NumChildren" 
                placeholder="0991234141"/>

                <label>Input Number of Senior Citizens:</label>
                <ErrorMessage name="Input Number of Senior Citizens" component="span"/>
                <Field 
                autoComplete="off"
                id="inputRegisterHouseComp2" 
                name="NumSeniors" 
                placeholder="0991234141"/>

                <label>Input Number of Person with Disability:</label>
                <ErrorMessage name="Input Number of PWD's" component="span"/>
                <Field 
                autoComplete="off"
                id="inputRegisterHouseComp3" 
                name="NumPWD" 
                placeholder="0991234141"/>

                <button type = "submit">Register House Composition</button>
            </Form>
        </Formik>
    </div>
  )
}


export default RegistrationPage;

