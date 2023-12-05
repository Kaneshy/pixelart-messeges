import Link from 'next/link'
import Image from 'next/image'
import Editprofile from '../cards/Editprofile'


import { SignedIn, SignOutButton, UserButton, SignInButton, SignedOut } from '@clerk/nextjs'

const Topbar = () => {
  return (
    <nav className="topbar">
      <Link
        href='/'
        className='flex items-center gap-4'>
        <Image src='/assets/logo.svg' alt='logo' width={28} height={28} />
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>Pixelart Messeges</p>
      </Link>

      <div className='flex items-center gap-1'>
        <Link href='/profile/edit' className='flex text-bold text-white px-2'>
          <Editprofile/>
        </Link>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer'>
                <Image
                  src='/assets/logout.svg'
                  alt='logout'
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <SignedOut>
          <div className="head-text text-left block md:hidden ">
            <SignInButton>
              <div className='flex cursor-pointer'>
                <Image
                  src='/assets/logout.svg'
                  alt='logout'
                  width={24}
                  height={24}
                />
              </div>
            </SignInButton>
          </div>
        </SignedOut>

        <div className="head-text text-left  ">
          <UserButton afterSignOutUrl="/" />
        </div>

      </div>

    </nav>
  )
}

export default Topbar