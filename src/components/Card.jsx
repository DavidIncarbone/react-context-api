import { useState } from 'react'
import Button from "./Button";
import style from "../style/Button.module.css"
import tagsStyle from "../style/Tags.module.css";
import InfoButton from "./InfoButton";
import { Link } from "react-router-dom";







function Card({ title, description, image, id, tags, category, onDelete }) {

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

        <li key={id} className="list-unstyled ">
            <div className={`card container mb-5 ${borderRed ? style.isActive : ""}`} onClick={toggleActive} style={{
                width: 15 + "rem"
            }}>
                <img className="card-img-top" src={image} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text"><b>{description}</b></p>
                    <div className='d-flex justify-content-around'>
                        <div className="w-25 flex-wrap">{tags.map((tag) => {
                            return (tag === "html" && <div key={"html"} className={tagsStyle.green} >{tag}</div> ||
                                tag === "css" && <div key={"css"} className={tagsStyle.pink}>{tag}</div> ||
                                tag === "js" && <div key={"js"} className={tagsStyle.yellow}>{tag}</div> ||
                                tag === "php" && <div key={"php"} className={tagsStyle.red}>{tag}</div>
                            )
                        })}</div>
                        <div className="d-flex flex-column">
                            <div>Categoria:</div>
                            <div><b>{category}</b></div>
                        </div>
                    </div>
                    <div className="w-100 d-flex justify-content-end h-25 pt-3">
                        <Link to={"/posts" + "/" + id} className="btn btn-info me-3">info</Link>
                        <button className="bg-primary text-white" onClick={onDelete} >Delete</button>
                    </div>


                </div>
            </div>
        </li>

    )
}

export default Card;