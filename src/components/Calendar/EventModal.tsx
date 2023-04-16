import { Fragment } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { useCalendarStore } from "@/store/calendar";
import { combineClassNames } from "@/utils/combineClassNames";
import { CreateForm } from "@/components/Calendar/CreateForm";
import { SeeEvents } from "@/components/Calendar/SeeEvents";

const tabs = [{ name: "Create Events" }, { name: "See Events" }];

export const EventModal = () => {
  const { isModalOpen, closeModal } = useCalendarStore();

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

