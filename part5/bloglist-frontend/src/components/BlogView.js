import blogService from '../services/blogs'

const BlogView = ({blog}) => {
    
    const likeincrement = () => {
        blogService.like({blog})
    }

    const removeblog = () => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            blogService.del({blog})
        }
    }

    return (
        <div>
            <span> {blog.url} </span>
            <br></br>
            <span> likes {blog.likes} </span>
            <button onClick={likeincrement} className="likeButton">like</button>
            <br></br>
            <button onClick = {removeblog} className="deleteButton"> Remove </button>
        </div>
    )
}
    
export default BlogView