# Memoria Técnica del Código Hola Mundo ASM

## 1. Información General

| Campo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Nombre del programa | `hola.asm`                                                                  |
| Propósito           | Imprimir el mensaje "Hola mundo" con un salto de línea en la consola y finalizar. |
| Arquitectura        | x86 (32 bits)                                                              |
| Sistema Operativo   | Linux                                                                      |
| Syscalls usadas     | `sys_write` (4), `sys_exit` (1)                                            |

## 2. Secciones del Código

| Sección | Descripción                                 |
|---------|---------------------------------------------|
| `.data` | Contiene las variables y constantes inicializadas. |
| `.text` | Contiene el código ejecutable del programa. |

## 3. Variables y Constantes

| Nombre    | Tipo  | Valor             | Descripción                                      |
|-----------|-------|-------------------|--------------------------------------------------|
| `mensaje` | `db`  | "Hola mundo", 0xA | Cadena de caracteres a imprimir, con salto de línea. |
| `len`     | `equ` | $ - mensaje       | Longitud de la cadena `mensaje`, calculada en bytes. |

## 4. Registros Utilizados

| Registro | Uso                                                         |
|----------|-------------------------------------------------------------|
| `eax`    | Almacena el número de la syscall (`sys_write` o `sys_exit`).|
| `ebx`    | Descriptor de archivo (`stdout`) o código de salida.        |
| `ecx`    | Dirección del mensaje a imprimir.                           |
| `edx`    | Longitud del mensaje a imprimir.                            |

## 5. Syscalls Utilizadas

| Syscall    | Número | Parámetros                                              | Descripción                              |
|------------|--------|--------------------------------------------------------|------------------------------------------|
| `sys_write`| 4      | `ebx = 1` (`stdout`), `ecx` = dirección del mensaje, `edx` = longitud del mensaje | Escribe datos en la salida estándar.     |
| `sys_exit` | 1      | `ebx` = código de salida                               | Termina la ejecución del programa.       |

## 6. Flujo del Programa

| Paso | Instrucción     | Descripción                                           |
|------|-----------------|-------------------------------------------------------|
| 1    | `mov eax, 4`    | Prepara la syscall `sys_write`.                       |
| 2    | `mov ebx, 1`    | Establece el descriptor de archivo para `stdout`.     |
| 3    | `mov ecx, mensaje` | Carga la dirección del mensaje en `ecx`.           |
| 4    | `mov edx, len`  | Carga la longitud del mensaje en `edx`.               |
| 5    | `int 0x80`      | Invoca la syscall para imprimir el mensaje.           |
| 6    | `mov eax, 1`    | Prepara la syscall `sys_exit`.                        |
| 7    | `xor ebx, ebx`  | Establece el código de salida en 0 (éxito).           |
| 8    | `int 0x80`      | Invoca la syscall para finalizar el programa.         |

## 7. Compilación y Ejecución

| Paso | Comando                              | Descripción                                          |
|------|--------------------------------------|------------------------------------------------------|
| 1    | `nasm -f elf32 hola.asm -o hola.o`   | Ensambla el código en un archivo objeto (`hola.o`).  |
| 2    | `ld -m elf_i386 -s -o hola hola.o`   | Enlaza el archivo objeto para crear el ejecutable (`hola`). |
| 3    | `./hola`                             | Ejecuta el programa.                                 |

## 8. Salida
![Ejemplo de ejecución](/static/images/Hola.png)

## 9. Código

```asm
; nasm -f elf32 hola.asm -o hola.o
; ld -m elf_i386 -s -o hola hola.o
; ./hola

section .data
    mensaje db "Hola mundo", 0xA ; mensaje con salto de línea
    len equ $ - mensaje ; longitud del mensaje

section .text
    global _start

_start:
    ; Llamada al sistema write
    mov eax, 4 ; syscall número 4 -> sys_write
    mov ebx, 1 ; file descriptor 1 -> stdout
    mov ecx, mensaje ; dirección del mensaje
    mov edx, len ; longitud del mensaje
    int 0x80 ; llamada a la interrupción del kernel

    ; Llamada al sistema exit
    mov eax, 1 ; syscall número 1 -> sys_exit
    xor ebx, ebx ; código de salida 0 (éxito)
    int 0x80 ; llamada a la interrupción del kernel