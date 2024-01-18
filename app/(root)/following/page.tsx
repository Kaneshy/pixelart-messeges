import { fetchFollowingPost } from '@/lib/actions/thread.actions'
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";



const page = async () => {

    const user = await currentUser();
    if (!user) return null;
  
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const threads = await fetchFollowingPost(userInfo._id);

    console.log(threads && threads[0])

  return (
    <>
    <h1 className='head-text text-left'>For you</h1>

    <section className='mt-9 flex flex-col gap-10'>
      {threads && threads.length === 0 ? (
        <p className='no-result'>No threads found</p>
      ) : (
        <>
          {threads && threads.map((post) => (
            <ThreadCard
              key={post._id}
              id={post._id}
              currentUserId={user.id}
              parentId={post.parentId}
              content={post.text}
              imageH={post.imgUrl}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
              likes={post.likes}
              followed={userInfo.followed}
            />
          ))}
        </>
      )}
    </section>

    {/* <Pagination
      path='/'
      pageNumber={searchParams?.page ? +searchParams.page : 1}
      isNext={result.isNext}
    /> */}
  </>
  )
}

export default page