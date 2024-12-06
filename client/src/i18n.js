import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enNavbar from "./locales/en/navbar.json"
import frNavbar from "./locales/fr/navbar.json"
import arNavbar from "./locales/ar/navbar.json"
import enHome from "./locales/en/home.json"
import frHome from "./locales/fr/home.json"
import arHome from "./locales/ar/home.json"
import arLogin from "./locales/ar/login.json"
import frLogin from "./locales/fr/login.json"
import enLogin from "./locales/en/login.json"
import arRegister from "./locales/ar/register.json"
import enRegister from "./locales/en/register.json"
import frRegister from "./locales/fr/register.json"
import arWorkerInvite from "./locales/ar/workersInvite.json"
import frWorkerInvite from "./locales/fr/workersInvite.json"
import enWorkerInvite from "./locales/en/workersInvite.json"
import enJobDetails from  "./locales/en/jobDetails.json"
import arJobDetails from  "./locales/ar/jobDetails.json"
import frJobDetails from  "./locales/fr/jobDetails.json"
import enValidation from "./locales/en/validation.json"
import frValidation from "./locales/fr/validation.json"
import arValidation from "./locales/ar/validation.json"
import enAnnounces from "./locales/en/announces.json"
import arAnnounces from "./locales/ar/announces.json"
import frAnnounces from "./locales/fr/announces.json"
const resources = {
    en: {
        navbar: enNavbar,
        home: enHome,
        login: enLogin,
        register: enRegister,
        workersInvite: enWorkerInvite,
        jobDetails: enJobDetails,
        validation: enValidation,
        announces: enAnnounces,
    },
    fr: {
        navbar: frNavbar,
        home: frHome,
        login: frLogin,
        register: frRegister,
        workersInvite: frWorkerInvite,
        jobDetails: frJobDetails,
        validation: frValidation,
        announces: frAnnounces,
    },
    ar: {
        navbar: arNavbar,
        home: arHome,
        login: arLogin,
        register: arRegister,
        workersInvite: arWorkerInvite,
        jobDetails: arJobDetails,
        validation: arValidation,
        announces: arAnnounces,
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        lng: "ar",

        interpolation: {
            escapeValue: false
        },
        ns: ["navbar","home","login","register","workersInvite","jobDetails","validation","announces"],

    });

export default i18n;