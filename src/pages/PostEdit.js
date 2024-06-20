import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loading from "../components/loading.js"
import MessageModal from "../components/message_modal.js"
import '../components/mystyle.css'
function PostEdit(){

    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    let { id } = useParams();

    const token = localStorage.getItem('token')
    const[loading,setLoading]=useState(true);
    const [inputErrorList, setInputErrorList] = useState({})
    const [post, setPost] = useState({})

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.get(`/api/posts/${id}/show`,config)
            .then(res => {
                    setPost(res.data.data)
                    setLoading(false)
             
            })
            .catch(error => {
                if(error.response.status===404){
                    alert(error.response.data.errors)
                    setLoading(false);
                }
        
                if(error.response.status===500){
                    alert(error.response.data)
                    setLoading(false);
                }
                setLoading(false);
            });
    }, [id,token]);
    

    const handleInput= (e) =>{
        e.persist();
        setPost({...post,[e.target.name]:e.target.value});
    }

    const updatePost= (e) =>{
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

        axios.put(`/api/posts/${id}/update`,data,config).then(res=>{
            setModalMessage(res.data.message)
            setShowModal(true)
            setInputErrorList('')
            setLoading(false)
        }).catch(function(error){
            if(error.response.status===404){
                setModalMessage(error.response.data.errors)
                setShowModal(true)
                setLoading(false)
            }

            if(error.response.status===422){
                setModalMessage(error.response.data.errors)
                setShowModal(true)
                setLoading(false)
            }

            if(error.response.status===500){
                alert(error.response.data)
                setLoading(false)
            }
        });
    }

    if(loading){
        return(
            <Loading />
        )
    }

    if(Object.keys(post).length === 0){
        return(
            <div className="container">
                <h4>No Such Post ID Found</h4>
            </div>
        )
    }
 

    return(
        <div className="mh-500">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Post
                                    <Link to="/" className="btn btn-primary float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updatePost}>
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
                                        <button type="submit" className="btn btn-primary">Update Post</button>
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
}
export default PostEdit;