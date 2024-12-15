import React, { useEffect, useState } from "react";
import UsersTable from "../../components/admin/users/UsersTable";
import UserModal from "../../components/admin/users/UserModal";
import { useAdminContext } from "../../context/AdminProvider";
import citiesInMorocco from "../../utils/citiesInMorocco";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import {Search} from "lucide-react";
import { useLoading } from "../../context/LoadingProvider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Users() {
    const { users, isAuthorized } = useAdminContext();
    const { user } = useLoading();
    const [selectedCity, setSelectedCity] = useState("All Cities");
    const [selectedRole, setSelectedRole] = useState("All Roles");
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userForm, setUserForm] = useState(false);
    const { jobs } = useAdminContext();
    const { i18n } = useTranslation();
    const { language: lng } = i18n;
    const navigate = useNavigate();

    const applyFilters = () => {
        let filtered = users;
        if (selectedCity !== "All Cities") {
            filtered = filtered.filter((user) => user?.city?.[lng] === selectedCity);
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
            const filter = users.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredUsers(filter);
        } else {
            setFilteredUsers(users);
        }
    }, [search, users]);

    useEffect(() => {
        if (!isAuthorized(user, "view_users")) {
            navigate("/admin");
        }
    }, [user]);

    return (
        <div className="p-4">
            {/* Header */}
            <div className={"bg-white p-4 shadow-md rounded-lg mb-6"}>
                <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}>
                    {/* search */}
                    <Input
                        className={"mx-2 py-1"}
                        icon={<Search className={"w-6 h-6"} />}
                        label="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* City Filter */}
                    <Select label={"City"} value={selectedCity} onChange={(value) => setSelectedCity(value)}>
                        <Option value="All Cities">All Cities</Option>
                        {citiesInMorocco
                            ?.filter((city) => users.some((user) => user?.city?.[lng] === city?.[lng]))
                            ?.map((city, key) => (
                                <Option key={key} value={city?.[lng]}>
                                    {city?.[lng]}
                                </Option>
                            ))}
                    </Select>

                    {/* Role Filter */}
                    <Select label={"Role"} value={selectedRole} onChange={(value) => setSelectedRole(value)}>
                        <Option value="All Roles">All Roles</Option>
                        <Option disabled={!!jobs.some((job) => job.userId?.role === "admin")} value="admin">
                            Admin
                        </Option>
                        <Option disabled={!!jobs.some((job) => job.userId?.role === "moderator")} value="moderator">
                            Moderator
                        </Option>
                        <Option disabled={!!jobs.some((job) => job.userId?.role === "client")} value="client">
                            Client
                        </Option>
                    </Select>

                    {/* create button */}
                    <Button
                        disabled={!isAuthorized(user, "create_users")}
                        onClick={() => setUserForm(true)}
                    >
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
