import React from 'react';
import Table from "@mui/joy/Table";
import displayImage from "../../../utils/imageFromServer";
import {useAdminContext} from "../../../context/AdminProvider";
import Button from "@mui/joy/Button";
import {Link} from "react-router-dom";
import {useLoading} from "../../../context/LoadingProvider";

function CategoryTable({categories,openModal,setDeleteModal,setSelectedCategory}) {
    const {jobs,isAuthorized} = useAdminContext()
    const {user} = useLoading()
    return (
        <>
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <Table size="lg" hoverRow>
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Jobs</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories?.map((category, key) => (
                        <tr key={key}>
                            <td className="px-6 py-4">
                                <img
                                    src={displayImage('', category)}
                                    alt={category.name}
                                    className="w-10 h-10 object-cover rounded-full"
                                />
                            </td>

                            <td className="px-6 py-4 font-semibold">
                                {category.name}
                            </td>

                            <td className="px-6 py-4 font-semibold">
                                {jobs.filter(job => job.category?._id === category?._id).length > 0 && (
                                    <Link to={`/admin/jobs?categoryId=${category?._id}`} className={"underline cursor-pointer text-blue-500 hover:text-blue-800"}>
                                        {jobs.filter(job => job.category?._id === category?._id).length}
                                    </Link>
                                )}
                            </td>

                            <td className="px-6 py-4 ">
                                <div className={"flex space-x-1"}>
                                    <Button disabled={!isAuthorized(user,'edit_category')}
                                        size={"sm"} variant={"solid"} color={"primary"} onClick={() => openModal(category)}>
                                        Edit
                                    </Button>
                                    <Button disabled={!isAuthorized(user,'delete_category')}
                                        size={"sm"} variant={"solid"} color={"danger"} onClick={() => {
                                        setSelectedCategory(category)
                                        setDeleteModal(true)
                                    }}>
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default CategoryTable;