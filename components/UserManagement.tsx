"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { IUserModel } from "@/interface/IUserModel";

type Props = {};

const ITEMS_PER_PAGE = 1;

const UserManagement = ({}: Props) => {
  const supabase = createClient();
  const [users, setUsers] = useState<IUserModel[] | []>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [searchUser, setSearchUser] = useState<string>("");

  const userSupabaseQuery = () => {
    let query = supabase.from("users").select("*", { count: "exact" });
    if (searchUser) {
      query = query.like("fullname", `%${searchUser}%`);
    }
    query = query.range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);
    return query;
  };

  const getUser = async () => {
    const { data, error, count } = await userSupabaseQuery();

    if (error) {
      console.log("🚀 ~ getUser ~ error:", error);
      return;
    }

    const userList: IUserModel[] = data || [];
    const calculateMaxPage = Math.ceil((count as number) / ITEMS_PER_PAGE);
    setUsers(userList);
    setMaxPage(calculateMaxPage);
  };

  useEffect(() => {
    getUser();
  }, [page]);

  const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(event.target.value);
  };

  const handleOnClickSearch = async () => {
    const { data: users, error, count } = await userSupabaseQuery();

    if (error) {
      console.log("🚀 ~ handleOnClickSearch ~ error:", error);
      alert("Fail to search");
      return;
    }

    const calculateMaxPage = Math.ceil(((count || 1) as number) / ITEMS_PER_PAGE);
    setPage(1);
    setMaxPage(calculateMaxPage);
    setUsers(users);
  };

  return (
    <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 px-3">
      <div className="flex gap-2 items-center">
        <input className="rounded-md px-4 py-2 bg-inherit border w-full" type="text" onChange={handleOnChangeSearch} />
        <button onClick={handleOnClickSearch}>Search</button>
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
          <span className="text-xs xs:text-sm ">
            Page {page} / {maxPage}
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                className="text-sm leading-none border border-solid font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                type="button"
              >
                Previous
              </button>
            )}
            {page < maxPage && (
              <button
                onClick={() => setPage(page + 1)}
                className="text-sm leading-none border border-solid font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                type="button"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
