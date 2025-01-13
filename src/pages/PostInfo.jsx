import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const infoPostAPI = "http://localhost:3000/posts/"

export default function PostInfo() {

    const { id } = useParams();
    const [post, setPost] = useState({});


    useEffect(getInfo, [id])

    function getInfo() {
        axios.get(infoPostAPI + id).then((res) => {

            console.log(res.data.item)
            setPost(res.data.item)
            console.log(post)
        }).catch((error) => {
            console.log(error)
        })
            .finally(() => {
                console.log("finally")
            });
    }
    console.log(post)
    return (

        <div id="container" className="container pb-5">
            <h2 className="text-center py-1 text-bg-danger">{post.title}</h2>
            <h5 className="text-center">Descrizione</h5>
            <div id="info-img-container" className="w-25 me-3">
                <img id="info-post" src={post.image} alt={post.title} />
            </div>
            <div >
                <p>{post.content}
                </p>
            </div>
        </div>

    )
}



