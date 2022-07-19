import PostsList from "./features/posts/PostsList/PostsList";
import AddPostForm from "./features/posts/PostForm/AddPostForm";
import "./App.css";

function App() {
    return (
        <main className="App">
            <AddPostForm />
            <PostsList />
        </main>
    );
}

export default App;
