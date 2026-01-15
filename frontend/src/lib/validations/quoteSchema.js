import { z } from 'zod';

// PCB Specification Limits
export const PCB_LIMITS = {
  quantity: { min: 1, max: 100000 },
  layers: { options: [1, 2, 4, 6, 8, 10, 12] },
  thickness: { options: [0.4, 0.6, 0.8, 1.0, 1.2, 1.6, 2.0, 2.4] },
  copperOz: { options: [0.5, 1, 2, 3] },
  boardSize: { min: 5, max: 500 }, // mm
  minTrack: { min: 0.075, max: 1.0 }, // mm
  finishes: ['HASL', 'HASL-LF', 'ENIG', 'OSP', 'Immersion Tin', 'Immersion Silver', 'Hard Gold'],
  colors: ['green', 'red', 'blue', 'black', 'white', 'yellow', 'purple', 'matte_black', 'matte_green'],
  silkscreenOptions: ['none', 'top', 'bottom', 'both']
};

// SMT Assembly Limits
export const SMT_LIMITS = {
  componentCount: { min: 0, max: 10000 },
  uniqueParts: { min: 0, max: 1000 },
  bgaCount: { min: 0, max: 500 },
  stencilOptions: ['none', 'frameless', 'framed'],
  sourcingOptions: ['turnkey', 'consigned', 'partial'],
  sidesOptions: ['single', 'double']
};

// Validation messages (Turkish)
const messages = {
  tr: {
    quantity: {
      min: `Minimum ${PCB_LIMITS.quantity.min} adet sipariş verebilirsiniz`,
      max: `Maksimum ${PCB_LIMITS.quantity.max} adet sipariş verebilirsiniz`,
      required: 'Adet zorunludur'
    },
    boardSize: {
      min: `Minimum boyut ${PCB_LIMITS.boardSize.min}mm olmalıdır`,
      max: `Maksimum boyut ${PCB_LIMITS.boardSize.max}mm olabilir`,
      required: 'Kart boyutu zorunludur'
    },
    minTrack: {
      min: `Minimum iz/boşluk ${PCB_LIMITS.minTrack.min}mm olmalıdır`,
      max: `Maksimum iz/boşluk ${PCB_LIMITS.minTrack.max}mm olabilir`
    },
    components: {
      min: 'Bileşen sayısı 0\'dan küçük olamaz',
      max: `Maksimum ${SMT_LIMITS.componentCount.max} bileşen desteklenir`
    },
    projectName: {
      min: 'Proje adı en az 2 karakter olmalıdır',
      max: 'Proje adı en fazla 100 karakter olabilir'
    }
  }
};

const t = messages.tr;

// PCB Options Schema
export const pcbOptionsSchema = z.object({
  quantity: z
    .number({ required_error: t.quantity.required, invalid_type_error: 'Geçerli bir sayı giriniz' })
    .int('Adet tam sayı olmalıdır')
    .min(PCB_LIMITS.quantity.min, t.quantity.min)
    .max(PCB_LIMITS.quantity.max, t.quantity.max),

  layers: z
    .number()
    .refine(val => PCB_LIMITS.layers.options.includes(val), {
      message: `Katman sayısı şunlardan biri olmalıdır: ${PCB_LIMITS.layers.options.join(', ')}`
    }),

  thickness_mm: z
    .number()
    .refine(val => PCB_LIMITS.thickness.options.includes(val), {
      message: 'Geçersiz kalınlık değeri'
    }),

  copper_oz: z
    .number()
    .refine(val => PCB_LIMITS.copperOz.options.includes(val), {
      message: 'Geçersiz bakır ağırlığı'
    }),

  board_width_mm: z
    .number({ required_error: t.boardSize.required })
    .min(PCB_LIMITS.boardSize.min, t.boardSize.min)
    .max(PCB_LIMITS.boardSize.max, t.boardSize.max),

  board_height_mm: z
    .number({ required_error: t.boardSize.required })
    .min(PCB_LIMITS.boardSize.min, t.boardSize.min)
    .max(PCB_LIMITS.boardSize.max, t.boardSize.max),

  min_track_space_mm: z
    .number()
    .min(PCB_LIMITS.minTrack.min, t.minTrack.min)
    .max(PCB_LIMITS.minTrack.max, t.minTrack.max),

  finish: z
    .enum(PCB_LIMITS.finishes, {
      errorMap: () => ({ message: 'Geçersiz yüzey kaplaması seçimi' })
    }),

  solder_mask_color: z
    .enum(PCB_LIMITS.colors, {
      errorMap: () => ({ message: 'Geçersiz renk seçimi' })
    }),

  silkscreen: z
    .enum(PCB_LIMITS.silkscreenOptions, {
      errorMap: () => ({ message: 'Geçersiz silkscreen seçimi' })
    }),

  impedance_controlled: z.boolean().default(false),
  e_test: z.boolean().default(true)
});

