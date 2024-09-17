// app/routes/tasks.jsx

import { useLoaderData, Form } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { parse } from "cookie";
import { getTasks, addTask, deleteTask } from "../server";

function getTokenFromRequest(request) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = parse(cookieHeader || "");
  return cookies.token;
}

export const loader = async ({ request }) => {
  const token = getTokenFromRequest(request);

  // if (!token) {
  //   throw new Response("Unauthorized", { status: 401 });
  // }

  const tasks = getTasks();
  return json(tasks);
};

export const action = async ({ request }) => {
  const token = getTokenFromRequest(request);
  const formData = await request.formData();
  const _action = formData.get("_action");

  // if (!token) {
  //   throw new Response("Unauthorized", { status: 401 });
  // }

  if (_action === "addTask") {
    const description = formData.get("description");
    addTask(description);
    return redirect("/");
  }

  if (_action === "deleteTask") {
    const taskId = formData.get("taskId");
    deleteTask(taskId);
    return redirect("/");
  }

  return null;
};

export default function Tasks() {
  const tasks = useLoaderData();

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col items-center gap-16'>
        <h1 className='text-2xl font-bold'>Task Manager</h1>
        <div className='flex flex-col items-center gap-4'>
          <Form method='post'>
            <input
              name='description'
              placeholder='New task'
              className='p-2 border rounded'
            />
            <input type='hidden' name='_action' value='addTask' />
            <button
              type='submit'
              className='bg-blue-500 text-white p-2 rounded'>
              Add Task
            </button>
          </Form>
        </div>
        <ul className='mt-6'>
          {tasks.map((task) => (
            <li
              key={task.id}
              className='flex justify-between items-center mb-2'>
              <span>{task.description}</span>
              <Form method='post'>
                <input type='hidden' name='taskId' value={task.id} />
                <input type='hidden' name='_action' value='deleteTask' />
                <button
                  type='submit'
                  className='bg-red-500 text-white p-1 rounded'>
                  Delete
                </button>
              </Form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
