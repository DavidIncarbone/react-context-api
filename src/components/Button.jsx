import style from "../style/Button.module.css"

function Button({ onDelete }) {

    return <button onClick={onDelete} className={style.btn}>Delete</button>
}

export default Button


// className = "btn btn-warning text-white"