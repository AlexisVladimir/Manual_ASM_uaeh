# Memoria Técnica del Código Leer ASM

## 1. Información General

| Campo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Nombre del programa | `leer.asm`                                                                  |
| Propósito           | Solicitar un dígito al usuario, almacenarlo en un buffer y mostrarlo en la consola. |
| Arquitectura        | x86 (32 bits)                                                              |
| Sistema Operativo   | Linux                                                                      |
| Syscalls usadas     | `sys_write` (4), `sys_read` (3), `sys_exit` (1)                            |

## 2. Secciones del Código

| Sección | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `.bss`  | Reserva espacio para variables no inicializadas (buffer para el dígito).   |
| `.data` | Contiene mensajes y constantes inicializadas.                               |
| `.text` | Contiene el código ejecutable del programa.                                 |

## 3. Variables y Constantes

| Nombre       | Tipo  | Valor                   | Descripción                                      |
|--------------|-------|-------------------------|--------------------------------------------------|
| `buffer`     | `resb`| 10                      | Buffer para almacenar el dígito ingresado.       |
| `msg`        | `db`  | "ingrese el dijito: ", 0| Mensaje para solicitar la entrada del usuario.   |
| `msg_result` | `db`  | "Numero ingresado: ", 0 | Mensaje para mostrar el resultado.               |
| `newline`    | `db`  | 10, 0                   | Salto de línea (`\n`).                           |

## 4. Registros Utilizados

| Registro | Uso                                                         |
|----------|-------------------------------------------------------------|
| `eax`    | Almacena el número de la syscall (`sys_write`, `sys_read`, o `sys_exit`). |
| `ebx`    | Descriptor de archivo (`stdout` o `stdin`) o código de salida. |
| `ecx`    | Dirección del mensaje o buffer de entrada/salida.           |
| `edx`    | Longitud del mensaje o buffer.                              |

## 5. Syscalls Utilizadas

| Syscall    | Número | Parámetros                                                                 | Descripción                              |
|------------|--------|---------------------------------------------------------------------------|------------------------------------------|
| `sys_write`| 4      | `ebx = 1` (`stdout`), `ecx` = dirección del mensaje, `edx` = longitud del mensaje | Escribe datos en la salida estándar.     |
| `sys_read` | 3      | `ebx = 0` (`stdin`), `ecx` = dirección del buffer, `edx` = longitud máxima | Lee datos desde la entrada estándar.     |
| `sys_exit` | 1      | `ebx` = código de salida                                                  | Termina la ejecución del programa.       |

## 6. Flujo del Programa

