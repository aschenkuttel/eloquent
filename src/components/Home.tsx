import {ReactElement} from "react";
import {NavLink} from "react-router-dom";

export default function Home(): ReactElement {
    return (
        <main>
            <div className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
                    <div>
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div
                                className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <span className="text-gray-600">
                    Announcing our next round of funding.{' '}
                      <a href="#" className="font-semibold text-emerald-600">
                      <span className="absolute inset-0" aria-hidden="true"/>
                      Read more
                    </a>
                  </span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                                Data to enrich your online business
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                                commodo. Elit sunt
                                amet fugiat veniam occaecat fugiat aliqua.
                            </p>
                            <div className="mt-8 flex gap-x-4 sm:justify-center">
                                <NavLink to="/translate"
                                         className="inline-block rounded-lg bg-emerald-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-emerald-600 hover:bg-emerald-700 hover:ring-emerald-700">
                                    Get started
                                </NavLink>
                                <a href="#"
                                   className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                    Live demo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}