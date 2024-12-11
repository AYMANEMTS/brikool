import React from 'react';
import CategoriesSlider from "../../components/client/home-page/CategoriesSlider";
import Hero from "../../components/client/home-page/Hero";
import Workers from "../../components/client/home-page/Workers";
import WorkersInvite from "../../components/client/home-page/WorkersInvite";
import AvailableWorkers from "../../components/client/home-page/AvailableWorkers";
import FAQContact from "../../components/client/home-page/FAQContact";
import {useTranslation} from "react-i18next";

function Home() {
    const {t} = useTranslation('home')
    return (
        <>
            <CategoriesSlider t={t}/>
            <Hero t={t}/>
            <Workers t={t}/>
            <WorkersInvite />
            <AvailableWorkers t={t}/>
            <FAQContact t={t} />
        </>
    )
}

export default Home;