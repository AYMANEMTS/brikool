import React from 'react';
import workerspng from "../../../images/workers.png";

function Hero({t}) {
    return (
        <section className="bg-teal-blue dark:bg-bright-yelliw dark:text-black rounded-lg text-white py-12 my-6">
            <div className="container mx-auto flex flex-col sm:flex-row items-center px-6">
                <div className="sm:w-1/2 mb-6 sm:mb-0">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('heroTitle')}</h2>
                    <p className="text-lg sm:text-xl mb-6">{t('heroText')}</p>
                    <a
                        href="#"
                        className="bg-white text-teal-blue dark:bg-teal-blue dark:text-bright-yelliw px-6 py-3 rounded-full font-semibold hover:bg-bright-yelliw dark:hover:bg-teal-blue hover:text-teal-blue dark:hover:text-white transition"
                    >
                        {t('heroButton')}
                    </a>
                </div>
                <div className="sm:w-1/2">
                    <img src={workerspng} alt="Hero Image" className="rounded-lg shadow-lg" />
                </div>
            </div>
        </section>
    );
}

export default Hero;
