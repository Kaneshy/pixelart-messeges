'use client'
import Image from 'next/image'
import { likeThread, dislikeThread } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";



interface Props {
    currentUserId: string;
    threadId: string;
    likes: [string]
}


const Like = ({ currentUserId, threadId, likes }: Props) => {

    const router = useRouter()
    const pathname = usePathname();

    const handleLike = async () => {
        await likeThread({
            threadCurrentId: threadId,
            threadCurrentUser: currentUserId,
            path: pathname,
        });
    };

    const handleDislike = async () => {
        await dislikeThread({
            threadCurrentId: threadId,
            threadCurrentUser: currentUserId,
            path: pathname,
        });
    };

    return (
        <section className='flex gap-x-2 items-center'>
            <div>
                {likes && likes?.includes(JSON.parse(currentUserId)) ? (
                    <button
                        className='m-r gap-x-2 pr-2 flex items-center hover:scale-105 text-small-semibold'
                        onClick={handleDislike}
                    >
                        <GoHeartFill size={20} className='text-red-600' />
                    </button>
                ) : (
                    <button
                        className='m-r gap-x-2 pr-2 flex items-center hover:scale-105 text-small-semibold'
                        onClick={handleLike}
                    >
                        <GoHeart size={20} className='text-slate-600'/>
                    </button>
                )}
            </div>
            <p className='text-slate-600 text-small-regular'>{likes && likes.length} Lik{likes.length > 1 ? "es" : "e"}</p>
        </section>
    )
}

export default Like