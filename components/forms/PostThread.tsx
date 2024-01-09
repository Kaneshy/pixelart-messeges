"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import UploadProductsPage from "../upload/page";
import { useEffect, useState } from "react";

interface Props {
  userId: string;
}

interface Inputs {
  imgUrl?: string;
  videoUrl?: string;
  // Add other fields/types as needed
}

interface UploadProductsPageProps {
  onDataSubmit: (data: Inputs) => void;
}


function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [dataChild, setDataChild] = useState<Inputs>({});

  useEffect(() => {
    console.log('ern', dataChild)
  }, [dataChild])
  

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      path: pathname,
      imgUrl: dataChild
    });

    router.push("/");
  };

  const handleDataSubmit = (data: Inputs) => {
    // Handle the data received from the child component
    console.log("Data received from child:", data);
    data && setDataChild(data)
    // You can perform any further operations with the data here
  };




  return (
    <main>
      <div>
        <h1>Parent Component</h1>
        <UploadProductsPage onDataSubmit={handleDataSubmit} />
      </div>
      <Form {...form}>
        <form
          className='mt-10 flex flex-col justify-start gap-10'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='thread'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3'>
                <FormLabel className='text-base-semibold text-light-2'>
                  Content
                </FormLabel>
                <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                  <Textarea rows={15} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='bg-primary-500'>
            Post Thread
          </Button>
        </form>
      </Form>

    </main>

  );
}

export default PostThread;