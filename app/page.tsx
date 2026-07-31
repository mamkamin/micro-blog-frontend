import { getAllUsername } from "@/lib/data/users";
import Header from "@/component/header";

export default async function Home() {
  const username_list = await getAllUsername();
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex flex-col flex-1 justify-center items-center">
        <div className="border rounded-sm p-4">
          <h1 className="text-xl border rounded-md p-2 mb-2">Available users</h1>
          <ul className="space-y-2">
            {username_list.map((user, idx: number) => (
              <li className="border rounded-md p-1" key={idx}>{user.username}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
