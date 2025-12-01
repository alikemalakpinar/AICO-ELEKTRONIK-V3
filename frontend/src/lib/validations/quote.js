import { z } from 'zod';

// PCB Options Schema
export const pcbOptionsSchema = z.object({
  quantity: z
    .number({ required_error: 'Adet giriniz' })
    .min(1, 'Minimum 1 adet sipariş verebilirsiniz')
    .max(100000, 'Maksimum 100.000 adet sipariş verebilirsiniz'),

  layers: z
    .number({ required_error: 'Katman sayısı seçiniz' })
    .refine(val => [1, 2, 4, 6, 8, 10].includes(val), {
      message: 'Geçerli katman sayısı seçiniz (1, 2, 4, 6, 8, 10)'
    }),

  thickness_mm: z
    .number({ required_error: 'Kalınlık seçiniz' })
    .refine(val => [0.4, 0.6, 0.8, 1.0, 1.2, 1.6, 2.0, 2.4].includes(val), {
      message: 'Geçerli kalınlık değeri seçiniz'
    }),

  copper_oz: z
    .number({ required_error: 'Bakır kalınlığı seçiniz' })
    .refine(val => [0.5, 1, 2, 3].includes(val), {
      message: 'Geçerli bakır kalınlığı seçiniz (0.5, 1, 2, 3 oz)'
    }),

  finish: z.enum(['HASL', 'ENIG', 'OSP', 'Immersion Tin', 'Immersion Silver'], {
    required_error: 'Yüzey kaplaması seçiniz'
  }),

  solder_mask_color: z.enum(['green', 'red', 'blue', 'black', 'white', 'yellow'], {
    required_error: 'Solder mask rengi seçiniz'
  }),

  silkscreen: z.enum(['none', 'top', 'bottom', 'both'], {
    required_error: 'Silkscreen seçeneği belirtiniz'
  }),

  min_track_space_mm: z
    .number({ required_error: 'Minimum iz/boşluk değeri giriniz' })
    .min(0.075, 'Minimum 0.075mm değer girilebilir')
    .max(1, 'Maksimum 1mm değer girilebilir'),

  board_width_mm: z
    .number({ required_error: 'Kart genişliği giriniz' })
    .min(5, 'Minimum genişlik 5mm')
    .max(500, 'Maksimum genişlik 500mm'),

  board_height_mm: z
    .number({ required_error: 'Kart yüksekliği giriniz' })
    .min(5, 'Minimum yükseklik 5mm')
    .max(500, 'Maksimum yükseklik 500mm'),

  impedance_controlled: z.boolean().default(false),
  e_test: z.boolean().default(true)
});

// SMT/Assembly Options Schema
export const smtOptionsSchema = z.object({
  assembly_required: z.boolean().default(false),

  sides: z.enum(['single', 'double'], {
    required_error: 'Montaj tarafı seçiniz'
  }).optional(),

  component_count: z
    .number()
    .min(0, 'Bileşen sayısı negatif olamaz')
    .max(10000, 'Maksimum 10.000 bileşen')
    .optional(),

  unique_parts: z
    .number()
    .min(0, 'Unique parça sayısı negatif olamaz')
    .max(1000, 'Maksimum 1.000 unique parça')
    .optional(),

  bga_count: z
    .number()
    .min(0, 'BGA sayısı negatif olamaz')
    .max(100, 'Maksimum 100 BGA')
    .optional(),

  uses_01005: z.boolean().default(false),

  stencil: z.enum(['none', 'frameless', 'framed'], {
    required_error: 'Stencil tipi seçiniz'
  }).optional(),

  inspection_aoi: z.boolean().default(true),
  inspection_xray: z.boolean().default(false),

  sourcing: z.enum(['turnkey', 'consigned', 'partial'], {
    required_error: 'Tedarik modeli seçiniz'
  }).optional()
}).refine(
  data => {
    // If assembly is required, component_count must be provided
    if (data.assembly_required && (!data.component_count || data.component_count < 1)) {
      return false;
    }
    return true;
  },
  {
    message: 'Dizgi seçildiğinde bileşen sayısı girilmelidir',
    path: ['component_count']
  }
);

