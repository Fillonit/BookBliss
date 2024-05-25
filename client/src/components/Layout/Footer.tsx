'use client'

import {
    faDribbble,
    faFacebook,
    faGithub,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Footer } from 'flowbite-react/lib/esm/components/Footer'

const footer = () => {
    return (
        <footer className="relative overflow-hidden bottom-0 left-0  flex h-[350px] z-[-999]">
            {' '}
            {/* Removed 'fixed' class and added 'mt-auto' */}
            <div className="absolute inset-0 -z-10 max-w-[100vw]">
                <svg
                    className="absolute inset-0 w-full h-full scale-[5] scale-y-[3] origin-bottom"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 1600 900"
                >
                    <defs>
                        <path
                            id="wave"
                            fill="#B45309"
                            d="M-363.852,502.589c0,0,236.988-41.997,505.475,0 s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
                        />
                    </defs>
                    <g>
                        <use xlinkHref="#wave" opacity=".4">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="translate"
                                dur="8s"
                                calcMode="spline"
                                values="270 230; -334 180; 270 230"
                                keyTimes="0; .5; 1"
                                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                                repeatCount="indefinite"
                            />
                        </use>
                        <use xlinkHref="#wave" opacity=".6">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="translate"
                                dur="6s"
                                calcMode="spline"
                                values="-270 230;243 220;-270 230"
                                keyTimes="0; .6; 1"
                                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                                repeatCount="indefinite"
                            />
                        </use>
                        <use xlinkHref="#wave" opacity=".9">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="translate"
                                dur="4s"
                                calcMode="spline"
                                values="0 230;-140 200;0 230"
                                keyTimes="0; .4; 1"
                                keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                                repeatCount="indefinite"
                            />
                        </use>
                    </g>
                </svg>
            </div>
            <section className="flex flex-col justify-end gap-5 pb-10 pl-15 w-full md:items-center md:pl-0 md:gap-5">
                <p className="text-xs m-0">© 2024 All rights reserved</p>
            </section>
        </footer>
    )
}
export default footer
