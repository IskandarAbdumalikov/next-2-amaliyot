import Users from "@/components/users/Users";
import { getData } from "@/hooks/fetchUser";
import React from "react";

const Home = async () => {
  let data = await getData();
  return (
    <div className="container mx-auto max-w-[1440px]">
      <Users data={data} />
    </div>
  );
};

export default Home;
