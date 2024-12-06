import React from 'react';
import CategoriesSlider from "../../components/client/home-page/CategoriesSlider";
import Hero from "../../components/client/home-page/Hero";
import Workers from "../../components/client/home-page/Workers";
import WorkersInvite from "../../components/client/home-page/WorkersInvite";
import AvailableWorkes from "../../components/client/home-page/AvailableWorkers";
import Faq from "../../components/client/home-page/Faq";
import {useTranslation} from "react-i18next";

function Home() {
    const {t} = useTranslation('home')
    return (
        <>
            <CategoriesSlider t={t}/>
            <Hero t={t}/>
            <Workers t={t}/>
            <WorkersInvite />
            <AvailableWorkes t={t}/>
            <Faq t={t} />
        </>
    )
}

export default Home;