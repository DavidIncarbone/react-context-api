import { useState, useEffect } from "react";
import axios from "axios";

const initialNewPost = {

    title: "",
    content: "",
    image: "",
    category: "",
    tags: [],
    published: false

};


const options = ["Cinema", "Calcio", "Viaggi"];
export default function Form({ handleSubmit, handleInput, handleTags, handlePublish }) {

    const [newPost, setNewPost] = useState(initialNewPost);
    const [filteredTags, setFilteredTags] = useState([]);
    const tagsAPI = "http://localhost:3000/tags"

    useEffect(() => {

        getTags()

    }, [])

    function getTags() {
        axios.get(tagsAPI).then((res) => {
            console.log(res.data)
            setFilteredTags(res.data.data)
        })
    }

    return (

        <form onSubmit={handleSubmit} className="w-50">
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
                    type="textarea"
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

            {filteredTags.map((tag) => {
                return (
                    <div className="mb-3 form-check" key={tag}>
                        <input
                            type="checkbox"
                            className="form-check-input tag-checkbox"
                            id="avaiable"
                            name="available"
                            onChange={handleTags}
                            value={tag}

                        />
                        <label className="form-check-label" htmlFor="avaiable">
                            {tag}
                        </label>
                    </div>
                )
            })}
            <input
                type="checkbox"
                className="form-check-input"
                id="published"
                name="published"
                onChange={
                    handlePublish
                }
                checked={newPost.published}
                value={newPost.published}

            />
            <label className="form-check-label ms-1" htmlFor="status">
                Pubblica
            </label>


            <button type="submit" className="btn btn-primary ms-3">
                Submit
            </button>
        </form>
    )
}