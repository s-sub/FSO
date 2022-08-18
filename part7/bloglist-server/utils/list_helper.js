const dummy = (blogs) => {
    return(1)
  }
  


const totalLikes = (blogs) => {
    var sum = 0;
    blogs.forEach((blog,i) => {
        sum = sum + blog.likes
    })
    return sum
}

const favoriteBlog = (blogs) => {
    var maxblog = undefined;
    var max = -100;
    blogs.forEach((blog,i) => {
        max = Math.max(max,blog.likes)
        if (blog.likes===max) {
            maxblog = blog
        }
    })
    return maxblog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}