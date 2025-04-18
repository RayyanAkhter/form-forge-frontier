
import { FormComponent, FormComponentType } from '@/types/form';
import { nanoid } from 'nanoid';

const getDefaultLabel = (type: FormComponentType): string => {
  const labels: Record<FormComponentType, string> = {
    shortText: 'Short Text',
    longText: 'Long Text',
    email: 'Email',
    number: 'Number',
    checkbox: 'Checkbox Group',
    radio: 'Radio Group',
    select: 'Dropdown',
    date: 'Date',
    phone: 'Phone Number',
    name: 'Name',
    address: 'Address',
    file: 'File Upload',
    payment: 'Payment',
    rating: 'Rating',
    switch: 'Switch',
    slider: 'Slider',
    image: 'Image',
    link: 'Link',
    fileDisplay: 'File Display',
    heading: 'Heading',
    paragraph: 'Paragraph',
    divider: 'Divider',
  };
  
  return labels[type] || 'Question';
};

export const createComponentTemplate = (type: FormComponentType): Omit<FormComponent, 'id'> => {
  const baseTemplate = {
    type,
    label: getDefaultLabel(type),
    required: false,
    width: 'full' as const,
  };

  switch (type) {
    case 'shortText':
      return {
        ...baseTemplate,
        placeholder: 'Enter your answer',
        validation: [{ type: 'maxLength', value: 100, message: 'Maximum 100 characters allowed' }],
      };
    case 'longText':
      return {
        ...baseTemplate,
        placeholder: 'Enter your answer',
      };
    case 'email':
      return {
        ...baseTemplate,
        placeholder: 'Enter your email',
        validation: [{ type: 'email', message: 'Please enter a valid email address' }],
      };
    case 'number':
      return {
        ...baseTemplate,
        placeholder: 'Enter a number',
      };
    case 'checkbox':
    case 'radio':
      return {
        ...baseTemplate,
        options: [
          { id: nanoid(), label: 'Option 1', value: 'option1' },
          { id: nanoid(), label: 'Option 2', value: 'option2' },
          { id: nanoid(), label: 'Option 3', value: 'option3' },
        ],
      };
    case 'select':
      return {
        ...baseTemplate,
        placeholder: 'Select an option',
        options: [
          { id: nanoid(), label: 'Option 1', value: 'option1' },
          { id: nanoid(), label: 'Option 2', value: 'option2' },
          { id: nanoid(), label: 'Option 3', value: 'option3' },
        ],
      };
    case 'date':
      return {
        ...baseTemplate,
        placeholder: 'Select a date',
      };
    case 'phone':
      return {
        ...baseTemplate,
        placeholder: 'Enter phone number',
      };
    case 'name':
      return {
        ...baseTemplate,
        placeholder: 'Enter your name',
      };
    case 'address':
      return {
        ...baseTemplate,
        placeholder: 'Enter your address',
      };
    case 'file':
      return {
        ...baseTemplate,
        label: 'File Upload',
        acceptedFileTypes: '.pdf,.docx,.jpg,.png',
        maxFileSize: 5,
      };
    case 'payment':
      return {
        ...baseTemplate,
        label: 'Payment',
      };
    case 'rating':
      return {
        ...baseTemplate,
        label: 'Rate your experience',
        max: 5,
      };
    case 'switch':
      return {
        ...baseTemplate,
        label: 'Toggle Option',
        defaultValue: false,
      };
    case 'slider':
      return {
        ...baseTemplate,
        label: 'Slider',
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
      };
    case 'image':
      return {
        ...baseTemplate,
        label: 'Image',
        imageUrl: 'https://via.placeholder.com/400x200',
      };
    case 'link':
      return {
        ...baseTemplate,
        label: 'Link',
        linkText: 'Click here',
        linkUrl: 'https://example.com',
      };
    case 'fileDisplay':
      return {
        ...baseTemplate,
        label: 'File Display',
      };
    case 'heading':
      return {
        ...baseTemplate,
        label: 'Heading Text',
      };
    case 'paragraph':
      return {
        ...baseTemplate,
        label: 'Paragraph Text',
      };
    case 'divider':
      return {
        ...baseTemplate,
        label: '',
      };
    default:
      return baseTemplate;
  }
};
