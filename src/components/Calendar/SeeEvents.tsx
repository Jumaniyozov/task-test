import { useCalendarStore } from "@/store/calendar";
import { useEventStore } from "@/store/events";
import { Fragment } from "react";
import { ListElement } from "@/components/Calendar/ListElement";
import { useEventIsSuccess } from "@/hooks/useEventIsSuccess";

export const SeeEvents = () => {
  useEventIsSuccess();
  const events = useEventStore((state) => state.events);

  const { currEvtHash, closeModal } = useCalendarStore((state) => ({
    currEvtHash: state.currEvtHash,
    closeModal: state.closeModal,
  }));

  return (
    <div className="space-y-8 divide-y divide-gray-200">
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
    </div>
  );
};
