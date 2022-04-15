import  Head  from "next/head"
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../store/GlobalState'
import valid from '../utils/valid'
import {patchData} from '../utils/fetchData'
import { imageUpload } from '../utils/ImageUpload'

import { AiOutlineCamera } from 'react-icons/ai'
import Link from "next/link"

const Profile = () => {


    const {state,dispatch} = useContext(DataContext);
    const {auth, notify, orders} = state

    const initialState = {
        avatar: '',
        name: '',
        password: '',
        cf_password: ''
    }

    const [data, setData] = useState(initialState)
    const {avatar, name, password, cf_password} = data

    useEffect(() => {
      if (auth.user) {
          setData({ ...data, name: auth.user.name })
      }
    }, [auth.user])


    const handleChange = (e) => {
        const {name, value} = e.target
        setData({ ...data, [name]:value})
        dispatch({ type: 'NOTIFY', payload: {}})
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault()
        if(password) {
            const errMsg = valid(name, auth.user.email, password, cf_password)
            if (errMsg) {
                return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })
            }
            updatePassword()
        }

        if (name != auth.user.name || avatar) {
            updateInfo()
        }
    }

    const updatePassword = () =>{
        // dispatch({ type: 'NOTIFY', payload: {loading: true} })
        patchData("user/resetPass", { password}, auth.token).then(res =>
            {
                if (res.err) {
                    return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
                }
                
                else{
                    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                }
            }
            
        )
    }

    const updateInfo = async() =>{
        let media

        if (avatar) {
            media = await imageUpload([avatar])
        }

        patchData('user',{
            name, avatar:avatar ? media[0].url : auth.user.avatar
        }, auth.token).then(res =>{
            if (res.err) {
                return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
            }
            dispatch({ type: 'AUTH', payload: {
                token: auth.token,
                user: res.user
            }})
            return dispatch({ type: 'NOTIFY', payload: {success: res.msg } })
        })

    }

    const changeAvatar = (e) => {

        const file = e.target.files[0]
        if (!file) {
            return dispatch({ type: 'NOTIFY', payload: { error: "File does not exist" } })
        }
        if (file.size > 1024 * 1024) { // 5MB
            return dispatch({ type: 'NOTIFY', payload: { error: "The large file size is 1MB" } })
        }
        if (file.type !== "image/jpeg" && file.type !== "image/png") { // 5MB
            return dispatch({ type: 'NOTIFY', payload: { error: "Image format is not supported" } })
        }

        else{
            setData({...data, avatar: file})
        }
       
    }
    

    if (!auth.user) {
        return null
    }

    return ( 
        <div className="profile_page">
            <Head>
                <title>Profile</title>
            </Head>
            <section className="row text-scondary my-3">
                <div className="col-md-4">
                    <h3 className="text-center text-uppercase">
                        {auth.user.role === "user" ? 'User Profile': 'Admin Profile'}
                    </h3>
                    <div className="avater">
                        <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="avatar" />
                        <span>
                            <AiOutlineCamera/>
                            <p>Change</p> 
                            <input type="file" name="file" id="file_up" 
                                accept="image/*"
                                onChange={changeAvatar}
                            />
                        </span>
                    </div>



                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={name} className="form-control"
                            placeholder="Your name" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" defaultValue={auth.user.email}
                            className="form-control" disabled={true} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input type="password" name="password" value={password} className="form-control"
                            placeholder="Your new password" onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cf_password">Confirm New Password</label>
                        <input type="password" name="cf_password" value={cf_password} className="form-control"
                            placeholder="Confirm new password" onChange={handleChange} />
                    </div>

                    <button className="btn btn-info" disabled={notify.loading} onClick={handleUpdateProfile}>Update</button>
                </div>
                <div className="col-md-8">
                    <h3 className="text-uppercase">Orders</h3>
                    <div className="my-3">
                        <table className="table-bordered table-hover w-100 text-uppercase" style={{minWidth:"600px", cursor: "pointer"}}>
                            <thead className="bg-light font-weight-bold">
                                <tr>
                                    <td className="p-2">id</td>
                                    <td className="p-2">date</td>
                                    <td className="p-2">total</td>
                                    <td className="p-2">delivered</td>
                                    <td className="p-2">action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order, i) =>{
                                        return(
                                            <tr>
                                                <td className="p-2">{order._id}</td>
                                                <td className="p-2">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="p-2">{order.total}</td>
                                                <td className="p-2">
                                                    {
                                                        order.delivered ?
                                                        <i className="fas fa-check text-success"></i> :
                                                        <i className="fas fa-check text-danger"></i>
                                                    }
                                                </td>
                                                <td className="p-2">
                                                    <Link href={`/order/${order._id}`}>
                                                        <a>Details</a>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
     );
}
 
export default Profile;