import React, {useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import {Input, Option, Select} from "@mui/joy";
import {useAdminContext} from "../../context/AdminProvider";
import CategoryTable from "../../components/admin/categories/CategoryTable";
import {Button} from "@mui/material";
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
    const openModal = (category) => {
        if (category){
            {/* edit */}
            setSelectedCategory(category)
            setCategoryModal(true)
        }else {
            setSelectedCategory({})
            setCategoryModal(true)
        }
    }
    const handleOpen = () => setCategoryModal(false)
    return (
        <div className={"p-4"}>
            <div className={"bg-white p-4 shadow-md rounded-lg mb-6"}>
                <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"}>
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
                    <Select defaultValue={""}>
                        <Option value="">OrderBy</Option>
                        <Option value="admin">Admin</Option>
                        <Option value="moderator">Moderator</Option>
                        <Option value="client">Client</Option>
                    </Select>

                    <Button disabled={!isAuthorized(user,'create_category')}
                        onClick={() => openModal({})}
                        variant={"outlined"} color={"primary"}>
                        Create New Category
                    </Button>
                </div>
            </div>
            <CategoryTable openModal={openModal} categories={categories} setDeleteModal={setDeleteModal} setSelectedCategory={setSelectedCategory}/>

            {categoryModal && <CategoryModal open={categoryModal} handleOpen={handleOpen} selectedCategory={selectedCategory} /> }
            {deleteModal && <DeleteModal open={deleteModal} handleOpen={() => setDeleteModal(!deleteModal)}
            category_id={selectedCategory._id} /> }
        </div>
    );
}

export default Category;

