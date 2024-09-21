
import { useCreateUserMutation } from "@/redux/api";
import { useState, type FC } from "react";

export const CreateUser:FC=()=>{
  const [createUser] = useCreateUserMutation()
  const [username,setUsername] = useState<string>("")
  const [email,setEmail] = useState<string>("")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Call the createUser mutation with the username and email
      const response = await createUser({ username, email }).unwrap(); // unwrap() to handle errors
      alert("User created successfully!");
      localStorage.setItem("user_id", response.user_id)
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Error creating user");
    }
  };
      return (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    username
                  </label>
                  <div className="mt-2">
                  <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} // Update state when input changes
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      email
                    </label>
                    
                  </div>
                  <div className="mt-2">
                  <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Update state when input changes
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    create user
                  </button>
                </div>
              </form>
      );
}