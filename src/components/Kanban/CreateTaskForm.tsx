import { Form, useSubmit } from "react-router-dom";
import { FormEvent, useState } from "react";
import { format } from "date-fns";
import { DATE_FORMAT } from "@/utils/DateFormat";
import { useTaskModalStore } from "@/store/tasks";
import { CustomColorSelect } from "@/components/FormUtils/CustomColorSelect";
import { createColors } from "@/utils/canban/randomTagColor";

export const CreateTaskForm = () => {
  const { closeModal } = useTaskModalStore();
  const boardData = useTaskModalStore((state) => state.currentBoard);
  const submit = useSubmit();
  const colors = createColors();
  const [color, setColor] = useState(colors[0].color);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const currentDate = format(Date.now(), DATE_FORMAT.daysWithTime);

    formData.set("boardId", boardData?.id.toString() || "1");
    formData.set("createdAt", currentDate);
    formData.set("tagColors", color);
    formData.set("type", "task");
    submit(formData, { method: "post", action: "/canban" });
  };

  const handleColor = (val: string) => {
    setColor(val);
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
              Task
            </h3>
            <p className="mt-1 text-sm text-gray-900">
              Append task to {boardData?.name}
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
              htmlFor="tag"
              className="block text-sm font-medium text-gray-700"
            >
              Tag
            </label>
            <div className="mt-1">
              <input
                required
                id="tag"
                name="tag"
                type="text"
                autoComplete="tag"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="sm:col-span-4">
            <CustomColorSelect
              label="Color"
              selected={color}
              colors={colors}
              handleSelect={handleColor}
            />
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
