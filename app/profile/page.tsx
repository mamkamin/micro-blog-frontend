import { getCurrentUser } from "@/lib/data/users";
import EditProfileButton from "@/component/edit-profile-button";
import Header from "@/component/header";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const fields = [
    { label: "Username", value: user.username, inputValue: user.username, type: "text", canEdit: true },
    { label: "Email", value: user.email, inputValue: user.email, type: "email", canEdit: true },
    { label: "Password", value: "-", inputValue: "", type: "password", canEdit: true },
    {
      label: "Created",
      value: new Date(user.created_at).toLocaleString(),
      inputValue: "",
      type: "text",
      canEdit: false,
    },
    {
      label: "Last updated",
      value: new Date(user.updated_at).toLocaleString(),
      inputValue: "",
      type: "text",
      canEdit: false,
    },
  ];

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex flex-1 justify-center p-6 sm:p-10">
        <section className="h-fit w-full max-w-2xl rounded-lg border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-neutral-500">Account</p>
          <h1 className="mt-1 text-2xl font-semibold">Profile</h1>

          <dl className="mt-6 divide-y rounded-md border">
            {fields.map((field) => (
              <div
                key={field.label}
                className="grid grid-cols-[minmax(7rem,1fr)_minmax(0,2fr)_auto] items-center gap-3 p-4"
              >
                <dt className="text-sm font-medium text-neutral-600">{field.label}</dt>
                <dd className="min-w-0 wrap-break-word text-sm">{field.value}</dd>
                {field.canEdit ? (
                  <EditProfileButton
                    label={field.label}
                    value={field.inputValue}
                    type={field.type}
                  />
                ) : (
                  <span className="w-14.5" aria-hidden="true" />
                )}
              </div>
            ))}
          </dl>
        </section>
      </main>
    </div>
  );
}
