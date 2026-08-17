# Plan de Implementación: Fase C y Fase D del Panel de Administración

## Objetivo
Mejorar la usabilidad del panel de Decap CMS reorganizando campos, añadiendo hints, validaciones y una vista previa (preview template) que refleje la UI del sitio. Además, inyectar estilos personalizados para alinear el panel con la identidad visual de la marca (Muebles Gumilla).

## Fase C: Reorganización y Validaciones del Formulario
### Reordenamiento y Configuración de Campos (`public/admin/config.yml`)
Modificaré la colección de `productos` para aplicar el orden solicitado:
1. `nombre` (Hint: Nombre del producto)
2. `categoria`
3. `imagenes` (Hint: Sube las fotos. La primera será la principal. El widget `list` con `image` ya permite miniaturas).
4. `descripcion_corta`
5. `descripcion_larga`
6. `medidas` (object: alto, ancho, profundidad con `min: 1`, unidad, personalizable)
7. `material`
8. `tiempo_fabricacion_estimado`
9. `precio_referencial` (number con `min: 0`, `value_type: int`, Hint: "Sin puntos ni decimales, en CLP")
10. `precio_nota` (Hint: Sugerencia: "Precio referencial. Medidas y materiales personalizables — precio final se coordina por WhatsApp")
11. `destacado`

### Vista Previa Personalizada (`public/admin/index.html`)
Registraré un componente de React (usando `h` o `createClass` ya que Decap usa React internamente) con `CMS.registerPreviewTemplate('productos', ProductPreview)`.
El componente leerá los datos del formulario (`entry.getIn(['data', ...])`) y renderizará una aproximación del componente `ProductCard` o la vista de detalle del producto, cargando también los estilos globales.

## Fase D: Pulido Visual del Panel
1. **Logo:** Configurar `logo_url` en `config.yml` apuntando al logo de Muebles Gumilla para la pantalla de login.
2. **Estilos Custom:** Registrar un archivo CSS para el panel con `CMS.registerPreviewStyle()` y aplicar variables CSS para ajustar los colores de la interfaz de Decap CMS a la paleta "Cálido Tierra" (Beige, marrones, etc.) y tipografía.

## Open Questions / Feedback Required
- El esquema de Markdown almacena `medidas` como un objeto en el frontmatter, lo cual el widget `object` respeta perfectamente. ¿Te parece bien que para hacer la tarjeta más compacta, usemos CSS custom (Fase D) para colocar los campos de alto/ancho/profundidad en una fila horizontal dentro del formulario?
- El campo `slug` no es parte del frontmatter actualmente, es el nombre físico del archivo generado por Decap a partir del `identifier_field` (nombre). Añadir una validación de patrón al slug requeriría añadir un campo explícito `slug` al frontmatter. ¿Prefieres mantener el comportamiento actual donde Decap lo autogenera a partir del nombre, o añadimos un campo `slug` editable al frontmatter?
