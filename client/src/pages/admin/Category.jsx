import React, {useState} from 'react';
import {Search} from "lucide-react";
import {Input, Option, Select, Button} from "@material-tailwind/react";
import {useAdminContext} from "../../context/AdminProvider";
import CategoryTable from "../../components/admin/categories/CategoryTable";
import CategoryModal from "../../components/admin/categories/CategoryModal";
import DeleteModal from "../../components/admin/categories/DeleteModal";
import {useLoading} from "../../context/LoadingProvider";

function Category() {
    const [search, setSearch] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)
    const {categories,isAuthorized} = useAdminContext()
    const {user} = useLoading()
    const [categoryModal, setCategoryModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState({})
    const [isUpdate, setIsUpdate] = useState(false)
    const openModal = (category) => {
        if (category){
            {/* edit */}
            setIsUpdate(true)
            setSelectedCategory(category)
            setCategoryModal(true)
        }else {
            setIsUpdate(false)
            setSelectedCategory({})
            setCategoryModal(true)
        }
    }
    const handleOpen = () => setCategoryModal(false)
    return (
        <div className={"p-4"}>
            <div className={"bg-white p-4 shadow-md rounded-lg mb-6"}>
                <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"}>
                    <Input variant={"outlined"} icon={<Search className={"h-6 w-6"}/>} label="Search" value={search}
                           onChange={(e) => setSearch(e.target.value)}

                    />
                    <Select label={"Order by"} defaultValue={""}>
                        <Option value="">OrderBy</Option>
                        <Option value="admin">Admin</Option>
                        <Option value="moderator">Moderator</Option>
                        <Option value="client">Client</Option>
                    </Select>

                    <Button disabled={!isAuthorized(user,'create_category')}
                        onClick={() => openModal(null)}
                        variant={"outlined"} color={"blue"}>
                        Create New Category
                    </Button>
                </div>
            </div>
            <CategoryTable openModal={openModal} categories={categories} setDeleteModal={setDeleteModal} setSelectedCategory={setSelectedCategory}/>

            {categoryModal && <CategoryModal isUpdate={isUpdate} open={categoryModal} handleOpen={handleOpen} selectedCategory={selectedCategory} /> }
            {deleteModal && <DeleteModal open={deleteModal} handleOpen={() => setDeleteModal(!deleteModal)}
            category_id={selectedCategory._id} /> }
        </div>
    );
}

export default Category;

