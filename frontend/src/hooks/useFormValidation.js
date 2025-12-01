import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useCallback } from 'react';
import { schemas } from '../lib/validations/quote';

/**
 * Custom hook for form validation with Zod schemas
 * Integrates with react-hook-form and provides Turkish error messages
 */
export const useFormValidation = (schemaName, defaultValues = {}) => {
  const schema = schemas[schemaName];

  if (!schema) {
    throw new Error(`Schema "${schemaName}" not found. Available: ${Object.keys(schemas).join(', ')}`);
  }

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange' // Validate on change for real-time feedback
  });

  return form;
};

/**
 * Hook for step-by-step form validation (wizard forms)
 */
export const useStepValidation = (steps, currentStep) => {
  const [stepErrors, setStepErrors] = useState({});

  const validateStep = useCallback((stepData) => {
    const stepSchema = steps[currentStep]?.schema;
    if (!stepSchema) return { valid: true, errors: {} };

    const result = stepSchema.safeParse(stepData);
    const errors = result.success ? {} : formatErrors(result.error);

    setStepErrors(prev => ({
      ...prev,
      [currentStep]: errors
    }));

    return {
      valid: result.success,
      errors
    };
  }, [currentStep, steps]);

  const clearStepErrors = useCallback((step) => {
    setStepErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[step];
      return newErrors;
    });
  }, []);

  return {
    stepErrors,
    validateStep,
    clearStepErrors,
    hasErrors: Object.keys(stepErrors).length > 0
  };
};

/**
 * Hook for real-time field validation
 */
export const useFieldValidation = (schema) => {
  const [fieldErrors, setFieldErrors] = useState({});

  const validateField = useCallback((field, value) => {
    const fieldSchema = schema.shape?.[field];
    if (!fieldSchema) return { valid: true };

    const result = fieldSchema.safeParse(value);
    const error = result.success ? null : result.error.errors[0]?.message;

    setFieldErrors(prev => ({
      ...prev,
      [field]: error
    }));

    return {
      valid: result.success,
      error
    };
  }, [schema]);

  const clearFieldError = useCallback((field) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    fieldErrors,
    validateField,
    clearFieldError
  };
};

/**
 * Format Zod errors into a flat object
 */
const formatErrors = (error) => {
  const errors = {};
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    if (!errors[path]) {
      errors[path] = err.message;
    }
  });
  return errors;
};

/**
 * HOC for wrapping form inputs with validation
 */
export const withValidation = (InputComponent) => {
  return function ValidatedInput({ error, touched, ...props }) {
    const showError = touched && error;

    return (
      <div className="relative">
        <InputComponent
          {...props}
          className={`${props.className || ''} ${showError ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        {showError && (
          <p className="mt-1 text-sm text-red-500 animate-fadeIn">{error}</p>
        )}
      </div>
    );
  };
};

export default useFormValidation;
