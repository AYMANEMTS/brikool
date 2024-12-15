import React from 'react';
import displayImage from "../../../utils/imageFromServer";
import {useAdminContext} from "../../../context/AdminProvider";
import {Link} from "react-router-dom";
import {useLoading} from "../../../context/LoadingProvider";
import {useTranslation} from "react-i18next";
import {Avatar, Card, Typography,Button} from "@material-tailwind/react";

const TABLE_HEADERS = ["Image","Name","Jobs","Action"]

function CategoryTable({categories,openModal,setDeleteModal,setSelectedCategory}) {
    const {jobs,isAuthorized} = useAdminContext()
    const {user} = useLoading()
    const {i18n} = useTranslation()
    const {language:lng} = i18n
    return (
        <>
            <Card className="h-full w-full overflow-scroll px-6">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEADERS.map((head) => (
                            <th key={head} className="border-b border-gray-300 pb-4 pt-10">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold leading-none"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {categories
                        ?.map((category, index) => {
                            const isLast = index === category.length - 1;
                            const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                            return (
                                <tr key={category?._id} className="hover:bg-gray-50">
                                    <td className={classes}>
                                        <Avatar src={displayImage("", category)}/>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="h6"
                                            className="font-semibold text-gray-600"
                                        >
                                            {category?.name?.[lng]}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        {jobs.filter(job => job.category?._id === category?._id).length > 0 && (
                                            <Link to={`/admin/jobs?categoryId=${category?._id}`} className={"underline cursor-pointer text-blue-500 hover:text-blue-800"}>
                                                {jobs.filter(job => job.category?._id === category?._id).length}
                                            </Link>
                                        )}
                                    </td>
                                    <td className={classes}>
                                        <div className={"flex space-x-1"}>
                                            <Button disabled={!isAuthorized(user, 'edit_category')}
                                                    size={"sm"}
                                                    onClick={() => openModal(category)}>
                                                Edit
                                            </Button>
                                            <Button className={"bg-red-500 hover:bg-red-800"} disabled={!isAuthorized(user, 'delete_category')}
                                                    size={"sm"} onClick={() => {
                                                setSelectedCategory(category)
                                                setDeleteModal(true)
                                            }}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </>
    );
}

export default CategoryTable;