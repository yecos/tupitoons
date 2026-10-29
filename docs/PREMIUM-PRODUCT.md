# Edición premium de catálogo y producto

Esta iteración parte de producción `65ebb70`. Mantiene precios, referencias, fotografías y venta asistida existentes; cambia su presentación y la elección de talla.

## Resultado

- Tipografía display Barlow Condensed 800 alojada localmente (~22 KiB WOFF2), con licencia OFL incluida. No requiere peticiones a Google en tiempo de visita.
- Catálogo más editorial: tres columnas en escritorio, dos desde 360 px y una en pantallas más estrechas; fotografías clicables, información más legible y una sola acción de talla por tarjeta.
- Entrada por silueta (pantalón amplio, sets y shorts) y orden por precio ascendente/descendente. El orden original del drop se puede restaurar y el orden elegido se conserva al filtrar.
- Ficha más amplia, fotografía completa, descripción, silueta/tela/cuidado traducidos y mensaje de confirmación comercial. No se agregan promesas de stock, composición exacta o tiempos no verificados.
- Talla explícita: el botón de bolsa está deshabilitado hasta elegir S/M/L; al abrir otra ficha no se conserva una talla anterior de forma implícita. Abrir/cerrar la guía desde la ficha conserva la elección de esa ficha.
- Galerías: las otras siluetas dejaron de presentarse como vistas del mismo producto. Los detalles de estampado están identificados; los productos sin otra fotografía válida muestran una única imagen.
- Dimensiones intrínsecas y decodificación asíncrona para imágenes estáticas. Se retiran los controladores de tilt de tarjetas.

## Verificación

Ocho pruebas Node pasan: persistencia no confiable y CSP (existentes), orden numérico, restauración del orden del drop y selección explícita de talla (nuevas). Sintaxis JS y diff comprobados.

Revisión local en iframe del mismo origen a 319/360/390/768/1024/1280 CSS px: sin desbordamiento de documento; fuente cargada correctamente y columnas esperadas. Ficha móvil comprobada sin desbordamiento interno.

Comprobados: filtrar pantalón amplio devuelve ocho piezas; precio ascendente coloca Blue Donut Club antes de los pantalones de COP 189.000; selección L añade Bottle Label Wide Leg talla L; CTA inicialmente deshabilitado; galería cambia entre prenda y estampado manteniendo foco en la miniatura; guía vuelve a la ficha con talla conservada; ficha en inglés y consola de la página directa sin errores/advertencias capturados. No se enviaron mensajes ni se procesaron pagos.

El visor local de QA produjo errores propios de su iframe durante navegación; se excluye de la entrega y se comprobó la aplicación directamente por separado. Las mediciones responsive son de laboratorio, no dispositivos físicos. Pendientes Safari/iOS, lector de pantalla y medición Lighthouse/CrUX.

## Límites y revisión

La fotografía existente de Blue Donut Club continúa compartida con Blue Cartoon Party; hace falta una referencia comercial aprobada para resolver esa ambigüedad. No se han inventado fotografías ni datos de producto. Quedan pendientes fotografías reales adicionales, composición exacta, inventario y disponibilidad por talla.

Regenerar CSP con `node scripts/update-csp.cjs` si se modifica el script inline. Comprobar preview antes de fusionar. Esta iteración no modifica producción.
