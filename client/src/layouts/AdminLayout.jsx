import AdminUi from "../components/admin/AdminUI";
import {useLoading} from "../context/LoadingProvider";
import {useEffect} from "react";
import AdminApi from "../api/AdminApi";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import ClientApi from "../api/ClientApi";
import {useAdminContext} from "../context/AdminProvider";

function AdminLayout() {
    const {setUser, setIsAuthenticated} = useLoading()
    const {setJobs, setUsers, setCategories} = useAdminContext()
    const navigate = useNavigate()
    const { data: jobs= [] } = useQuery('jobs', ClientApi.getJobs,{
        onSuccess: (data) => setJobs(data.data),
    });
    const {data: users = []} = useQuery('users',AdminApi.getUsers,{
        onSuccess: (data) => setUsers(data.data),
    })
    const {data: categories = []} = useQuery('categories',ClientApi.getCategories,{
        onSuccess: (data) => setCategories(data?.data?.category),
    })
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await AdminApi.checkAuth();
                if (res.status === 200) {
                    localStorage.setItem('isLogin','true')
                    setIsAuthenticated(true)
                    setUser(res.data.user)
                }else {
                    localStorage.clear()
                    navigate("/admin/login")
                    setIsAuthenticated(false)
                    setUser(null)
                }
            } catch (error) {
                localStorage.clear()
                navigate("/admin/login")
                setIsAuthenticated(false)
                setUser(null)
                console.error("Authentication check failed:", error);
            }
        };
        checkAuth().catch(e => console.log(e))
    }, []);
    return (
        <>
            <AdminUi />
        </>
    );
}

export default AdminLayout;
