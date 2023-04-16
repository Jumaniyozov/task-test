import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { combineClassNames } from "@/utils/combineClassNames";

interface SelectProps {
  selected: number | string;
  handleSelect: (val: number) => void;
  data: { id: number | string; val: number }[];
  label: string;
  customSelectLabel?: string;
}

export const CustomSelect = ({
  label,
  selected,
  handleSelect,
  data,
  customSelectLabel,
}: SelectProps) => {
  const handleLocalSelect = (val: string) => {
    handleSelect(parseInt(val));
  };

  return (
    <Listbox value={selected} onChange={handleLocalSelect}>
      {({ open }) => (
        <div>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Listbox.Label>
          <div className="relative mt-1 w-min-content w-32 ">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">
                {customSelectLabel ? customSelectLabel : selected}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="scrollbar-hide absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((el) => (
                  <Listbox.Option
                    key={el.id}
                    className={({ active }) =>
                      combineClassNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={el.val}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={combineClassNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {el.id}
                        </span>

                        {selected ? (
                          <span
                            className={combineClassNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};
