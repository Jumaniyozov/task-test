import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { combineClassNames } from "@/utils/combineClassNames";


interface SelectProps {
  selected: string;
  handleSelect: (val: string) => void;
  label: string;
  colors: { id: string; color: string; bg: string }[];
}

export const CustomColorSelect = ({
  selected,
  handleSelect,
  label,
  colors,
}: SelectProps) => {
  const handleLocalSelect = (val: string) => {
    handleSelect(val);
  };

  return (
    <Listbox value={selected} onChange={handleLocalSelect}>
      {({ open }) => (
        <div className="w-full">
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Listbox.Label>
          <div className="relative mt-1 w-full">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{selected}</span>
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
                {colors.map((el) => (
                  <Listbox.Option
                    key={el.id}
                    className={({ active }) =>
                      combineClassNames(
                        active ? "text-white " + el.bg : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={el.color}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={combineClassNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {el.color}
                        </span>

                        {selected ? (
                          <span
                            className={combineClassNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <span
                              className={combineClassNames("w-4 h-4", el.bg)}
                            ></span>
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
