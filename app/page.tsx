"use client";

// @ts-expect-error
import { useFormState } from "react-dom";
import { register } from "@/actions/register";

const initialState = {
  success: false,
  message: null,
};

export default async function Index() {
  const [state, formAction] = useFormState(register, initialState);
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main>
          <form action={formAction}>
            <h1 className="text-5xl font-bold text-center my-10">Sign Up</h1>
            <div className="flex gap-2 items-center mb-2">
              <input className="rounded-md px-4 py-2 bg-inherit border w-full" name="fullname" placeholder="Fullname" required />
            </div>
            <div className="flex gap-2 items-center mb-2">
              <input className="rounded-md px-4 py-2 bg-inherit border w-full" name="email" placeholder="Email" required />
            </div>
            <div className="flex gap-2 items-center mb-2">
              <input className="rounded-md px-4 py-2 bg-inherit border w-full" name="tel" placeholder="Telephone" required />
            </div>
            <div className="flex gap-2 items-center mb-2">
              <input type="file" className="rounded-md px-4 py-2 bg-inherit border" name="attachment" />
            </div>
            <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 w-full">Register</button>
            {state.message && <p className="text-center text-red-500">Error: {state.message}</p>}
            {state.success && <p className="text-center text-green-500">Register Successful !</p>}
          </form>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs" target="_blank" className="font-bold hover:underline" rel="noreferrer">
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
