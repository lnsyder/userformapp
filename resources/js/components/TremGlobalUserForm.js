import React, {useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import {Formik} from 'formik';
import * as Yup from 'yup';

const initialServerResState =
    {
        status: "",
        message: ""
    }

function TremGlobalUserForm() {

    const [serverRes, setServerRes] = useState(initialServerResState);

    return (
        <div className="container">

            <div className="row justify-content-center">
                <div className="col-md-8 mt-5">
                    <div className="card">
                        <Formik
                            initialValues={{fullname: '', email: '', phone: ''}}
                            validate={values => {
                                const errors = {};

                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                if (!values.fullname) {
                                    errors.fullname = 'Required';
                                }
                                if (!values.phone) {
                                    errors.phone = 'Required';
                                } else if (
                                    !/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(values.phone)
                                ) {
                                    errors.phone = 'Invalid phone number';
                                }

                                return errors;
                            }}

                            onSubmit={(values, {setSubmitting}) => {
                                try {
                                    axios({
                                        method: 'post',
                                        url: 'api/user-form',
                                        data: values
                                    })
                                        .then(function (response) {
                                            if (response.status == 200) {

                                                setServerRes({
                                                    status: "alert alert-success",
                                                    message: response.data.message
                                                });
                                            }
                                            else{
                                                setServerRes({
                                                    status: "alert alert-warning",
                                                    message: response.data.message
                                                });
                                            }
                                        })
                                        .catch(function (error) {
                                            setServerRes({
                                                status: "alert alert-danger",
                                                message: error.response.data.message
                                            });
                                        });
                                } catch (e) {
                                    console.log(e)
                                } finally {
                                    setSubmitting(false)
                                }
                            }}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting
                              }) => (
                                <form className="m-3" onSubmit={handleSubmit}>
                                    <h2>Trem Global User Form</h2>
                                    <div className="form-group pb-2">
                                        <label htmlFor="exampleInputFullname1">Fullname</label>
                                        <input className="form-control" id="exampleInputFullname1"
                                               type="text"
                                               name="fullname"
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               value={values.fullname}
                                        />
                                        {errors.fullname && touched.fullname && <div className="text-danger">
                                            {errors.fullname}
                                        </div>
                                        }
                                    </div>

                                    <div className="form-group pb-2">
                                        <label htmlFor="exampleInputEmail1">E-Mail Address</label>
                                        <input className="form-control" id="exampleInputEmail1"
                                               type="email"
                                               name="email"
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               value={values.email}
                                        />
                                        {errors.email && touched.email && <div className="text-danger">
                                            {errors.email}
                                        </div>
                                        }
                                    </div>

                                    <div className="form-group pb-2">
                                        <label htmlFor="exampleInputPhone1">Phone Number</label>
                                        <input className="form-control" id="exampleInputPhone1"
                                               type="tel"
                                               name="phone"
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               value={values.phone}
                                        />
                                        {errors.phone && touched.phone && <div className="text-danger">
                                            {errors.phone}
                                        </div>
                                        }
                                    </div>


                                    <div className="form-group pt-1">
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </div>

                                    {serverRes.message && <div id="response_message" className={`m-0 mt-2 ${serverRes.status}`} role="alert">
                                        {serverRes.message}
                                    </div>}
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TremGlobalUserForm;

if (document.getElementById('tremglobaluserform')) {
    ReactDOM.render(<TremGlobalUserForm/>, document.getElementById('tremglobaluserform'));
}
