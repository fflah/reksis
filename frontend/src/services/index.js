import GET from './Get'
import POST from './Post'

// GET
const getKeyword = (keyword) => GET.General(`api/keyword?search=${keyword}`, false)
const logout = () => GET.General(`rest-auth/logout`, false)
const getDosen = (key) => GET.GetAuth(`api/dosen`, false, key)
const getUser = (key) => GET.GetAuth(`rest-auth/user`, false, key)

// POST
const postPaper = (data, key) => POST.PostAuth(`api/reksis`, false, data, key)
const googleLogin = (data) => POST.General(`rest-auth/google/`, false, data)


const API = {
    getKeyword,
    getDosen,
    postPaper,
    googleLogin,
    getUser,
    logout
}

export default API;