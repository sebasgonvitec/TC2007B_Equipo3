# Sistema de Gestión de Archivos de Álvaro Obregón
![Logotipo de la Administración 2021-2024](https://aao.cdmx.gob.mx/wp-content/uploads/logo_banner_new.svg)

El Sistema de Gestión de Archivos es un gestor para apoyar la digitalización de archivos y carpetas de índole legal. Se diseño teniendo en mente la gestión actual y la satisfacción de todos los funcionarios de la Alcaldía.

![Pantalla Principal del Sistema]()

> Este sistema se originó para el uso de la Alcaldía Álvaro Obregón y por lo tanto, esta personalizada para las operaciones de la misma.

## Manual de Uso

Si desea conocer como utilizar el Sistema, puede consultar el manual de uso [aquí](Manual.md)

## Instalación

Si prefiere seguir la instalación del sistema en un video, se encuentra disponible [aquí](https://youtu.be/8Z8Z8Z8Z8Z8)

Para instalar el Sistema de Gestión de Archivos, debe seguir los siguientes pasos:

**1.- Clonar el repositorio en su equipo.** 

Para esto se debe de tener instalado [Git](https://git-scm.com/downloads)

Obtenemos el link del repositorio desde el botón verde que dice "Code" y copiamos el link.

Después abrimos la terminal de comandos y nos dirigimos a la carpeta donde queremos clonar el repositorio. Una vez ahí corremos el siguiente comando:

    git clone <Link del repositorio>

Una vez que se haya clonado, nos movemos a la carpeta principal del proyecto llamada "filesAO"

**2.- Importar el certificado de https en el navegador**

Dentro del directorio encontramos una carpeta llamada "CA", la cual contiene dos archivos: "rootCA.cer" y "CA.key". El siguiente paso depende de navegador y sistema operativo que se esté utilizando, en este caso utilizaremos Firefox.

Para importar el certificado en Firefox, abrimos el navegador y vamos a la sección de "Preferencias" y seleccionamos la opción de "Privacidad y Seguridad". En la sección de "Privacidad y Seguridad" seleccionamos la opción de "Certificados" y en la sección de "Certificados" seleccionamos la opción de "Ver certificados". En la sección de "Ver certificados" seleccionamos la opción de "Autoridades Certificadoras" y en la sección de "Autoridades Certificadoras" seleccionamos la opción de "Importar". En la sección de "Importar" seleccionamos la opción de "Seleccionar archivo" y seleccionamos el archivo "rootCA.cer" que se encuentra dentro de la carpeta "CA". Una vez que se haya importado el certificado, corroboramos que la autoridad certificadora "myCertOrg" aparezca en la lista y damos click al botón de "OK".

**3.- Instalar las dependencias**

Para instalar las dependencias, se debe de tener instalado [Node.js](https://nodejs.org/es/download/)

Navegamos a la carpeta de backend que se encuentra dentro de filesAO y corremos el comando:

    npm install

Después nos movemos a la carpeta de frontend que se encuentra dentro de filesAO y corremos el mismo comando.

**4.- Crear la base de datos**

Este paso requiere la previa instalación de MongoDB. Para instalar MongoDB, puede consultar la documentación oficial [aquí](https://docs.mongodb.com/manual/installation/)

En un nuevo shell de mongo utilizamos el comando:
    
        use AO_DB

**5.- Cambiar contraseña de cuenta de administrador por defecto.**

Para esto nos vamos a la carpeta "backend" y abrimos el archivo "app.js" en un editor. Cerca del final del archivo, en la línea 506 se encuentra el endpoint para la inicialización del sistema. Dentro de este encontraremos en la línea 512 el valor password, que por defecto es "1337", esta será su contraseña de administrador, recomendamos cambiar el valor por defecto y poner una contraseña más segura una vez se tenga acceso al portal de administrador. Más abajo se encuentran los demás valores de la cuenta de administrador, si se desea, de igual manera se puede cambar el nombre de usuario.

**6.- Correr la aplicación**

Para correr la aplicación, nos movemos a la carpeta de backend que se encuentra dentro de filesAO y corremos el comando:

    node app.js

Después nos vamos al directorio principal y corremos el comando 

    npm start

Esto nos abrirá una ventana en el navegador con la aplicación corriendo.

**7.- Inicializar credenciales de administrador y llaves de encriptación.**

Para este paso se debe de escribir la siguiete dirección en la barra de direcciones del navegador:

    https://localhost/keySetup

Debe de aparecer un mensaje en la pantalla diciendo que el key setup ha sido exitoso.

**8.- Comentar el endpoint de inicialización del sistema.**

Para esto nos vamos a la carpeta "backend" y abrimos el archivo "app.js" en un editor. Cerca del final del archivo, en la línea 506 se encuentra el endpoint para la inicialización del sistema. Comentamos de la línea 506 a 543.

**9.- Iniciar sesión con la cuenta de administrador.**

Para iniciar sesión con la cuenta de administrador, escribimos la siguiente dirección en la barra de direcciones del navegador:

    https://localhost:3000/login

En la pantalla de login, escribimos el nombre de usuario y contraseña que se definieron en el paso 5.

Una vez dentro del portal de administrador seleccionamos la opción de crear un usuario y llenamos los campos requerios para crear el primer usuario no administrador. Este cambio se puede ver reflejado dando click en el apartado de editar usuarios. Para crear más usuarios se repite el mismo proceso.

Listo! Ahora podemos hacer uso de la aplicación.
 

## Licencia

[GNU GPLv3](Licencia.md)


## Autores

@asananez2000
@
@f-salcedo-c
@reginardzss
@sebasgonvitec

