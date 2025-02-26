import Form from "../components/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useGlobalContext } from "../context/GlobalContext";


const initialNewPost = {

    title: "",
    content: "",
    image: "",
    category: "",
    tags: [],
    published: false

};


const options = ["Cinema", "Calcio", "Viaggi"];
const postsAPI = "http://localhost:3000/posts";
const tagsAPI = "http://localhost:3000/tags";



export default function AddPost() {

    const [newPost, setNewPost] = useState(initialNewPost);
    const [filteredTags, setFilteredTags] = useState([]);
    const tagsAPI = "http://localhost:3000/tags";
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { setAlertData } = useGlobalContext();
    const { postsList, getPosts } = useGlobalContext();


    useEffect(() => {

        getTags()


    }, [])

    function getTags() {
        axios.get(tagsAPI).then((res) => {
            console.log(res.data)
            setFilteredTags(res.data.data)
        })
    }

    function handleInput(event) {
        const name = event.target.name
        const value =
            event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setNewPost({ ...newPost, [name]: value });
    }
    function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        const published = document.getElementById("published");
        !published.checked
            ? (alert("Cliccare su `Pubblica` per pubblicare il post"), setIsLoading(false))

            : axios.post(postsAPI, newPost).then((res) => {
                getPosts();
                setNewPost(initialNewPost);
                setIsLoading(false);
                const title = res.data.title;
                setAlertData({
                    type: "success",
                    message: `Il post "${title}" è stato creato con successo!`,
                });


                navigate("/posts");
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false);
            })

    }
    function handleTags(event) {

        setNewPost((newPost) => {
            let { tags, ...others } = newPost;
            if (tags.includes(event.target.value)) {
                tags = tags.filter((tag) => tag !== event.target.value)
            } else {
                tags = [...tags, event.target.value]
            }
            return {
                tags, ...others
            }
        })
    }


    return (

        <>
            {isLoading && <Loader />}
            <section className="my-4 ms-4 ">
                <h2 className="text-center">Aggiungi nuovo post</h2>
                <form onSubmit={handleSubmit} id="form-post" className="w-50 m-auto p-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            aria-describedby="titlelHelp"
                            onChange={handleInput}
                            value={newPost.title}
                            name="title"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="content"
                            aria-describedby="contentlHelp"
                            onChange={handleInput}
                            value={newPost.content}
                            name="content"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            Image
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="image"
                            aria-describedby="imagelHelp"
                            onChange={handleInput}
                            value={newPost.image}
                            name="image"
                        />
                    </div>
                    <select className="form-select mb-3" aria-label="Default select example" type="textarea"
                        id="category"
                        aria-describedby="categorylHelp"
                        onChange={handleInput}
                        value={newPost.category}
                        name="category">
                        <option defaultValue>Scegli la categoria</option>
                        {options.map((option) => {
                            return (<option key={crypto.randomUUID()} value={option}>{option}</option>)
                        })}
                    </select>
                    <div className="border border-2 p-1">
                        {filteredTags.map((tag) => {
                            return (
                                <div key={tag} className="form-check">
                                    <input className="form-check-input" type="checkbox" value={tag} id="tag" onChange={handleTags} />
                                    <label className="form-check-label" htmlFor="tag">
                                        {tag}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="d-flex mt-2 ">
                            <input
                                type="checkbox"
                                className="form-check-input "
                                id="published"
                                name="published"
                                onChange={
                                    handleInput
                                }
                                checked={newPost.published}
                                value={newPost.published}

                            />
                            <label className="form-check-label ms-1" htmlFor="status">
                                Pubblica
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary ms-3 mt-3">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}


