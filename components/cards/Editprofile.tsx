import { currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/lib/actions/user.actions";



const Editprofile = async() => {

    const user = await currentUser();
    if (!user) return null; // to avoid typescript warnings
  
    const userInfo = await fetchUser(user.id);
    // if (userInfo?.onboarded) redirect("/");

  return (
    <div>{userInfo.username}</div>
  )
}

export default Editprofile