import axios from "axios"

//This is for so we dont rewrite url this every time
const instance=axios.create({
    baseURL:"https://api.themoviedb.org/3"
})


export default instance;