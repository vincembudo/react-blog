import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/loading.js";
import MessageModal from "../components/message_modal.js";
import '../components/mystyle.css'

function Home(){
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const token = localStorage.getItem('token')
    const[loading,setLoading]=useState(true)
    const [posts,setPosts]=useState([])

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        
        if (user) {
            axios.get(`/api/posts/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res);
                setPosts(res.data.posts);
                setLoading(false);
            }).catch(error => {
                console.error(error);
                setLoading(false);
            });
        } else {
            axios.get('/api/posts').then(res => {
                console.log(res);
                setPosts(res.data.posts);
                setLoading(false);
            }).catch(error => {
                console.error(error);
                setLoading(false);
            });
        }
    }, [token]); 
    
    
    

    const deletePost = (e, id)=>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        axios.delete(`/api/posts/${id}/destroy`,config).then(res=>{
            setModalMessage(res.data.message)
            setShowModal(true)
            thisClicked.closest("#card-div").remove()
        }).catch(function(error){
            if(error.response.status===404){
                alert(error.response.data.errors)
                thisClicked.innerText="Delete"
            }

            if(error.response.status===500){
                alert(error.response.data)
            }
        });
    }
    
    if(loading){
        return(
            <Loading />
        )
    }

    var cardBody=""
    var cardHeader=""
    if(JSON.parse(sessionStorage.getItem('user'))){
        
        cardBody= posts.map((item, index)=>{

            const dateString = item.created_at;
            const date = new Date(dateString);
            const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'Asia/Manila' 
            };
            const formattedDate = date.toLocaleString('en-US', options);

            
            return(
                <div id="card-div" className="card" key={index}>
                    <h5 className="card-header">{formattedDate}</h5>
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.body}</p>
                        <div className="flot-end">
                            <Link to={`/post/${item.id}/edit`} className="btn btn-success">Edit</Link>
                            <button type="button" onClick={(e)=>deletePost(e,item.id)} className="btn btn-danger ">Delete</button>
                        </div>
                    </div>
                </div>
            )
        })
        cardHeader=(
                <div className="card-header">
                    <h4>Post
                        <Link to="/post/create" className="btn btn-primary float-end">Add Post</Link>
                    </h4>
                </div>
        )
    }else{
        cardBody= posts.map((item, index)=>{
            const dateString = item.created_at;
            const date = new Date(dateString);
            const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'Asia/Manila' 
            };
            const formattedDate = date.toLocaleString('en-US', options);
            return(
                <div className="card" key={index}>
                    <h5 className="card-header">{formattedDate} by {item.user.name}</h5>
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.body}</p>
                    </div>
                </div>
            )
        })

        cardHeader=(
            <div className="card-header">
                <h4>Post</h4>
            </div>
    )
    }
    

    return(
        <div className="mh-500 container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        {cardHeader}
                        <div className="card-body">
                        {cardBody}
                        </div>
                        <MessageModal show={showModal} message={modalMessage} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;