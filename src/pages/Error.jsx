import { Link } from "react-router-dom";

export default function Error() {
    return (
        <>
            <h1 className="text-center py-5">404 Pagina non trovata</h1>
            <div className="d-flex justify-content-center">
                <Link to={"/posts"} className="btn btn-danger">Torna alla lista dei posts</Link>
            </div>
        </>
    )
}