// SMT Options Schema
export const smtOptionsSchema = z.object({
  assembly_required: z.boolean().default(false),

  sides: z
    .enum(SMT_LIMITS.sidesOptions, {
      errorMap: () => ({ message: 'Geçersiz taraf seçimi' })
    })
    .default('single'),

  component_count: z
    .number()
    .int('Bileşen sayısı tam sayı olmalıdır')
    .min(SMT_LIMITS.componentCount.min, t.components.min)
    .max(SMT_LIMITS.componentCount.max, t.components.max)
    .default(0),

  unique_parts: z
    .number()
    .int()
    .min(SMT_LIMITS.uniqueParts.min)
    .max(SMT_LIMITS.uniqueParts.max)
    .default(0),

  bga_count: z
    .number()
    .int()
    .min(SMT_LIMITS.bgaCount.min)
    .max(SMT_LIMITS.bgaCount.max)
    .default(0),

  uses_01005: z.boolean().default(false),

  stencil: z
    .enum(SMT_LIMITS.stencilOptions, {
      errorMap: () => ({ message: 'Geçersiz stencil seçimi' })
    })
    .default('frameless'),

  inspection_aoi: z.boolean().default(true),
  inspection_xray: z.boolean().default(false),

  sourcing: z
    .enum(SMT_LIMITS.sourcingOptions, {
      errorMap: () => ({ message: 'Geçersiz tedarik seçimi' })
    })
    .default('turnkey')
});

// Complete Quote Form Schema
export const quoteFormSchema = z.object({
  // Project Info
  projectName: z
    .string()
    .min(2, t.projectName.min)
    .max(100, t.projectName.max)
    .optional(),

  ndaAccepted: z.boolean().default(false),

  // PCB Options (embedded)
  quantity: pcbOptionsSchema.shape.quantity,
  layers: pcbOptionsSchema.shape.layers,
  thickness_mm: pcbOptionsSchema.shape.thickness_mm,
  copper_oz: pcbOptionsSchema.shape.copper_oz,
  board_width_mm: pcbOptionsSchema.shape.board_width_mm,
  board_height_mm: pcbOptionsSchema.shape.board_height_mm,
  min_track_space_mm: pcbOptionsSchema.shape.min_track_space_mm,
  finish: pcbOptionsSchema.shape.finish,
  solder_mask_color: pcbOptionsSchema.shape.solder_mask_color,
  silkscreen: pcbOptionsSchema.shape.silkscreen,
  impedance_controlled: pcbOptionsSchema.shape.impedance_controlled,
  e_test: pcbOptionsSchema.shape.e_test,

  // Panelization
  panelization_mode: z.enum(['none', 'array']).default('none'),
  panel_n: z.number().int().min(1).max(20).default(2),
  panel_m: z.number().int().min(1).max(20).default(2),

  // SMT Options (embedded)
  assembly_required: smtOptionsSchema.shape.assembly_required,
  sides: smtOptionsSchema.shape.sides,
  component_count: smtOptionsSchema.shape.component_count,
  unique_parts: smtOptionsSchema.shape.unique_parts,
  bga_count: smtOptionsSchema.shape.bga_count,
  uses_01005: smtOptionsSchema.shape.uses_01005,
  stencil: smtOptionsSchema.shape.stencil,
  inspection_aoi: smtOptionsSchema.shape.inspection_aoi,
  inspection_xray: smtOptionsSchema.shape.inspection_xray,
  sourcing: smtOptionsSchema.shape.sourcing,

  // Lead Time
  lead_time: z.enum(['fast', 'standard', 'economy']).default('standard')
});

// File Upload Schema
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(file => file.size <= 50 * 1024 * 1024, {
      message: 'Dosya boyutu 50MB\'ı geçemez'
    })
    .refine(
      file => {
        const allowedTypes = [
          'application/zip',
          'application/x-zip-compressed',
          'application/x-rar-compressed',
          'application/x-rar'
        ];
        const allowedExtensions = ['.zip', '.rar', '.7z', '.tar.gz'];
        const ext = '.' + file.name.split('.').pop().toLowerCase();
        return allowedTypes.includes(file.type) || allowedExtensions.includes(ext);
      },
      {
        message: 'Sadece ZIP ve RAR dosyaları kabul edilir'
      }
    )
});

// Validate partial form data for real-time validation
export function validateField(fieldName, value, schema = quoteFormSchema) {
  try {
    const fieldSchema = schema.shape[fieldName];
    if (!fieldSchema) return { valid: true };

    fieldSchema.parse(value);
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0]?.message };
    }
    return { valid: false, error: 'Doğrulama hatası' };
  }
}

// Validate entire form
export function validateForm(data, schema = quoteFormSchema) {
  try {
    const validData = schema.parse(data);
    return { valid: true, data: validData, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = {};
      error.errors.forEach(err => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { valid: false, data: null, errors };
    }
    return { valid: false, data: null, errors: { _form: 'Doğrulama hatası' } };
  }
}

// Pre-coerce string inputs to numbers for form inputs
export function coerceFormData(data) {
  return {
    ...data,
    quantity: Number(data.quantity) || 0,
    layers: Number(data.layers) || 2,
    thickness_mm: Number(data.thickness_mm) || 1.6,
    copper_oz: Number(data.copper_oz) || 1,
    board_width_mm: Number(data.board_width_mm) || 0,
    board_height_mm: Number(data.board_height_mm) || 0,
    min_track_space_mm: Number(data.min_track_space_mm) || 0.15,
    component_count: Number(data.component_count) || 0,
    unique_parts: Number(data.unique_parts) || 0,
    bga_count: Number(data.bga_count) || 0,
    panel_n: Number(data.panel_n) || 2,
    panel_m: Number(data.panel_m) || 2
  };
}

export default quoteFormSchema;
