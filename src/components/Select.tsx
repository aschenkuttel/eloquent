import {ReactElement, Fragment} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {ChevronUpDownIcon, CheckIcon} from "@heroicons/react/24/solid";
import clsx from "clsx"

interface SelectInterface {
    label: string,
    options: string[]
    selected: string,
    setSelected: (selected: string) => void
}

export default function Select({label, options, selected, setSelected}: SelectInterface): ReactElement {
    return (
        <Listbox value={selected} onChange={setSelected}>
            {({open}) => (
                <>
                    <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>
                    <div className="relative mt-1">
                        <Listbox.Button
                            className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm sm:w-44">
                            <span className="block truncate">{selected}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm sm:w-44">
                                {options.map((choice) => (
                                    <Listbox.Option
                                        key={choice}
                                        className={({active}) =>
                                            clsx(
                                                active ? 'text-white bg-emerald-600' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={choice}
                                    >
                                        {({selected, active}) => (
                                            <>
                        <span className={clsx(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {choice}
                        </span>

                                                {selected ? (
                                                    <span
                                                        className={clsx(
                                                            active ? 'text-white' : 'text-emerald-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}