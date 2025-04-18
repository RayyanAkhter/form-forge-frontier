
import { create } from 'zustand';
import { FormComponent, FormComponentType, FormData } from '@/types/form';
import { nanoid } from 'nanoid';
import { createComponentTemplate } from './componentTemplates';
import { createDefaultForm } from './formUtils';

interface FormState {
  form: FormData;
  mode: 'edit' | 'preview';
  selectedComponentId: string | null;
  isDragging: boolean;
  isComponentSettingsOpen: boolean;
  isThemeSettingsOpen: boolean;
  
  // Actions
  setMode: (mode: 'edit' | 'preview') => void;
  addComponent: (type: FormComponentType) => void;
  updateComponent: (id: string, updates: Partial<FormComponent>) => void;
  removeComponent: (id: string) => void;
  duplicateComponent: (id: string) => void;
  moveComponent: (fromIndex: number, toIndex: number) => void;
  selectComponent: (id: string | null) => void;
  updateTheme: (theme: Partial<ThemeSettings>) => void;
  updateFormSettings: (title: string, description?: string) => void;
  setIsDragging: (isDragging: boolean) => void;
  toggleComponentSettings: () => void;
  toggleThemeSettings: () => void;
  resetForm: () => void;
}

const defaultForm = createDefaultForm();

export const useFormStore = create<FormState>((set) => ({
  form: defaultForm,
  mode: 'edit',
  selectedComponentId: null,
  isDragging: false,
  isComponentSettingsOpen: false,
  isThemeSettingsOpen: false,

  setMode: (mode) => set({ mode }),

  addComponent: (type) => set((state) => {
    const newComponent: FormComponent = {
      id: nanoid(),
      ...createComponentTemplate(type),
    };

    return {
      form: {
        ...state.form,
        components: [...state.form.components, newComponent],
        updatedAt: new Date().toISOString(),
      },
      selectedComponentId: newComponent.id,
    };
  }),

  updateComponent: (id, updates) => set((state) => ({
    form: {
      ...state.form,
      components: state.form.components.map((component) =>
        component.id === id ? { ...component, ...updates } : component
      ),
      updatedAt: new Date().toISOString(),
    },
  })),

  removeComponent: (id) => set((state) => ({
    form: {
      ...state.form,
      components: state.form.components.filter((component) => component.id !== id),
      updatedAt: new Date().toISOString(),
    },
    selectedComponentId: null,
  })),

  duplicateComponent: (id) => set((state) => {
    const componentToDuplicate = state.form.components.find((c) => c.id === id);
    if (!componentToDuplicate) return state;

    const index = state.form.components.findIndex((c) => c.id === id);
    const duplicatedComponent = {
      ...componentToDuplicate,
      id: nanoid(),
      label: `${componentToDuplicate.label} (Copy)`,
    };

    const updatedComponents = [...state.form.components];
    updatedComponents.splice(index + 1, 0, duplicatedComponent);

    return {
      form: {
        ...state.form,
        components: updatedComponents,
        updatedAt: new Date().toISOString(),
      },
      selectedComponentId: duplicatedComponent.id,
    };
  }),

  moveComponent: (fromIndex, toIndex) => set((state) => {
    const components = [...state.form.components];
    const [removed] = components.splice(fromIndex, 1);
    components.splice(toIndex, 0, removed);

    return {
      form: {
        ...state.form,
        components,
        updatedAt: new Date().toISOString(),
      },
    };
  }),

  selectComponent: (id) => set({ selectedComponentId: id }),

  updateTheme: (theme) => set((state) => ({
    form: {
      ...state.form,
      theme: { ...state.form.theme, ...theme },
      updatedAt: new Date().toISOString(),
    },
  })),

  updateFormSettings: (title, description) => set((state) => ({
    form: {
      ...state.form,
      title,
      description,
      updatedAt: new Date().toISOString(),
    },
  })),

  setIsDragging: (isDragging) => set({ isDragging }),

  toggleComponentSettings: () => set((state) => ({ 
    isComponentSettingsOpen: !state.isComponentSettingsOpen,
    isThemeSettingsOpen: false
  })),
  
  toggleThemeSettings: () => set((state) => ({ 
    isThemeSettingsOpen: !state.isThemeSettingsOpen,
    isComponentSettingsOpen: false
  })),

  resetForm: () => set({
    form: createDefaultForm(),
    selectedComponentId: null,
    isComponentSettingsOpen: false,
    isThemeSettingsOpen: false,
    mode: 'edit'
  })
}));
