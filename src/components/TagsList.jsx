
import filteredTags from "./Main"
function TagsList() {

    return (
        <div className="w-25 ms-5">
            <h2 className="ps-1">Lista dei Tags</h2>
            <ul>
                {
                    filteredTags.map((tag) => {
                        return (
                            < li key={`card-tag-${index}xxx`}>{tag}</li>
                        )
                    }
                    )
                }

            </ul>
        </div >
    )

}
export { TagsList }



