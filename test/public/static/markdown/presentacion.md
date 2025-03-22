# NASM x86 en Ubuntu Linux

¡Bienvenido a esta introducción a NASM x86! Si estás aquí, probablemente quieras aprender a programar en ensamblador para la arquitectura x86 en Ubuntu. Vamos a explicarte qué es el ensamblador, qué es NASM y cómo configurarlo todo en tu sistema.

---

## ¿Qué es el Ensamblador (ASM)?

El ensamblador (o ASM, por *Assembly*) es un lenguaje de programación de bajo nivel que te permite hablar casi directamente con el procesador. En lugar de usar comandos abstractos como en Python o C, escribes instrucciones específicas que el CPU entiende, como mover datos entre registros o sumar números.

- **Por qué usarlo**: Es súper rápido y te da control total sobre el hardware.
- **Desafío**: Necesitas conocer la arquitectura del procesador (en este caso, x86) y su lista de instrucciones.
- **x86**: Es una familia de procesadores de Intel que incluye versiones de 16, 32 y 64 bits. Aquí nos enfocamos en 32 bits.

Piénsalo como manejar un coche de carreras manual: tienes el control, pero debes saber cómo usar la caja de cambios.

---

## ¿Qué es NASM?

NASM (*Netwide Assembler*) es una herramienta que convierte tu código ensamblador en archivos binarios que el sistema puede ejecutar. Es como un traductor entre tu texto en ASM y el lenguaje máquina que entiende el procesador.

- **Ventajas**:
  - Gratis y de código abierto.
  - Usa una sintaxis clara (estilo Intel).
  - Funciona en Linux, Windows y más.
- **Qué hace**: Toma tu archivo `.asm` y lo convierte en un archivo objeto (`.o`), que luego puedes enlazar para crear un programa ejecutable.

En este README, te guiaremos para usarlo en Ubuntu Linux con la arquitectura x86 de 32 bits.

---

## Configurando NASM en Ubuntu

Para empezar a programar con NASM en Ubuntu, necesitas instalar algunas herramientas. Aquí está lo que debes descargar y cómo hacerlo:

### Dependencias

1. **NASM**: El ensamblador principal.
   ```bash
   sudo apt update && sudo apt install nasm
   ```
2. **GCC**: Incluye el enlazador y bibliotecas para crear ejecutables.
    ```bash
    sudo apt install gcc
    ```
3. **GCC Multilib**: Soporte para 32 bits en sistemas de 64 bits (necesario para x86).
    ```bash
    sudo apt install gcc-multilib
    ```

4. **Build Essential** (opcional): Herramientas básicas de desarrollo.
    ```bash
    sudo apt install build-essential
    ```
### Verificación

Después de instalar, verifica que todo esté listo.

    nams -version

Debería mostrar algo como "NASM version 2.15.05"

  
    gcc --version   

Debería mostrar la versión de GCC instalada
    