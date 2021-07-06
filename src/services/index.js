import GET from './Get'
import POST from './Post'

// GET
const getKeyword = (keyword) => GET.General(`api/keyword?search=${keyword}`, true)
const logout = () => GET.General(`rest-auth/logout`, true)
const getDosen = (key) => GET.GetAuth(`api/dosen`, true, key)
const getUser = (key) => GET.GetAuth(`rest-auth/user`, true, key)

// POST
const postPaper = (data, key) => POST.PostAuth(`api/reksis`, true, data, key)
const googleLogin = (data) => POST.General(`rest-auth/google/`, true, data)


const API = {
    getKeyword,
    getDosen,
    postPaper,
    googleLogin,
    getUser,
    logout
}

export default API;