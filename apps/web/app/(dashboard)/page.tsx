"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useQuery, useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { OrganizationSwitcher } from "@clerk/nextjs";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">App / web</h1>
        <OrganizationSwitcher hidePersonal />
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get("name") as string;
            if (name) {
              await addUser({ name });
              e.currentTarget.reset();
            }
          }}
          className="flex flex-col items-start gap-2"
        >
          <Input name="name" placeholder="Type something..." />
          <Button type="submit" size="sm" className="mt-2">
            Add User
          </Button>
        </form>
        {users && users.length > 0 ? (
          <ul className="list-disc">
            {users.map((user) => (
              <li key={user._id} className="text-lg">
                {user.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg">No users found.</p>
        )}
        <p className="text-sm text-gray-500">This is a Convex app.</p>
      </div>
    </div>
  );
}