| Paso | Instrucción         | Descripción                                           |
|------|---------------------|-------------------------------------------------------|
| 1    | `mov eax, 4`        | Prepara la syscall `sys_write`.                       |
| 2    | `mov ebx, 1`        | Establece el descriptor de archivo para `stdout`.     |
| 3    | `mov ecx, newline`  | Carga la dirección del salto de línea.                |
| 4    | `mov edx, 1`        | Establece la longitud del salto de línea.             |
| 5    | `int 0x80`          | Imprime un salto de línea.                            |
| 6    | `mov eax, 4`        | Prepara la syscall `sys_write`.                       |
| 7    | `mov ecx, msg`      | Carga la dirección del mensaje de solicitud.          |
| 8    | `mov edx, 18`       | Establece la longitud del mensaje (18 bytes).         |
| 9    | `int 0x80`          | Imprime "ingrese el dijito: ".                        |
| 10   | `mov eax, 3`        | Prepara la syscall `sys_read`.                        |
| 11   | `mov ebx, 0`        | Establece el descriptor de archivo para `stdin`.      |
| 12   | `mov ecx, buffer`   | Carga la dirección del buffer para el dígito.         |
| 13   | `mov edx, 10`       | Establece la longitud máxima de la entrada.           |
| 14   | `int 0x80`          | Lee el dígito ingresado por el usuario.               |
| 15   | `mov eax, 4`        | Prepara la syscall `sys_write`.                       |
| 16   | `mov ecx, newline`  | Carga la dirección del salto de línea.                |
| 17   | `mov edx, 1`        | Establece la longitud del salto de línea.             |
| 18   | `int 0x80`          | Imprime un salto de línea.                            |
| 19   | `mov eax, 4`        | Prepara la syscall `sys_write`.                       |
| 20   | `mov ecx, msg_result` | Carga la dirección del mensaje de resultado.        |
| 21   | `mov edx, 18`       | Establece la longitud del mensaje (18 bytes).         |
| 22   | `int 0x80`          | Imprime "Numero ingresado: ".                         |
| 23   | `mov eax, 4`        | Prepara la syscall `sys_write`.                       |
| 24   | `mov ecx, buffer`   | Carga la dirección del buffer con el dígito.          |
| 25   | `mov edx, 10`       | Establece la longitud del buffer a mostrar.           |
| 26   | `int 0x80`          | Imprime el dígito ingresado.                          |
| 27   | `mov eax, 4`        | Prepara la syscall `sys_write`.                       |
| 28   | `mov ecx, newline`  | Carga la dirección del salto de línea.                |
| 29   | `mov edx, 1`        | Establece la longitud del salto de línea.             |
| 30   | `int 0x80`          | Imprime un salto de línea.                            |
| 31   | `mov eax, 1`        | Prepara la syscall `sys_exit`.                        |
| 32   | `mov ebx, ebx`      | Establece el código de salida (0, aunque debería ser `xor ebx, ebx`). |
| 33   | `int 0x80`          | Finaliza el programa.                                 |

## 7. Compilación y Ejecución

| Paso | Comando                              | Descripción                                          |
|------|--------------------------------------|------------------------------------------------------|
| 1    | `nasm -f elf32 leer.asm -o leer.o`   | Ensambla el código en un archivo objeto (`leer.o`).  |
| 2    | `ld -m elf_i386 leer.o -o leer`      | Enlaza el archivo objeto para crear el ejecutable (`leer`). |
| 3    | `./leer`                             | Ejecuta el programa.                                 |

## 8. Salida

![Ejemplo de ejecución](/static/images/leer.png)

## 9. Código

```asm
; nasm -f elf32 leer.asm -o leer.o 
; ld -m elf_i386 leer.o -o leer 
; ./leer

section .bss
    buffer resb 10 ; buffer para almacenar el numero ingresado 

section .data 
    msg db "ingrese el dijito: ", 0 
    msg_result db "Numero ingresado: ", 0 
    newline db 10, 0 ; salto de linea

section .text
    global _start 

_start:  
    ; imprimir salto de linea 
    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, newline ; direccion del mensaje 
    mov edx, 1 ; longitud del mensaje 
    int 0x80
    
    ; mostrar mensaje 
    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, msg ; direccion del mensaje 
    mov edx, 18 ; longitud del mensaje 
    int 0x80 ; llamado del sistema
  
    ; leer numero desde la entrada estandar 
    mov eax, 3  ; syscall read
    mov ebx, 0  ; stdin 
    mov ecx, buffer ; direccion donde se guarda el numero 
    mov edx, 10 ; longitud maxima 
    int 0x80 ; llamado del sistema 

    ; imprimir salto de linea 
    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, newline ; direccion del mensaje 
    mov edx, 1 ; longitud del mensaje 
    int 0x80

    ; mostrar mensaje del resultado 
    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, msg_result ; direccion del mensaje 
    mov edx, 18 ; longitud del mensaje 
    int 0x80

    ; mostrar numero ingresado 
    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, buffer ; direccion del mensaje 
    mov edx, 10 ; longitud del mensaje 
    int 0x80

    ; imprimir salto de linea 
    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, newline ; direccion del mensaje 
    mov edx, 1 ; longitud del mensaje 
    int 0x80

    ; salir del programa 
    mov eax, 1 ; syscall exit 
    mov ebx, ebx ; codigo de salida 0 (debería ser xor ebx, ebx)
    int 0x80