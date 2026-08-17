import { z, defineCollection, reference } from 'astro:content';

const categoriasCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    nombre: z.string().min(1, "El nombre de la categoría es obligatorio"),
    imagen: z.object({
      imagen: image(),
      alt: z.string(),
    })
  })
});

const productosCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    nombre: z.string().min(1, "El nombre del producto es obligatorio"),
    descripcion_corta: z.string(),
    categoria: reference('categorias'),
    precio_referencial: z.number(),
    precio_nota: z.string().default("Precio referencial. Medidas y materiales personalizables — precio final se coordina por WhatsApp"),
    medidas: z.object({
      alto: z.number(),
      ancho: z.number(),
      profundidad: z.number(),
      unidad: z.string().default('cm'),
      personalizable: z.boolean().default(true),
    }),
    descripcion_larga: z.string(),
    material: z.string(),
    tiempo_fabricacion_estimado: z.string(),
    imagenes: z.array(z.object({
      imagen: image(),
      alt: z.string(),
    })),
    destacado: z.boolean().default(false),
  })
});

export const collections = {
  'categorias': categoriasCollection,
  'productos': productosCollection,
};
