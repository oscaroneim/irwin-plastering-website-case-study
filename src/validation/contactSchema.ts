import { z } from 'zod';

export const LOCATION_TYPES = ['HOME OWNER', 'PRIVATE HOUSE', 'COMMERCIAL PROPERTY'] as const;

export const SERVICE_OPTIONS = [
  'PLASTERING',
  'LIQUID SCREED',
  'K RENDERING',
  'RENDERING',
  'COLOURED SCREED',
  'ONSITE CONSULTATION',
  'REPAIRS',
  'RESTORATION',
  'FIREPROOFING',
  'ACOUSTIC PLASTERING',
  'MONOCOUCHE RENDERING',
  'SAND AND CEMENT RENDERING',
  'TRADITIONAL LIME RENDERING',
  'PEBBLE DASHING',
  'EXTERNAL WALL INSULATION',
  'PLASTERBOARDING/STUD WALLS',
] as const;

export type LocationType = (typeof LOCATION_TYPES)[number];
export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export const isLocationType = (value: string): value is LocationType =>
  (LOCATION_TYPES as readonly string[]).includes(value);

const ukPostcodeRegex =
  /^(GIR\s?0AA|(?:(?:[A-PR-UWYZ][0-9]{1,2})|(?:[A-PR-UWYZ][A-HK-Y][0-9]{1,2})|(?:[A-PR-UWYZ][0-9][A-HJKPSTUW])|(?:[A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRV-Y]))\s?\d[ABD-HJLNP-UW-Z]{2})$/i;

export const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters long.' }),
  secondName: z.string().min(2, { message: 'Second name must be at least 2 characters long.' }),
  phoneNumber: z.string().regex(/^\d{11}$/, { message: 'Phone number must be 11 digits.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  typeOfLocation: z.enum(LOCATION_TYPES, {
    errorMap: () => ({ message: 'Select one type of location.' }),
  }),
  postcode: z.string().regex(ukPostcodeRegex, { message: 'Invalid UK postcode.' }),
  message: z.string().min(10, { message: 'Message should be at least 10 characters.' }),
  services: z.array(z.enum(SERVICE_OPTIONS)).min(1, { message: 'Select at least one service.' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaults: ContactFormValues = {
  firstName: '',
  secondName: '',
  phoneNumber: '',
  email: '',
  typeOfLocation: 'HOME OWNER',
  postcode: '',
  message: '',
  services: [],
};
