import React, {useEffect, useState} from 'react';
import CategoriesSlider from "../../components/client/home-page/CategoriesSlider";
import Hero from "../../components/client/home-page/Hero";
import Workers from "../../components/client/home-page/Workers";
import WorkersInvite from "../../components/client/home-page/WorkersInvite";
import FAQContact from "../../components/client/home-page/FAQContact";
import {useTranslation} from "react-i18next";
import {useSearchParams} from "react-router-dom";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

function Home() {
    const {t} = useTranslation('home')
    const [resetPasswordForm, setResetPasswordForm] = useState(false)
    const [searchParams,setSearchParams] = useSearchParams()
    const resetPassword = searchParams.get('reset-password')
    const token = searchParams.get('token')
    useEffect(() => {
        if (token && resetPassword){
            setResetPasswordForm(true)
        }
    }, [resetPassword,token]);
    return (
        <div className={"mb-14"}>
            <CategoriesSlider t={t}/>
            <Hero t={t}/>
            <Workers t={t}/>
            <WorkersInvite />
            <Workers t={t}/>
            <div  className={"mt-12"} >
                <FAQContact t={t} />
            </div>
            {resetPasswordForm && <ResetPasswordForm open={resetPasswordForm}
                 handleOpen={() => setResetPasswordForm(false)} token={token} /> }
        </div>
    )
}

export default Home;