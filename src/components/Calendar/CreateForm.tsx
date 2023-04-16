import {useCalendarStore} from "@/store/calendar";
import {Form, useSubmit} from "react-router-dom";
import {FormEvent} from "react";
import {format} from "date-fns";
import {DATE_FORMAT} from "@/utils/DateFormat";

export const CreateForm = () => {
    const {closeModal, currDate} = useCalendarStore();
    const submit = useSubmit();

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        submit(evt.currentTarget, {method: "post", action: "/calendar"});
    };

    const currentDate = format(new Date(currDate!), DATE_FORMAT.days);

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
                        <p className="mt-1 text-sm text-gray-900">Create an event</p>
                        <p className="mt-1 text-sm text-gray-900 font-semibold">
                            Current date: {currentDate}
                        </p>
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
