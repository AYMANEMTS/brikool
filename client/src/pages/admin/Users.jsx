import React, {useEffect, useState} from "react";
import UsersTable from "../../components/admin/users/UsersTable";
import UserModal from "../../components/admin/users/UserModal";
import {useAdminContext} from "../../context/AdminProvider";
import {Input, Option, Select} from "@mui/joy";
import citiesInMorocco from "../../utils/citiesInMorocco";
import {Button} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useLoading} from "../../context/LoadingProvider";
import {useNavigate} from "react-router-dom";

function Users() {
    const {users,isAuthorized} = useAdminContext()
    const {user} = useLoading()
    const [selectedCity, setSelectedCity] = useState("All Cities")
    const [selectedRole, setSelectedRole] = useState("All Roles")
    const [search, setSearch] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([])
    const [userForm,setUserForm] = useState(false)
    const {jobs} = useAdminContext()
    const navigate = useNavigate()
    const applyFilters = () => {
        let filtered = users;
        if (selectedCity !== "All Cities") {
            filtered = filtered.filter((user) => user?.city === selectedCity);
        }
        if (selectedRole !== "All Roles") {
            filtered = filtered.filter((user) => user?.role === selectedRole);
        }
        setFilteredUsers(filtered);
    };
    useEffect(() => {
        applyFilters();
    }, [selectedCity, selectedRole, users]);

    useEffect(() => {
        if (search) {
            const filter = users.filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredUsers(filter);
        } else {
            setFilteredUsers(users);
        }
    }, [search, users, setFilteredUsers]);
    useEffect(() => {
        if (!isAuthorized(user,'view_users')){
            navigate("/admin")
        }
    }, [user]);

    return (
        <div className="p-4">
            {/* Header */}
            <div className={"bg-white p-4 shadow-md rounded-lg mb-6"}>
                <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}>
                    {/* search */}
                    <Input className={"mx-2 py-1"}
                           startDecorator={<SearchIcon/>}
                           placeholder="Search..."
                           sx={{
                               "--Input-radius": "7px",
                           }}
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                           fullWidth
                    />

                    {/* City Filter */}
                    <Select defaultValue={selectedCity}
                            onChange={(event, value) => setSelectedCity(value)}>
                        <Option value="All Cities">All Cities</Option>
                        {citiesInMorocco
                            ?.filter(city => jobs.some(job => job.userId?.city === city))
                            ?.map((city, key) => (
                                <Option key={key} value={city}>{city} ({jobs.filter(job => job.userId?.city === city)?.length})</Option>
                            ))}
                    </Select>

                    {/* Role Filter */}
                    <Select defaultValue={selectedRole}
                            onChange={(event, value) => setSelectedRole(value)}>
                        <Option value="All Roles">All Roles</Option>
                        <Option disabled={!jobs.some(job => job.userId?.role === 'admin')} value="admin">Admin</Option>
                        <Option disabled={!jobs.some(job => job.userId?.role === 'moderator')} value="moderator">Moderator</Option>
                        <Option disabled={!jobs.some(job => job.userId?.role === 'client')} value="client">Client</Option>
                    </Select>

                    {/* create button */}
                    <Button disabled={!isAuthorized(user,"create_users")}
                        onClick={() => setUserForm(true)} variant={"outlined"} color={"primary"}>
                        Create New User
                    </Button>
                </div>
            </div>
            <UsersTable users={filteredUsers} />

            {userForm && <UserModal open={userForm} handleOpen={() => setUserForm(!userForm)} />}
        </div>
    );
}

export default Users;
