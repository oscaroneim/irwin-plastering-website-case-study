'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  contactFormSchema,
  contactFormDefaults,
  type ContactFormValues,
} from '../validation/contactSchema';

export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactFormDefaults,
  });

  const onSubmit = (values: ContactFormValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* We'll add the actual form fields here next. */}
    </form>
  );
}
