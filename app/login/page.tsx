'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth.context';

export const formSchema = z.object({
  name: z.string().min(1, { message: 'Email required' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

interface LoginFormProps {
  setSelectedTab?: (data: string) => void;
  setUserCreds?: (data: unknown) => void;
}

const LoginForm = ({}: LoginFormProps) => {
  const [apiError, setApiError] = useState('');

  const { logIn, user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const {
    formState: { isValid },
  } = form;

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setApiError('');
    try {
      await logIn(data);
    } catch (error) {
      //@ts-expect-error- type error
      const { message } = error;
      setApiError(message);
    }
  };
  console.log('user from login: ', user);
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-900">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Adopt-O-Matic 5000
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 max-w-80"
                      placeholder="Enter Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 dark:bg-slate-500 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 max-w-80"
                      placeholder="Enter Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={
                !form.getValues('name') || (!form.getValues('email') && isValid)
              }
              className="w-full dark:bg-slate-800 dark:text-white"
            >
              Login
            </Button>
            {!!apiError && (
              <div className="text-destructive text-center">{apiError}</div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
