export async function getData() {
  const res = await fetch(`https://itrnasition-task4.onrender.com/user`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const deleteData = async (deletedUsersID) => {
  const res = await fetch(`https://nest-project-six.vercel.app/user/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userIds: deletedUsersID }),
  });
  if (!res.ok) {
    throw new Error("Failed to delete users");
  }

  return res.json();
};
