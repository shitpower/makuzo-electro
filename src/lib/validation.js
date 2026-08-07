import { z } from "zod";

const sectionSpacingSchema = z.object({
  defaultGap: z.number().int().min(0).max(400),
  overrides: z.record(z.string(), z.number().int().min(0).max(400)),
});

export const companyProfileSchema = z.object({
  legalName: z.string().trim().min(1).max(160),
  regNumber: z.string().trim().min(1).max(64),
  builderRegNumber: z.string().trim().max(64).optional().or(z.literal("")),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(5).max(32),
  streetAddress: z.string().trim().min(1).max(200),
  cityRu: z.string().trim().min(1).max(80),
  cityLv: z.string().trim().min(1).max(80),
  cityEn: z.string().trim().min(1).max(80),
  country: z.string().trim().min(2).max(8),
  countryNameRu: z.string().trim().min(1).max(80),
  countryNameLv: z.string().trim().min(1).max(80),
  countryNameEn: z.string().trim().min(1).max(80),
  postalCode: z.string().trim().max(32).optional().or(z.literal("")),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  instagramUrl: z.string().trim().max(500).optional().or(z.literal("")),
  instagramVisible: z.boolean(),
  footerCompanyVisible: z.boolean(),
});

export const adminLoginSchema = z.object({
  email: z.string().email("Укажите корректный email"),
  password: z.string().min(1, "Пароль обязателен").max(128),
});

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(120),
  phone: z.string().trim().min(5, "Укажите телефон").max(32),
  email: z.string().trim().email("Некорректный email").max(160).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional(),
  website: z.string().max(500).optional().or(z.literal("")),});

export const sectionUpdateSchema = z.object({
  visible: z.boolean().optional(),
  contentRu: z.record(z.string(), z.unknown()).optional(),
  contentLv: z.record(z.string(), z.unknown()).optional(),
  contentEn: z.record(z.string(), z.unknown()).optional(),
});

export const siteSettingsSchema = z.object({
  logoUrl: z.string().max(500).optional(),
  seoTitleRu: z.string().max(180).optional(),
  seoTitleLv: z.string().max(180).optional(),
  seoTitleEn: z.string().max(180).optional(),
  seoDescRu: z.string().max(320).optional(),
  seoDescLv: z.string().max(320).optional(),
  seoDescEn: z.string().max(320).optional(),
  sectionSpacing: sectionSpacingSchema.optional(),
  companyProfile: companyProfileSchema.optional(),
});

export const adminProfileSchema = z
  .object({
    name: z.string().trim().max(120).optional(),
    email: z.string().trim().email("Укажите корректный email").max(160).optional(),
    currentPassword: z.string().min(1, "Укажите текущий пароль").max(128),
    newPassword: z.string().min(8, "Новый пароль — минимум 8 символов").max(128).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (!data.name && !data.email && !data.newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Укажите имя, email или новый пароль",
      });
    }
  });

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().trim().max(120).optional(),
  isRead: z.enum(["true", "false"]).optional(),
});

export const auditListSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  entityType: z.string().trim().max(64).optional(),
  action: z.string().trim().max(64).optional(),
  q: z.string().trim().max(120).optional(),
});
