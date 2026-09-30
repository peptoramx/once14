# ONCE14 — Plan de imágenes (integrado)

Las cinco escenas ya se generaron e integraron. IMAGE-GENERATION.md registra la ejecución.
Layouts e interacciones funcionan también sin fotografías en caso de fallo de carga.
La portada reserva una capa fotográfica de ancho completo; la galería reserva tres imágenes
de actividades, y capital dispone de una imagen editorial. No usar gráficos como sustitutos.

| Clave | Nombre de activo | Escena | Encuadre |
| --- | --- | --- | --- |
| consulting | consulting | Consultores revisando previsiones económicas y financieras | Colaboración natural, documentos sin texto legible, oficina luminosa; 4:3 |
| capital | capital | Preparación de un expediente y estrategia de capital | Mesa de trabajo editorial, análisis y propuesta; 4:3 |
| agribusiness | agroindustry | Producción primaria y agroindustria | Campo irrigado y empaque; 16:9 |
| industry | industry | Manufactura y operación industrial | Planta activa y supervisión de producción; 16:9 |
| trade | trade | Distribución y comercio | Preparación de mercancía y logística; 16:9 |

## Dirección común

Fotografía editorial realista, luminosa, sobria y contemporánea. Verde profundo y neutrales cálidos;
latón discreto solo donde sea natural. Sin filtros de color artificiales, logos, clientes identificables,
texto legible, handshake de stock, certificaciones ni promesas de rentabilidad.
No representar las personas como equipo real de ONCE14. No reciclar una foto entre actividades.
Sonora–Arizona–California es contexto para las escenas económicas, no una sección ni tema
promocional. Integrar las fotos junto a consultoría, capital y sectores existentes.

## Integración

1. Generar e inspeccionar cada original y guardarlo en el workspace.
2. Exportar assets/editorial/NOMBRE-640.webp y NOMBRE-1200.webp.
3. Activar ready:true para la clave correspondiente de js/media.js.
4. Revisar object-position móvil/PC; el texto queda fuera de la foto.
5. Comprobar carga, fallo de recurso, srcset, idioma del alt, estabilidad y caption conceptual.
   Revisar especialmente legibilidad del hero sobre la fotografía y recorte vertical móvil.
6. Carga diferida salvo hero. No carrusel automático.

No desplegar automáticamente por agregar las imágenes.
