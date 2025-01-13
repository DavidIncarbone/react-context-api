import { useState } from 'react'
import Button from "./Button";
import style from "../style/Button.module.css"
import tagsStyle from "../style/Tags.module.css";
import InfoButton from "./InfoButton";
import { Link } from "react-router-dom";







function Card({ title, description, image, id, tags, onDelete }) {

    const [borderRed, setBorderRed] = useState(false);
    function toggleActive() {
        setBorderRed(!borderRed)
    }

    const [numero, setNumero] = useState(0);
    function increment(event) {
        event.stopPropagation()
        setNumero(numero + 100)
    }
    return (

        <li key={id} className="list-unstyled">
            <div className={`card container mb-5 ${borderRed ? style.isActive : ""}`} onClick={toggleActive} style={{
                width: 15 + "rem"
            }}>
                <img className="card-img-top" src={image} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text"><b>{description}</b></p>
                    <div className='d-flex justify-content-between'>
                        <div>{tags.map((tag) => {
                            return (tag === "html" && <span key={"html"} className={tagsStyle.green} >{tag}</span> ||
                                tag === "css" && <span key={"css"} className={tagsStyle.pink}>{tag}</span> ||
                                tag === "js" && <span key={"js"} className={tagsStyle.yellow}>{tag}</span> ||
                                tag === "php" && <span key={"php"} className={tagsStyle.red}>{tag}</span>
                            )
                        })}</div>
                        <Link to={"/posts" + "/" + id} className="btn btn-info">info</Link>
                        <button className="bg-primary text-white" onClick={onDelete} >Delete</button></div>

                </div>
            </div>
        </li>

    )
}

export default Card;