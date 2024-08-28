"use client";
import Image from "next/image";
import Img from "@/public/logo3.png";
import { useTranslation } from "react-i18next";
import { Link } from "phosphor-react";
import "./styled.component.css";
const Footer_tailwind = () => {
    const { t } = useTranslation();
    const navigation = {
        solutions: [
            { name: t("Casino by Category"), href: '/casinos' },
            { name: t("Casino by Payment Methods"), href: '/payments' },
            { name: t("Casino by Game Providers"), href: '/game-providers' },
            { name: t("Best Bonuses"), href: '/bonuses' },
        ],
        support: [
            { name: t("Responsible Gaming"), href: '/responsible-gaming' },
            { name: t("Privacy Policy"), href: '/privacy-policy' },
            { name: t("Terms and Conditions"), href: '/terms-and-conditions' },
        ],
        company: [
            { name: t("Our Contacts") + ": support@myawardwallet.com ", href: 'mailto:support@myawardwallet.com' },
        ],
    }
    return (
        <footer aria-labelledby="footer-heading" className="footer-bg">
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-10 sm:pt-24 lg:px-8 lg:pt-12">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8 mb42">
                    <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm text-white font-semibold leading-6 uppercase footer-h3">{t("Casinos")}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.solutions.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-sm leading-6 text-white hover:text-gray-300">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white uppercase footer-h3">{t("Support")}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.support.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-sm leading-6 text-white hover:text-gray-300">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white uppercase footer-h3">{t("Company")}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.company.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-sm leading-6 text-white hover:text-gray-300">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 xl:mt-0">
                        <h4 className="text-sm font-semibold leading-6 text-gray-900 uppercase text-white footer-h4">{t("Join the community of our subscribers")}</h4>
                        <p className="mt-4 text-xs leading-6 text-white footer-p">
                            {t("Get fresh bargains and lucrative bonuses from trustworthy online casinos working in your region! Be the first one to find out where it's worth playing today!")}
                        </p>
                        <form className="mt-6 sm:flex flex-col sm:max-w-md form-subscribe">
                            <label htmlFor="email-address" className="sr-only">
                                {t("Email address")}
                            </label>
                            <input
                                id="email-address"
                                name="email-address"
                                type="email"
                                required
                                placeholder={t("Enter your email")}
                                autoComplete="email"
                                className=""
                            />
                            <div className="mt-4 sm:mt-0 sm:flex-shrink-0">
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-md px-3 text-sm font-semibold text-white   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 btn-orange"
                                >
                                    {t("Subscribe")}
                                </button>
                            </div>
                        </form>
                        <fieldset>
                            <div className="mt-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="comments"
                                            name="comments"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-white">
                                        {t("I agree with Terms and Conditions and Privacy Policy.")}
                                        </label>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="candidates"
                                            name="candidates"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="candidates" className="font-medium text-white">
                                            {t("I agree to receive promotional emails from TOPBON.US and its partners.")}
                                        </label>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="offers" className="font-medium text-white">
                                        {t("I agree to receive promotional sms from TOPBON.US.")}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="mt-5 border-t border-gray-900/10 pt-8 sm:mt-5 md:flex md:items-center md:justify-center lg:mt-5 pb-10 md:pb-0 bot-foot">
                    <p className="mt-8 text-md leading-5 text-gray-300 md:order-1 md:mt-0 text-center">
                        Copyright &copy; 2024, topbon.us All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
export { Footer_tailwind };