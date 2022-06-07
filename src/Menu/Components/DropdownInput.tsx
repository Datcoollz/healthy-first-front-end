import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { basicData } from '../../Interface/BasicData';

interface dropdownInputProps {
    label: string;
    list: basicData[];
    selectedValue: basicData;
    onChange: (e: basicData) => void;
}

export default function DropdownInput(props: dropdownInputProps) {
    return (
        <Menu as="div" className="relative inline-block text-left mx-2">
            <div>
                <Menu.Button className="inline-flex justify-center w-full
                rounded-md border border-gray-300 shadow-sm px-4 py-2
                bg-white text-sm font-medium text-gray-700 hover:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100
                focus:ring-slate-500">
                    {props.label}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                    <Menu.Items className="absolute left-5 overflow-auto z-10 w-max
                rounded-md shadow-lg bg-white ring-1 ring-gray-600
                ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {props.list.map((e) => (
                                <Menu.Item key={e.id}>
                                    {({ active }) => (
                                        <button type="button"
                                            onClick={() => { props.onChange(e) }}
                                            className="!block !text-slate-600 !w-full !bg-transparent
                                            !rounded-none !m-0 text-left hover:!bg-slate-200">
                                            {e.name}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
            </Transition>
        </Menu>
    )
}