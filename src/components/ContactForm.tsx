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
    <div>
      <label htmlFor="firstName">First name</label>

      <input
        id="firstName"
        type="text"
        {...form.register('firstName')}
      />

      {form.formState.errors.firstName && (
        <p role="alert">
          {form.formState.errors.firstName.message}
        </p>
      )}
    </div>

    <button type="submit">Send enquiry</button>
  </form>
  );
}
