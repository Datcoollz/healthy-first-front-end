import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { basicData } from '../../Interface/BasicData'

interface comboboxInputProps {
    label: string;
    value: basicData;
    list: basicData[];
    onChange: (e: basicData) => void;
    isError: boolean;
    errorText: string;
}

export default function ComboboxInput(props: comboboxInputProps) {
    const [query, setQuery] = useState('')

    const filteredOptions =
        query === ''
            ? props.list
            : props.list.filter((o) =>
                o.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )
    
    return (
        <div>
            <label>{props.label}</label>
            <Combobox value={props.value} onChange={props.onChange}>
                <div className="relative">
                    <div className="relative">
                        <Combobox.Input
                            displayValue={(o: basicData) => o?.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute -inset-y-3 -right-3 flex items-center pl-2 pr-2">
                            <SelectorIcon
                                className="h-5 w-5 text-slate-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto
                        rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-gray-600 ring-opacity-5
                        focus:outline-none sm:text-sm">
                            {props.list.length === 0 ||
                                (filteredOptions.length === 0 && query !== '') ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Không có kết quả.
                                </div>
                            ) : (
                                filteredOptions.map((o) => (
                                    <Combobox.Option
                                        key={o.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4
                                            ${active ? 'bg-slate-600 text-white' : 'text-gray-900'}`
                                        }
                                        value={o}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {o.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-slate-600'
                                                            }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
            <span
                className={props.isError ?
                    "text-red-500 font-bold" :
                    "text-red-500 font-bold hidden"
                }>
                {props.errorText}
            </span>
        </div>
    )
}