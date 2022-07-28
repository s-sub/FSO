import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
  // return request.then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const delete1 = id => {
    console.log(`${baseUrl}/${id}`)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id,newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  delete1: delete1,
  update: update
}