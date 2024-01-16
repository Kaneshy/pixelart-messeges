import { redirect } from "next/navigation";

import { fetchUserPosts } from "@/lib/actions/user.actions";

import ThreadCard from "../cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";

interface Result {
  name: string;
  image: string;
  id: string;
  followed: [string];
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    likes: [string],
    imgUrl: string,
    author: {
      name: string;
      image: string;
      id: string;
      _id:string
    };
    community: {
      
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;

}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

    result = await fetchUserPosts(accountId);

    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

  if (!result) {
    redirect("/");
  }

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.threads.map((thread) => (
        <ThreadCard
          key={thread._id}
          likes={thread.likes}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          imageH={thread.imgUrl}
          author={thread.author}
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
          followed={userInfo.followed}
        />
      ))}
    </section>
  );
}

export default ThreadsTab;