import React, { useState } from 'react'
import axios from 'axios'
import Loading from '../components/loading.js'


function Login() {
    const[loading,setLoading]=useState(false);
    const [inputErrorList, setInputErrorList] = useState({})
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
       

    const loginUser = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/api/login', formData);
            const { token, user } = response.data;
            localStorage.setItem('token', token)
            sessionStorage.setItem('user', JSON.stringify(user))
            window.location.href='/'
            setLoading(false);
        } catch (error) {
            setInputErrorList(error.response.data.errors)
            alert('Invalid Credentials')
            setLoading(false)    
        } 
    };
    if(loading){
        return(
            <Loading />
        )
    }
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Login
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={loginUser}>
                                    <div className="mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                                        <span className="text-danger">{inputErrorList.email}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" />
                                        <span className="text-danger">{inputErrorList.password}</span>
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
