import type { Meta, StoryObj } from '@storybook/react';
import { Building2, Flag, Globe2, MapPin } from 'lucide-react';
import Icon from '../Icon/Icon';
import Select from './Select';
import type { SelectOption } from './Select';

const countryOptions: SelectOption[] = [
  { value: 'br', label: 'Brasil' },
  { value: 'pt', label: 'Portugal' },
  { value: 'ao', label: 'Angola' },
  { value: 'disabled', label: 'Indisponível', disabled: true },
];

const countryOptionsWithIcons: SelectOption[] = [
  { value: 'br', label: 'Brasil', icon: Flag },
  { value: 'pt', label: 'Portugal', icon: MapPin },
  { value: 'ao', label: 'Angola', icon: Globe2 },
  { value: 'disabled', label: 'Indisponível', icon: Building2, disabled: true },
];

const meta = {
  title: 'Library/Select',
  component: Select,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Combobox acessível com menu suave abaixo do campo, opções com ícones e integração com formulários.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[360px] w-full max-w-md p-4">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    label: 'País',
    placeholder: 'Selecione um país',
    description: 'Usado para personalizar seu conteúdo.',
    containerClassName: 'w-80',
    options: countryOptions,
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'filled', 'ghost'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    options: { control: false },
    leadingContent: { control: false },
    onValueChange: { action: 'value changed' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithSelectedValue: Story = { args: { defaultValue: 'br' } };
export const Required: Story = { args: { required: true } };
export const Optional: Story = { args: { optionalText: '(opcional)' } };
export const WithError: Story = {
  args: { description: 'Esta ajuda é substituída pelo erro.', errorMessage: 'Escolha um país.' },
};
export const WithLeadingIcon: Story = {
  args: { leadingContent: <Icon icon={Globe2} size="small" /> },
};
export const WithOptionIcons: Story = {
  name: 'With option icons',
  args: { options: countryOptionsWithIcons, defaultValue: 'br' },
};
export const Disabled: Story = { args: { disabled: true } };

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5">
      <Select label="Pequeno" size="small" options={countryOptions} />
      <Select label="Médio" size="medium" options={countryOptions} />
      <Select label="Grande" size="large" options={countryOptions} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-5">
      <Select label="Principal" variant="primary" defaultValue="br" options={countryOptions} />
      <Select label="Preenchido" variant="filled" defaultValue="pt" options={countryOptions} />
      <Select label="Fantasma" variant="ghost" defaultValue="ao" options={countryOptions} />
    </div>
  ),
};
