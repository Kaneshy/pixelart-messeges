import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import { FaRegCommentDots } from "react-icons/fa";


import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import Like from "../functionalities/Like";
import Follow from "../functionalities/Follow";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  imageH: string;
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
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  likes: [string];
  followed: [string]
}

async function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  imageH,
  community,
  createdAt,
  comments,
  isComment,
  likes,
  followed
}: Props) {

  // console.log('ss', imageH)
  const createdAtDate = new Date(createdAt);
  const year = createdAtDate.getFullYear();
  const month = createdAtDate.getMonth() + 1; // Adding 1 as getMonth() returns a zero-based index
  const day = createdAtDate.getDate();
  const hour = createdAtDate.getHours();
  const minutes = createdAtDate.getMinutes();


  const user = await currentUser();
  if (!user) redirect("/onboarding");

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");  


  return (
    <article
      className={`flex w-full flex-col rounded-xl ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
        }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image
                src={author.image}
                alt='user_community_image'
                fill
                className='cursor-pointer rounded-full'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <div className="flex i items-center">
              <Link href={`/profile/${author.id}`} className='w-fit mr-4'>
                <h4 className='cursor-pointer text-base-semibold text-light-1'>
                  {author.name}
                </h4>
              </Link>
              <Follow
                  currentUserId={JSON.stringify(userInfo._id)}
                  authorId={JSON.stringify(author._id)}
                  followed={followed}
                />
              <p className="flex text-small-semibold text-slate-600">{`${hour}:${minutes}  ${day}/${month}/${year}`}</p>
            </div>


            <p className='mt-2 text-small-regular text-light-2 max-h-80 overflow-auto OWNBAR p-1'>{content}</p>

            {imageH && (
              <div className="w-full flex justify-center">
                <img src={imageH} width={500} alt="" />
              </div>
            )}

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className='flex gap-3.5'>
                <Like
                  currentUserId={JSON.stringify(userInfo._id)}
                  threadId={JSON.stringify(id)}
                  likes={likes}
                />


                <Link href={`/thread/${id}`}>
                  <FaRegCommentDots size={20} className='text-slate-600' />
                </Link>
                <div>
                  {isComment && comments.length > 0 && (
                    <Link href={`/thread/${id}`}>
                      <p className='mt-1 text-subtle-medium text-gray-1'>
                        {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                      </p>
                    </Link>
                  )}
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        /> */}
      </div>

      {!isComment && comments.length > 0 && (
        <div className='ml-1 mt-3 flex items-center gap-2'>
          {/* {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))} */}

          <Link href={`/thread/${id}`}>
            <p className='mt-1 text-subtle-medium text-gray-1'>
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className='mt-5 flex items-center'
        >
          <p className='text-subtle-medium text-gray-1'>
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className='ml-1 rounded-full object-cover'
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;