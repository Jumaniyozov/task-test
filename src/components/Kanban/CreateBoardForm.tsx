import { Form, useSubmit } from "react-router-dom";
import { FormEvent } from "react";
import { useBoardModalStore } from "@/store/boards";
import { format } from "date-fns";
import { DATE_FORMAT } from "@/utils/DateFormat";

export const CreateBoardForm = () => {
  const { closeModal } = useBoardModalStore();
  const submit = useSubmit();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const currentDate = format(Date.now(), DATE_FORMAT.daysWithTime);
    formData.set("createdAt", currentDate);
    formData.set("type", "board");
    submit(formData, { method: "post", action: "/canban" });
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
              Board
            </h3>
            <p className="mt-1 text-sm text-gray-900">Create a board</p>
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
