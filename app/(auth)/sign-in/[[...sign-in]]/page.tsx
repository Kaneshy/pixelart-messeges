import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return <div className="w-full h-screen flex justify-center align-middle items-center"><SignIn 
  appearance={{
    baseTheme: dark,
    variables: { colorPrimary: 'black' },

  }}
/></div>
  
}