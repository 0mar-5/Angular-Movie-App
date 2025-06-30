import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyCustomColors = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        textColor: '#000000', // Main text
        textColorSecondary: '#6c757d',
        primary: {
          500: '#ffe353', // main brand color
          600: '#e6cc4b', // Hover state
          700: '#ccb642', // Active/pressed
          800: '#b39f3a',
          900: '#998832',
          950: '#807229',
        },
        surface: {
          0: '#f3f1f1', // Cards (--surface-card)
          50: '#fff', // Page background (--surface-ground)
          100: '#e6cc4b', // Main surfaces (--surface-a)
          200: '#e6cc4b', // Hover states (--surface-b)
          300: '#000', // Borders (--surface-border)
        },
      },
      dark: {
        primary: {
          500: '{slate.500}', // Dark primary
          600: '{slate.600}',
        },
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
        },
      },
    },
  },
});

export default MyCustomColors;