// Lead Time Schema
export const leadTimeSchema = z.enum(['fast', 'standard', 'economy'], {
  required_error: 'Termin süresi seçiniz'
});

// Complete Quote Form Schema
export const quoteFormSchema = z.object({
  projectName: z
    .string()
    .min(2, 'Proje adı en az 2 karakter olmalıdır')
    .max(100, 'Proje adı en fazla 100 karakter olabilir')
    .optional(),

  pcb: pcbOptionsSchema,
  smt: smtOptionsSchema,
  lead_time: leadTimeSchema,

  ndaAccepted: z.boolean().refine(val => val === true, {
    message: 'Gizlilik sözleşmesini kabul etmeniz gerekmektedir'
  }).optional()
});

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z
    .string({ required_error: 'Ad soyad giriniz' })
    .min(2, 'Ad soyad en az 2 karakter olmalıdır')
    .max(100, 'Ad soyad en fazla 100 karakter olabilir'),

  email: z
    .string({ required_error: 'E-posta adresi giriniz' })
    .email('Geçerli bir e-posta adresi giriniz'),

  phone: z
    .string()
    .regex(/^(\+90|0)?[0-9]{10}$/, 'Geçerli bir telefon numarası giriniz (örn: 05551234567)')
    .optional()
    .or(z.literal('')),

  company: z
    .string()
    .max(100, 'Şirket adı en fazla 100 karakter olabilir')
    .optional(),

  subject: z.enum(['quote', 'support', 'partnership', 'other'], {
    required_error: 'Konu seçiniz'
  }),

  message: z
    .string({ required_error: 'Mesajınızı giriniz' })
    .min(10, 'Mesaj en az 10 karakter olmalıdır')
    .max(2000, 'Mesaj en fazla 2000 karakter olabilir')
});

// Order Tracking Form Schema
export const orderTrackingSchema = z.object({
  orderNumber: z
    .string({ required_error: 'Sipariş numarası giriniz' })
    .regex(/^PCB-\d{4}-\d{6}$/, 'Geçerli sipariş numarası formatı: PCB-YYYY-XXXXXX'),

  email: z
    .string({ required_error: 'E-posta adresi giriniz' })
    .email('Geçerli bir e-posta adresi giriniz')
});

// Validation helper functions
export const validatePCBOptions = (data) => {
  const result = pcbOptionsSchema.safeParse(data);
  return {
    success: result.success,
    errors: result.success ? {} : formatZodErrors(result.error),
    data: result.success ? result.data : null
  };
};

export const validateSMTOptions = (data) => {
  const result = smtOptionsSchema.safeParse(data);
  return {
    success: result.success,
    errors: result.success ? {} : formatZodErrors(result.error),
    data: result.success ? result.data : null
  };
};

export const validateQuoteForm = (data) => {
  const result = quoteFormSchema.safeParse(data);
  return {
    success: result.success,
    errors: result.success ? {} : formatZodErrors(result.error),
    data: result.success ? result.data : null
  };
};

export const validateContactForm = (data) => {
  const result = contactFormSchema.safeParse(data);
  return {
    success: result.success,
    errors: result.success ? {} : formatZodErrors(result.error),
    data: result.success ? result.data : null
  };
};

// Format Zod errors into a more usable structure
const formatZodErrors = (error) => {
  const errors = {};
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    if (!errors[path]) {
      errors[path] = err.message;
    }
  });
  return errors;
};

// Real-time field validation
export const validateField = (schema, field, value) => {
  const fieldSchema = schema.shape?.[field];
  if (!fieldSchema) return { valid: true };

  const result = fieldSchema.safeParse(value);
  return {
    valid: result.success,
    error: result.success ? null : result.error.errors[0]?.message
  };
};

// Export all schemas for use with react-hook-form + zodResolver
export const schemas = {
  quote: quoteFormSchema,
  pcb: pcbOptionsSchema,
  smt: smtOptionsSchema,
  contact: contactFormSchema,
  orderTracking: orderTrackingSchema
};
