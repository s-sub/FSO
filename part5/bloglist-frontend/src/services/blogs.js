import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: {Authorization: token}
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token}
  }


  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (post) => {
  const config = {
    headers: {Authorization: token}
  }
  const likeincrement = post.blog.likes + 1
  const userid = post.blog.user.id

  const postupdate = Object.assign(post.blog, {likes: likeincrement, user: userid})
  const response = await axios.put(baseUrl+'/'+post.blog.id, postupdate, config)
  return response.data
}

const del = async (post) => {
  const config = {
    headers: {Authorization: token}
  }

  console.log(post.blog)

  const response = await axios.delete(baseUrl+'/'+post.blog.id, config)
  return response.data

}

export default { getAll, create, setToken, like, del}