# ONCE14 — Capital & Business Strategy

Rediseño basado en los archivos locales facilitados por el usuario.

## Identidad

Verde #103c2e, dorado de lectura #94651c, dorado claro #e7bd68, negro #101713.
Archivo Black para titulares de mayor presencia geométrica; Inter para texto.
La fuente exacta del logo no fue suministrada. El wordmark usa la imagen suministrada, no texto recreado.
Logo web de 30 KB derivado del original; iconos basados en su símbolo, sin rediseñarlo.
Logo visible actualizado a assets/logo-transparent.webp con canal alfa; PNG conservado
en assets/logo-transparent.png. Extracción mediante imagegen, sin cambio de tipografía,
texto o composición observado en la revisión. Original logo-full.png intacto.
Pie sobre superficie clara para conservar el contraste de las letras negras sin recuadro.

## Funciones conservadas y mejoradas

- Ocho servicios, tres pólizas y precios originales; contenido reorganizado en nuevos layouts.
- Idiomas español/inglés con preferencia persistente y etiquetas accesibles.
- Menú móvil con Escape, estado expandido y enlaces que lo cierran.
- Rutas desde necesidades hacia servicios específicos, con apertura de su detalle.
- FAQ y servicios operables por teclado; contenidos ocultos fuera del orden de foco.
- Correo, teléfonos y tres enlaces externos originales.
- Portada de ancho completo con capa fotográfica, texto breve y llamadas a la acción.
- Galería horizontal de agroindustria, manufactura y comercio, con controles y desplazamiento táctil.
- Servicios en filas compactas, sin los anteriores iconos y cuadros grandes.
- Menor espaciado entre secciones y tipografía revisada.
- Explorador de los ocho servicios con buscador bilingüe y filtros por objetivo.
- Proceso de trabajo interactivo: cinco etapas seleccionables y su explicación.
- Sectores originales conservados; sin sección geográfica añadida.
- Cinco módulos de fotografía listos para su integración, sin solicitudes a archivos pendientes.
- Contenido legible sin JavaScript; movimiento reducido respetado.
- Favicon SVG, iconos PNG 128/180/192/512 y manifest de acceso directo.

## Vista local

Abrir index.html o usar un servidor estático. Sin dependencias de build.
Las fuentes de Google requieren internet; hay alternativas sans-serif del sistema.
GitHub Pages admite los archivos en raíz o en subruta porque las rutas son relativas.
El manifest permite acceso directo; no se añade service worker ni funcionamiento offline.

## Verificación

JavaScript válido, rutas internas y recursos locales comprobados.
Navegador: menú móvil, idioma persistente, rutas hacia servicio y FAQ.
Sin desbordamiento ni títulos recortados en 320/390/768/1366 px.
No se enviaron correos, llamadas ni solicitudes a clientes.
La disponibilidad de los proyectos externos no fue validada; se conservaron sus direcciones.

## Publicación

Preparado para revisión en peptoramx/once14. No altera once14biz/once14.
No configurar dominio ni publicar producción sin la indicación del propietario.

## Estado de la fase visual

Cinco imágenes conceptuales generadas con la herramienta integrada e incorporadas localmente.
assets/editorial contiene once variantes WebP: 640/1200 por escena y 1600 para portada.
Total de todas las variantes: 1,077,880 bytes; el navegador selecciona una por escena.
Los originales están fuera de los archivos públicos, en outputs/once14-image-originals.
La galería tiene tres actividades distintas; capital y portada usan escenas independientes.
css/editorial.css contiene la nueva composición y prevalece sobre los estilos base.
La previa requiere aprobación antes del commit, push y publicación.
