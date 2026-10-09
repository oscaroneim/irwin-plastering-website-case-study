import {
  contactFormSchema,
  contactFormDefaults,
  type ContactFormValues,
  LOCATION_TYPES,
  SERVICE_OPTIONS,
  isLocationType,
} from '../validation/contactSchema';

const form = useForm<ContactFormValues>({
  resolver: zodResolver(contactFormSchema),
  defaultValues: contactFormDefaults,
});
