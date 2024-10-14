import React from 'react';
import CategoriesSlider from "../../components/client/home-page/CategoriesSlider";
import Hero from "../../components/client/home-page/Hero";
import Workers from "../../components/client/home-page/Workers";
import WorkersInvite from "../../components/client/home-page/WorkersInvite";
import AvailableWorkes from "../../components/client/home-page/AvailableWorkers";
import Faq from "../../components/client/home-page/Faq";

function Home() {

    return (
        <>
            <CategoriesSlider/>
            <Hero/>
            <Workers/>
            <WorkersInvite/>
            <AvailableWorkes/>
            <Faq />
        </>
    )
}

export default Home;