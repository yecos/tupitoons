# TUPITOONS

Tupitoons es una tienda editorial de pijamas urbanas: estampados de cartoon, siluetas relajadas y una actitud pensada para pasar de la cama al barrio.

Sitio publicado: **[tupitoons.vercel.app](https://tupitoons.vercel.app/)**

Repositorio: **[github.com/yecos/tupitoons](https://github.com/yecos/tupitoons)**

## Estado del proyecto

La versión actual es un storefront estático premium, responsive y bilingüe.

- Español como idioma inicial.
- Selector persistente **ES / EN**.
- Catálogo visual con 17 referencias.
- Filtros por pantalón amplio, sets y shorts.
- Búsqueda visual por estampado, silueta y colección.
- Wishlist local con filtro de piezas guardadas.
- Selector de talla S / M / L.
- Detalle de producto premium con galería de imágenes, fit, material y cuidado.
- Bolsa de compra local con cantidades, eliminación, subtotal y persistencia.
- Barra de progreso para envío gratis desde **COP 250.000**.
- Flujo de solicitud de pedido con preferencia de pago PSE/Bancolombia, tarjeta o Nequi/WhatsApp; sin cobro automático todavía.
- Resumen de pedido copiable y referencia única.
- Entrega por domicilio o punto de recogida.
- Enlace de contacto y envío de solicitud por WhatsApp: **+57 301 243 8980**.
- Guía de tallas propia con tablas de pantalones, pantalonetas, shorts y camisetas.
- Biblioteca de estampados y bloques editoriales de marca.
- Newsletter de demostración con aviso explícito de que no hay suscripción activa.
- Centro bilingüe de políticas para envíos, cambios, privacidad y términos.
- Metadatos SEO iniciales: canonical, Open Graph, Twitter Card y datos estructurados de tienda.
- Isotipo grande, transparente y sin wordmark en la cabecera.
- Motion system: entrada editorial, reveal por scroll, parallax, tilt 3D, microinteracciones y soporte para movimiento reducido.
- Diseño responsive para escritorio y móvil.

## Catálogo actual

Los precios son referencias de prototipo y deben confirmarse antes de activar el comercio real.

| Código | Producto | Tipo | Precio de referencia |
| --- | --- | --- | ---: |
| TUPI-001 | Bottle Label Wide Leg | Pantalón amplio | COP 189.000 |
| TUPI-002 | Blue Donut Club | Pantalón amplio | COP 179.000 |
| TUPI-003 | Pink Character Sleep Set | Set | COP 169.000 |
| TUPI-004 | Fried Egg All-Day Set | Set | COP 159.000 |
| TUPI-005 | Red Comic Lounge Shorts | Short | COP 129.000 |
| TUPI-006 | Green Street Pant | Pantalón amplio | COP 189.000 |
| TUPI-016 | Green Street Lounge Shorts | Short | COP 129.000 |
| TUPI-007 | Popcorn Sky Wide Leg | Pantalón amplio | COP 189.000 |
| TUPI-008 | Bottle Label Lounge Shorts | Short | COP 129.000 |
| TUPI-009 | Popcorn Sky Lounge Shorts | Short | COP 129.000 |
| TUPI-010 | Pink Character Wide Leg | Pantalón amplio | COP 189.000 |
| TUPI-017 | Pink Character Lounge Shorts | Short | COP 129.000 |
| TUPI-011 | Red Comic Wide Leg | Pantalón amplio | COP 189.000 |
| TUPI-012 | Stitch Island Wide Leg | Pantalón amplio | COP 189.000 |
| TUPI-013 | Stitch Island Lounge Shorts | Short | COP 129.000 |
| TUPI-014 | Blue Cartoon Party Wide Leg | Pantalón amplio | COP 189.000 |
| TUPI-015 | Blue Cartoon Party Lounge Shorts | Short | COP 129.000 |

## Experiencia de compra

La tienda funciona actualmente como una solicitud de pedido asistida:

1. La persona selecciona producto, talla y cantidad.
2. La bolsa calcula subtotal y progreso de envío gratis.
3. Checkout recoge nombre, correo, teléfono, ciudad, modalidad de entrega, medio de pago preferido, dirección y nota.
4. Se genera una referencia `TUPI-XXXXXX` y se prepara un resumen temporal en memoria.
5. El resumen puede copiarse o enviarse por WhatsApp para confirmar stock, entrega y pago.

No hay pasarela de pagos, inventario remoto ni base de datos conectados todavía. El siguiente paso comercial es integrar un proveedor colombiano y reemplazar las referencias de prototipo por el catálogo aprobado.

## Identidad visual

La interfaz combina una base editorial oscura con acentos de alto contraste:

- Negro tinta para navegación, tarjetas y fondos.
- Papel cálido para superficies editoriales.
- Verde lima, coral, azul y rosa para señales de producto.
- Tipografía display condensada para titulares.
- Monoespaciada para códigos, etiquetas y metadatos.
- Fotografía de estudio gris, accesorios cromados y prints coloridos para equilibrar premium + streetwear.

## Estructura del repositorio

```text
Tupitoons/
├── index.html                         # Aplicación completa: HTML, CSS y JavaScript
├── assets/
│   ├── look-*.jpeg                    # Fotografía editorial de producto
│   ├── texture-*.jpeg                 # Biblioteca de estampados
│   ├── size-guide-*.png               # Referencias técnicas originales
│   ├── tupitoons-logo-glossy.png      # Logo completo original
│   └── tupitoons-mark.png             # Isotipo transparente sin texto
└── README.md
```

El proyecto no usa framework ni dependencias npm. La experiencia está contenida en un único `index.html` para facilitar iteraciones rápidas de marca y publicación estática.

## Persistencia local

La tienda usa `localStorage` para mantener la experiencia durante el prototipado:

| Clave | Uso |
| --- | --- |
| `tupitoons-language-v1` | Idioma seleccionado: `es` o `en` |
| `tupitoons-bag-v1` | Productos de la bolsa |
| `tupitoons-wishlist-v1` | Productos guardados |
| `tupitoons-orders-v1` | Clave antigua: se elimina al abrir la tienda para retirar datos personales persistidos |

Estos datos no sustituyen una base de datos ni deben considerarse un registro comercial definitivo.

## Ejecutar localmente

Desde la raíz del repositorio, sirve los archivos estáticos con cualquier servidor HTTP. En Windows:

```powershell
python -m http.server 4175
```

Abre:

```text
http://127.0.0.1:4175/
```

También es posible usar `npx serve .` u otro servidor estático equivalente.

## Verificaciones recomendadas

Antes de publicar una modificación importante:

1. Abrir la tienda en español y comprobar navegación, filtros y modal de tallas.
2. Cambiar a inglés, recargar y confirmar que la preferencia permanece.
3. Añadir un producto a la bolsa y revisar subtotal, cantidades y envío gratis.
4. Abrir checkout y validar la solicitud sin enviarla a un cliente real.
5. Confirmar que las imágenes nuevas responden correctamente.
6. Revisar el sitio en escritorio y móvil.

## Publicación en Vercel

El proyecto está conectado al proyecto Vercel `tupitoons` y se publica desde la raíz del repositorio:

```powershell
vercel deploy --prod --yes --non-interactive --scope team_T7c1iVQdaL61kwINhPmjA3o3
```

La URL de producción es:

```text
https://tupitoons.vercel.app/
```

## Próxima fase comercial

- Confirmar nombres, disponibilidad y precios definitivos.
- Conectar inventario y pedidos a un backend persistente.
- Integrar una pasarela de pagos disponible en Colombia, incluyendo PSE y otros métodos locales.
- Definir tarifas, cobertura y tiempos de envío.
- Sustituir la guía informativa de políticas por textos jurídicos finales revisados.
- Añadir analítica de conversión y seguimiento de eventos.
- Configurar dominio final y correo comercial.
- Crear panel interno para catálogo, pedidos y estados de despacho.

## Última publicación

- Commit anterior de producción: `32bd92b`
- Estado: producción activa y verificada.

## Auditoría y verificaciones

Ver [auditoría priorizada](docs/AUDIT-2026-10-28.md). Ejecuta `node --test tests/*.test.cjs`. Si editas un script inline, ejecuta `node scripts/update-csp.cjs` para actualizar su SHA-256 en `vercel.json`; la prueba falla si la CSP queda desactualizada. Los headers deben verificarse en el preview de Vercel antes de fusionar.


## Google Analytics 4

ID de medición: `G-C94DMDNF0V`. `scripts/analytics.js` prepara la cola antes de cargar `gtag.js` asíncronamente en el `<head>`. Hay una única configuración: GA4 envía el `page_view` inicial automáticamente, sin un segundo evento manual.

El sitio no tiene router: los enlaces `#shop`, `#story`, etc. son secciones del mismo documento. Sus clics (incluidos guía de tallas y políticas) envían `section_navigation` con `section_id` de una lista fija; no generan pageviews virtuales. También se detectan enlaces con scroll gestionado por JavaScript. No se envían campos del checkout ni búsquedas como parámetros propios. Google Signals y personalización publicitaria están desactivados.

La CSP permite los orígenes de GA4 sin añadir `unsafe-inline` a scripts. `scripts/update-csp.cjs` conserva el permiso del cargador al regenerar hashes. Referencias: [pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views) y [CSP sin funciones publicitarias](https://developers.google.com/tag-platform/security/guides/csp).

Verificación: `node --test tests/*.test.cjs`. Tras desplegar, comprobar en DevTools que `gtag/js` carga, que las peticiones `g/collect` usan `tid=G-C94DMDNF0V`, que hay un solo `en=page_view` por carga y que los clics generan `en=section_navigation`. Confirmar recepción en Tiempo real o DebugView (activar depuración solo durante la prueba). No instalar además el mismo tag mediante GTM. La recepción real y los ajustes remotos de medición mejorada requieren acceso a la propiedad GA4 y no están cubiertos por las pruebas locales.
