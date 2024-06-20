import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import Loading from "../components/loading.js"
import MessageModal from '../components/message_modal.js'
import '../components/mystyle.css'
function PostCreate(){

    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const token = localStorage.getItem('token')
    const user = JSON.parse(sessionStorage.getItem('user'))

    const[loading,setLoading]=useState(false)
    const [inputErrorList, setInputErrorList] = useState({})
    const [post, setPost] = useState({
        title:'',
        body:''  
    })

    const handleInput= (e) =>{
        e.persist();
        setPost({...post,[e.target.name]:e.target.value});
    }

    const addPost= (e) =>{
        e.preventDefault();
        setLoading(true);
        const data={
            title:post.title,
            body:post.body
        }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }    

    axios.post(`/api/posts/${user.id}/store`,data,config).then(res=>{
            setModalMessage(res.data.message)
            setShowModal(true)
            setInputErrorList('')
            window.location.href='/'
            setLoading(false)
        }).catch(function(error){
            if(error.response.status===422){
                setInputErrorList(error.response.data.errors)
                setLoading(false)
            }

            if(error.response.status===500){
                alert(error.response.data)
                setLoading(false);
            }
        });
    }

    if(loading){
        return(
            <Loading />
        )
    }

    return(
        <div className="mh-500">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Post
                                    <Link to="/" className="btn btn-primary float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={addPost}>
                                    <div className="mb-3">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" id="title" name="title" value={post.title} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.title}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="body">Body</label>
                                        <textarea id="body" name="body" value={post.body} onChange={handleInput} className="form-control">

                                        </textarea>
                                        <span className="text-danger">{inputErrorList.body}</span>
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary">Add Post</button>
                                    </div>
                                </form>
                                <MessageModal show={showModal} message={modalMessage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostCreate;