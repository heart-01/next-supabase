"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { IUserModel } from "@/interface/IUserModel";

type Props = {};

const UserManagement = ({}: Props) => {
  const supabase = createClient();
  const [users, setUsers] = useState<IUserModel[] | []>([]);

  const getUser = async () => {
    const { data, error } = await supabase.from("users").select("*");
    const userList: IUserModel[] = data || [];
    if (error) {
      console.log("🚀 ~ getUser ~ error:", error);
    }
    setUsers(userList);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 px-3">
      <div className="flex gap-2 items-center">
        <input className="rounded-md px-4 py-2 bg-inherit border w-full" type="text" />
        <button>Search</button>
      </div>
      <main className="flex-1 flex flex-col gap-6">
        <table className="table-auto border-collapse border border-gray-200 w-full">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">Full Name</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Telephone</th>
              <th className="border border-gray-200 px-4 py-2">Attachment</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: IUserModel) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.tel}</td>
                <td>{user.attachment && <a href={user.attachment}>Download file</a>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-5 flex flex-col xs:flex-row items-center xs:justify-between">
          <span className="text-xs xs:text-sm ">Page 1</span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button className="text-sm leading-none border border-solid font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1" type="button">
              Previous
            </button>
            <button className="text-sm leading-none border border-solid font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1" type="button">
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
