import React from 'react';
import CategoriesSlider from "../../components/client/home-page/CategoriesSlider";
import Hero from "../../components/client/home-page/Hero";
import Workers from "../../components/client/home-page/Workers";
import WorkersInvite from "../../components/client/home-page/WorkersInvite";
import FAQContact from "../../components/client/home-page/FAQContact";
import {useTranslation} from "react-i18next";

function Home() {
    const {t} = useTranslation('home')
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

        </div>
    )
}

export default Home;