// IMPORT

import { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import { useGlobalContext, GlobalProvider } from "../context/GlobalContext";

const postsAPI = "http://localhost:3000/posts";
const tagsAPI = "http://localhost:3000/tags"

// FUNCTIONS


function Main() {
    const [myPosts, setMyPosts] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);
    const { postsList, getPosts } = useGlobalContext();
    const { setAlertData } = useGlobalContext();
    // ***** FUNCTIONS *****
    //GET DATA
    useEffect(() => {
        // getData();
        getTags()

    }, [])

    // function getData() {
    //     axios.get(postsAPI).then((res) => {
    //         console.log(res.data)
    //         setMyPosts(res.data.data)
    //         console.log(res.data.data)
    //     })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }
    function getTags() {
        axios.get(tagsAPI).then((res) => {
            console.log(res.data)
            setFilteredTags(res.data.data)
        })
    }

    //DELETE
    function deleteItem(id, title) {

        axios.delete(postsAPI + "/" + id).then((res) => {

            getPosts();

            setAlertData({
                type: "success",
                message: `Il post "${title}" è stato eliminato con successo!`,
            });
        });

    }

    //HANDLE

    function handleInput(event) {
        const name = event.target.name
        const value =
            event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setNewPost({ ...newPost, [name]: value });
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios.post(postsAPI, newPost).then(() => {
            getData();
            setNewPost(initialNewPost);
            document.querySelectorAll('.tag-checkbox').forEach((ch) => {
                ch.checked = false
            });

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
        <main>



            <div className="d-flex justify-content-between align-items-center px-3 pb-3">
                <form className="d-flex h-25  w-25">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="button">Search</button>
                </form>

                <Link to={"/posts/create"} className="btn btn-warning h-25 ms-5">Crea Nuovo Post</Link>
                <div className="w-25 ms-5 align-self-end ">
                    <h2 className="ps-1 text-center">Lista dei Tags</h2>
                    <ul className="text-bg-dark">
                        {
                            filteredTags.map((tag, index) => {
                                return (
                                    <li key={`card-tag-${index}xxx`}>{tag}</li>
                                )
                            }
                            )
                        }
                    </ul>
                </div >
            </div>




            <div className="container d-flex">

                <ul className="d-flex flex-wrap gap-5">
                    {postsList.filter((post) => post.published)
                        .map((post) => {
                            return (
                                <Card title={post.title}
                                    description={post.content.substring(0, 100) + "..."}
                                    image={post.image}
                                    key={post.id}
                                    tags={post.tags}
                                    category={post.category}
                                    id={post.id}
                                    onDelete={() => deleteItem(post.id, post.title)}
                                />
                            )
                        })}
                </ul>

            </div>


        </main >
    )
}


export default Main