import { EventType } from "@/store/events";
import { Disclosure } from "@headlessui/react";
import { ArrowDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSubmit } from "react-router-dom";

export const ListElement = ({ data }: { data: EventType }) => {
  const submit = useSubmit();
  const handleDelete = () => {
    const formdata = new FormData();
    formdata.set("id", data.id.toString());
    submit(formdata, {method: "delete"})
  };

  return (
    <Disclosure as="div">
      <Disclosure.Button className="flex w-full">
        <div className="px-4 py-4 sm:px-6 w-full ">
          <div className="flex items-center justify-between">
            <p className="truncate text-base font-medium text-indigo-600">
              {data.name}
            </p>
            <div className="ml-2 flex flex-shrink-0">
              <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                Start date: {data["start-date"]}
              </p>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex"></div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <p className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                End date: {data["end-date"]}
              </p>
            </div>
          </div>
          <div className="mt-2 sm:flex justify-center">
            <div className="sm:flex">
              <ArrowDownIcon className="h-6 w-6 animate-bounce" />
            </div>
          </div>
        </div>
      </Disclosure.Button>
      <Disclosure.Panel className="text-gray-500 border-t">
        <div className="px-4 py-4 sm:px-6 w-full flex gap-2">
          <p className="w-4/5 overflow-auto">{data.description}</p>
          <div className="w-1/5 flex justify-end">
            <button
              className="rounded-lg bg-red-500 text-white hover:bg-red-600 p-2 h-8 w-8"
              onClick={handleDelete}
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
};
