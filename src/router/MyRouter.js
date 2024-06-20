import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home.js'
import Login from '../pages/Login.js'
import Register from '../pages/Register.js'
import PostCreate from '../pages/PostCreate.js'
import PostEdit from '../pages/PostEdit.js'




function MyRouter(){



    return(
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/post/create" element={<PostCreate />}/>
            <Route path="/post/:id/edit" element={<PostEdit />}/>
        </Routes>
        
    )
}
export default MyRouter;