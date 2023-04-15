import { FormEvent, Fragment } from "react";
import { Dialog, Disclosure, Tab, Transition } from "@headlessui/react";
import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";

import { Form, useSubmit } from "react-router-dom";
import { useCalendarStore } from "@/store/calendar";
import { combineClassNames } from "@/utils/combineClassNames";
import { EventType, useEventStore } from "@/store/events";
import { TrashIcon } from "@heroicons/react/24/outline";

const tabs = [{ name: "Create Events" }, { name: "See Events" }];

export const EventModal = () => {
  const { isModalOpen, closeModal, currEvtHash } = useCalendarStore();

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg lg:max-w-3xl sm:p-6">
                <Tab.Group>
                  <Tab.List className="flex w-full gap-4 bg-white border-gray border rounded-lg">
                    {tabs.map((el) => (
                      <Tab as={Fragment} key={el.name}>
                        {({ selected }) => (
                          <button
                            className={combineClassNames(
                              selected
                                ? "bg-indigo-500 text-white"
                                : "bg-white text-black",
                              "flex-1 rounded-lg p-2 focus:outline-none"
                            )}
                          >
                            {el.name}
                          </button>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-4">
                    <Tab.Panel>
                      <CreateForm />
                    </Tab.Panel>
                    <Tab.Panel>
                      <SeeEvents />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const CreateForm = () => {
  const { closeModal } = useCalendarStore();
  const submit = useSubmit();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    submit(evt.currentTarget, { method: "post", action: "/calendar" });
  };

  return (
    <Form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Event
            </h3>
            <p className="mt-1 text-sm text-gray-500">Create an event</p>
          </div>
        </div>

        <div className="pt-8 flex gap-4 flex-col">
          <div className="sm:col-span-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Title / Name
            </label>
            <div className="mt-1">
              <input
                required
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="start-time"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <div className="mt-1">
              <input
                required
                id="start-time"
                name="start-time"
                type="time"
                autoComplete="start-time"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="end-date"
              className="block text-sm font-medium text-gray-700"
            >
              End date
            </label>
            <div className="mt-1">
              <input
                required
                id="end-date"
                name="end-date"
                type="datetime-local"
                autoComplete="end-date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                autoComplete="description"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create
          </button>
        </div>
      </div>
    </Form>
  );
};

const SeeEvents = () => {
  const { currEvtHash, closeModal } = useCalendarStore();
  const events = useEventStore((state) => state.events);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // submit(evt.currentTarget, { method: "post", action: "/calendar" });
  };

  return (
    <Form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Events
            </h3>
            <p className="mt-1 text-sm text-gray-500">See and delete events</p>
          </div>
        </div>

        <div className="pt-8 flex gap-4 flex-col">
          <ul className="mt-2">
            {events.map((el) => (
              <Fragment key={el.id}>
                {currEvtHash === el.compareStart && (
                  <li className="shadow-sm p-4 border border-gray-200 first:rounded-t-lg last:rounded-b-lg w-full">
                    <ListElement data={el} />
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </Form>
  );
};

const ListElement = ({ data }: { data: EventType }) => {
  return (
    <Disclosure as="div">
      <Disclosure.Button className="flex w-full">
        <div className="px-4 py-4 sm:px-6 w-full">
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
        </div>
      </Disclosure.Button>
      <Disclosure.Panel className="text-gray-500 border-t">
        <div className="px-4 py-4 sm:px-6 w-full flex">
          <p className="w-4/5">{data.description}</p>
          <div className="w-1/5 flex justify-end">
            <button className="rounded-lg bg-red-500 text-white hover:bg-red-600 p-2 h-8 w-8 ">
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
};
