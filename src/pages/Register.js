import React, { useState } from 'react'
import axios from 'axios'
import Loading from '../components/loading.js'
import MessageModal from '../components/message_modal.js';

const Register = () => {
    
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const [inputErrorList, setInputErrorList] = useState({})
    const[loading,setLoading]=useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post('/api/register', formData)
            console.log(response.data)
            const { token, user } = response.data
            localStorage.setItem('token', token)
            sessionStorage.setItem('user', JSON.stringify(user))
            setModalMessage('Registered Successfully')
            setShowModal(true)
            setInputErrorList('')
            window.location.href='/'
            setLoading(false)
        } catch (error) {
            setInputErrorList(error.response.data.errors)
            setLoading(false)
        }
    };
    
    if(loading){
        return(
            <Loading />
        )
    }

    return (
        <div className='h-100'>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" />
                                        <span className="text-danger">{inputErrorList.name}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input type="eamil" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                                        <span className="text-danger">{inputErrorList.email}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" />
                                        <span className="text-danger">{inputErrorList.password}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password_confirmation">Repeat Password</label>
                                        <input type="password" id="password_confirmation" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} className="form-control" />
                                        <span className="text-danger">{inputErrorList.password_confirmation}</span>
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                </form>
                                <MessageModal show={showModal} message={modalMessage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Register;
