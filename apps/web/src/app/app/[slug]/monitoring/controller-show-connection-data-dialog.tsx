'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Controller } from './columns';

interface ControllerShowConnectionDataDialogProps {
  controller: Controller;
}

const formSchema = z.object({
  ip: z.string().optional(),
  key: z.string().optional(),
  macAddress: z.string().optional(),
  ssid: z.string().optional(),
});

export function ControllerShowConnectionDataDialog({
  controller,
}: ControllerShowConnectionDataDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ip: controller.ip ?? '',
      key: controller.key ?? '',
      macAddress: controller.macAddress ?? '',
      ssid: controller.ssid ?? '',
    },
    values: {
      ip: controller.ip ?? '',
      key: controller.key ?? '',
      macAddress: controller.macAddress ?? '',
      ssid: controller.ssid ?? '',
    },
    disabled: true,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // eslint-disable-line no-console
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Dados da conexão</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Dados da conexão</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="macAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MAC</FormLabel>
                  <FormControl>
                    <Input placeholder="MAC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IP</FormLabel>
                  <FormControl>
                    <Input placeholder="IP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ssid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SSID</FormLabel>
                  <FormControl>
                    <Input placeholder="SSID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
