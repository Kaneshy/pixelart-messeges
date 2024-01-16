'use client'
import Image from 'next/image'
import { likeThread, dislikeThread} from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { followUser, unfollowUser } from '@/lib/actions/user.actions';
import { useEffect } from 'react';



interface Props {
    currentUserId: string;
    authorId: string;
    followed: [string]
}


const Follow = ({ currentUserId, authorId, followed }: Props) => {

    const router = useRouter()
    const pathname = usePathname();

    const handleFollow = async () => {
        console.log('is runing')
        await followUser({
            threadAuthorId: authorId,
            threadCurrentUser: currentUserId,
            path: pathname,
        });
    };

    useEffect(() => {
      console.log('hhh', followed)
      console.log('awg', JSON.parse(authorId))

    }, [])
    

    const handleUnFollow = async () => {
        await unfollowUser({
            threadAuthorId: authorId,
            threadCurrentUser: currentUserId,
            path: pathname,
        });
    };

    return (
        <section className='flex gap-x-2 items-center'>

            <div>
                {followed && followed?.includes(JSON.parse(authorId)) ? (
                    <button
                        className='m-r gap-x-2 pr-2 flex items-center hover:scale-105 text-small-semibold'
                        onClick={handleUnFollow}
                    >
                        <p className='text-gray-600 border border-gray-600 rounded-2xl py-1 px-2 '>Unfollow</p>
                    </button>
                ) : (
                    <button
                        className='m-r gap-x-2 pr-2 flex items-center hover:scale-105 text-small-semibold'
                        onClick={handleFollow}
                    >
                        <p className=' text-purple-600 border border-purple-600 rounded-2xl py-1 px-2'>Follow</p>
                    </button>
                )}
            </div>

        </section>
    )
}

export default Follow