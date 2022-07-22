import PostsList from "./features/posts/PostsList/PostsList";
import AddPostForm from "./features/posts/AddPostForm/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm/EditPostForm";
import PostPage from "./features/posts/PostPage/PostPage";
import UserList from "./features/users/UserList/UserList";
import UserPage from "./features/users/UserPage/UserPage";
import Layout from "./components/Layout/Layout";

import { Routes, Route, Navigate } from "react-router-dom";

// Index elements are going to match any request that does not match other ones inside of it's path
function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsList />} />
                <Route path="post">
                    <Route index element={<AddPostForm />} />
                    <Route path=":postId" element={<PostPage />} />
                    <Route path="edit/:postId" element={<EditPostForm />} />
                </Route>
                <Route path="user">
                    <Route index element={<UserList />}/>
                    <Route path=":userId" element={<UserPage />}/>
                </Route>
                <Route path="*" element={<Navigate to={"/"} replace />} />
            </Route>
        </Routes>
    );
}

export default App;
