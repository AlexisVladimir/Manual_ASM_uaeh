# Memoria Técnica del Código Sumar ASM

## 1. Información General

| Campo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Nombre del programa | `sumar.asm`                                                                 |
| Propósito           | Solicitar dos números al usuario, sumarlos y mostrar el resultado.          |
| Arquitectura        | x86 (32 bits)                                                              |
| Sistema Operativo   | Linux                                                                      |
| Syscalls usadas     | `sys_write` (4), `sys_read` (3), `sys_exit` (1)                            |

## 2. Secciones del Código

| Sección | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `.bss`  | Reserva espacio para variables no inicializadas (buffers para números y suma). |
| `.data` | Contiene mensajes y constantes inicializadas.                               |
| `.text` | Contiene el código ejecutable del programa.                                 |

## 3. Variables y Buffers

| Nombre   | Tipo  | Tamaño | Descripción                                      |
|----------|-------|--------|--------------------------------------------------|
| `num1`   | `resb`| 2      | Buffer para almacenar el primer número ingresado. |
| `num2`   | `resb`| 2      | Buffer para almacenar el segundo número ingresado.|
| `sum`    | `resb`| 5      | Buffer para almacenar el resultado de la suma.    |
| `msg1`   | `db`  | 26     | Mensaje: `"ingrese el primer numero: "`.         |
| `msg2`   | `db`  | 28     | Mensaje: `"ingrese el segundo numero: "`.        |
| `msg3`   | `db`  | 12     | Mensaje: `"la suma es: "`.                       |
| `newline`| `db`  | 2      | Salto de línea (`\n`).                           |

## 4. Registros Utilizados

| Registro | Uso                                                                 |
|----------|---------------------------------------------------------------------|
| `eax`    | Almacena el número de la syscall (`sys_write`, `sys_read` o `sys_exit`). |
| `ebx`    | Descriptor de archivo (`stdout`, `stdin`) o código de salida.       |
| `ecx`    | Dirección del mensaje o buffer de entrada/salida.                   |
| `edx`    | Longitud del mensaje o buffer.                                      |
| `al`, `bl` | Almacenan los valores numéricos convertidos de ASCII.              |

## 5. Syscalls Utilizadas

| Syscall    | Número | Parámetros                                                                 | Descripción                              |
|------------|--------|---------------------------------------------------------------------------|------------------------------------------|
| `sys_write`| 4      | `ebx = 1` (`stdout`), `ecx` = dirección del mensaje, `edx` = longitud del mensaje | Escribe datos en la salida estándar.     |
| `sys_read` | 3      | `ebx = 0` (`stdin`), `ecx` = dirección del buffer, `edx` = longitud máxima | Lee datos desde la entrada estándar.     |
| `sys_exit` | 1      | `ebx` = código de salida                                                  | Termina la ejecución del programa.       |

## 6. Flujo del Programa

| Paso | Instrucción               | Descripción                                                                 |
|------|---------------------------|-----------------------------------------------------------------------------|
| 1    | `mov eax, 4`              | Prepara la syscall `sys_write`.                                             |
| 2    | `mov ebx, 1`              | Establece el descriptor de archivo para `stdout`.                           |
| 3    | `mov ecx, newline`        | Carga la dirección del salto de línea.                                      |
| 4    | `mov edx, 1`              | Establece la longitud del salto de línea.                                   |
| 5    | `int 0x80`                | Imprime un salto de línea.                                                  |
| 6    | `mov eax, 4`              | Prepara la syscall `sys_write`.                                             |
| 7    | `mov ecx, msg1`           | Carga la dirección del mensaje `"ingrese el primer numero: "`.              |
| 8    | `mov edx, 26`             | Establece la longitud del mensaje.                                          |
| 9    | `int 0x80`                | Imprime el mensaje.                                                         |
| 10   | `mov eax, 3`              | Prepara la syscall `sys_read`.                                              |
| 11   | `mov ebx, 0`              | Establece el descriptor de archivo para `stdin`.                            |
| 12   | `mov ecx, num1`           | Carga la dirección del buffer `num1`.                                       |
| 13   | `mov edx, 10`             | Establece la longitud máxima de la entrada.                                 |
| 14   | `int 0x80`                | Lee el primer número ingresado por el usuario.                              |
| 15   | `mov eax, 4`              | Prepara la syscall `sys_write`.                                             |
| 16   | `mov ecx, newline`        | Carga la dirección del salto de línea.                                      |
| 17   | `mov edx, 1`              | Establece la longitud del salto de línea.                                   |
| 18   | `int 0x80`                | Imprime un salto de línea.                                                  |
| 19   | `mov eax, 4`              | Prepara la syscall `sys_write`.                                             |
| 20   | `mov ecx, msg2`           | Carga la dirección del mensaje `"ingrese el segundo numero: "`.             |
| 21   | `mov edx, 28`             | Establece la longitud del mensaje.                                          |
| 22   | `int 0x80`                | Imprime el mensaje.                                                         |
| 23   | `mov eax, 3`              | Prepara la syscall `sys_read`.                                              |
| 24   | `mov ebx, 0`              | Establece el descriptor de archivo para `stdin`.                            |
| 25   | `mov ecx, num2`           | Carga la dirección del buffer `num2`.                                       |
| 26   | `mov edx, 10`             | Establece la longitud máxima de la entrada.                                 |
| 27   | `int 0x80`                | Lee el segundo número ingresado por el usuario.                             |
| 28   | `mov al, [num1]`          | Carga el primer número (en ASCII) en `al`.                                  |
| 29   | `sub al, '0'`             | Convierte el carácter ASCII a valor numérico.                               |
| 30   | `mov bl, [num2]`          | Carga el segundo número (en ASCII) en `bl`.                                 |
| 31   | `sub bl, '0'`             | Convierte el carácter ASCII a valor numérico.                               |
| 32   | `add al, bl`              | Suma los dos números.                                                       |
| 33   | `add al, '0'`             | Convierte el resultado a ASCII.                                             |
| 34   | `mov [sum], al`           | Almacena el resultado en `sum`.                                             |
| 35   | `mov eax, 4`              | Prepara la syscall `sys_write`.                                             |
| 36   | `mov ecx, msg3`           | Carga la dirección del mensaje `"la suma es: "`.                            |
| 37   | `mov edx, 12`             | Establece la longitud del mensaje.                                          |
| 38   | `int 0x80`                | Imprime el mensaje.                                                         |
| 39   | `mov eax, 4`              | Prepara la syscall `sys_write`.                                             |
| 40   | `mov ecx, sum`            | Carga la dirección del resultado.                                           |
| 41   | `mov edx, 10`             | Establece la longitud del resultado.                                        |
| 42   | `int 0x80`                | Imprime el resultado.                                                       |
| 43   | `mov eax, 4`              | Prepara la syscall `sys_write`.                                             |
| 44   | `mov ecx, newline`        | Carga la dirección del salto de línea.                                      |
| 45   | `mov edx, 1`              | Establece la longitud del salto de línea.                                   |
| 46   | `int 0x80`                | Imprime un salto de línea.                                                  |
| 47   | `mov eax, 1`              | Prepara la syscall `sys_exit`.                                              |
| 48   | `mov ebx, 0`              | Establece el código de salida en 0 (éxito).                                 |
| 49   | `int 0x80`                | Finaliza el programa.                                                       |

## 7. Compilación y Ejecución

| Paso | Comando                                | Descripción                                                                 |
|------|----------------------------------------|-----------------------------------------------------------------------------|
| 1    | `nasm -f elf32 sumar.asm -o sumar.o`   | Ensambla el código en un archivo objeto (`sumar.o`).                        |
| 2    | `ld -m elf_i386 sumar.o -o sumar`      | Enlaza el archivo objeto para crear el ejecutable (`sumar`).                |
| 3    | `./sumar`                              | Ejecuta el programa.                                                        |

## 8. Ejemplo de Ejecución

![Ejemplo de ejecución](/static/images/Sumar.png)

## 9. Código

```asm
; nasm -f elf32 sumar.asm -o sumar.o 
; ld -m elf_i386 sumar.o -o sumar 
; ./sumar

section .bss
    ; resb reserva espacio en unidades byte
    num1 resb 2 ; buffer para almacenar el numero ingresado 
    num2 resb 2
    sum resb 5

section .data 
    msg1 db "ingrese el primer numero: ", 0 
    msg2 db "ingrese el segundo numero: ", 0 
    msg3 db "la suma es: ", 0 
    newline db 10, 0 ; salto de linea

section .text
    global _start 

_start: 
    ; imprimir salto de linea 
    mov eax, 4 ; syscall write
    mov ebx, 1 ; stdout
    mov ecx, newline ; direccion del mensaje 
    mov edx, 1 ; longitud del mensaje 
    int 0x80

    ; mostrar mensaje 
    mov eax, 4 ; syscall write
    mov ebx, 1 ; stdout
    mov ecx, msg1 ; direccion del mensaje 
    mov edx, 26 ; longitud del mensaje 
    int 0x80 ; llamado del sistema

    ; leer numero desde la entrada estandar 
    mov eax, 3 ; syscall read
    mov ebx, 0 ; stdin 
    mov ecx, num1 ; direccion donde se guarda el numero 
    mov edx, 10 ; longitud maxima 
    int 0x80 ; llamado del sistema 

    ; imprimir salto de linea 
    mov eax, 4 ; syscall write
    mov ebx, 1 ; stdout
    mov ecx, newline ; direccion del mensaje 
    mov edx, 1 ; longitud del mensaje 
    int 0x80

    ; mostrar mensaje del resultado 
    mov eax, 4 ; syscall write
    mov ebx, 1 ; stdout
    mov ecx, msg2 ; direccion del mensaje 
    mov edx, 28 ; longitud del mensaje 
    int 0x80

    ; leer numero desde la entrada estandar 
    mov eax, 3 ; syscall read
    mov ebx, 0 ; stdin 
    mov ecx, num2 ; direccion donde se guarda el numero 
    mov edx, 10 ; longitud maxima 
    int 0x80 ; llamado del sistema 

    ; convertir ASCII a numeros
    mov al, [num1]
    sub al, '0' ; convierte de ASCII a valor numerico 
    mov bl, [num2]
    sub bl, '0' ; convierte de ASCII a valor numerico 

    ; sumar los numeros
    add al, bl 
    add al, '0' ; convertir resultado a ASCII
    mov [sum], al

    ; mostrar mensaje del resultado 
    mov eax, 4 ; syscall write
    mov ebx, 1 ; stdout
    mov ecx, msg3 ; direccion del mensaje 
    mov edx, 12 ; longitud del mensaje 
    int 0x80

    ; mostrar numero ingresado 
    mov eax, 4 ; syscall write
    mov ebx, 1 ; stdout
    mov ecx, sum ; direccion del mensaje 
    mov edx, 10 ; longitud del mensaje 
    int 0x80

    ; imprimir salto de linea 
    mov eax, 4 ; syscall write
    mov ebx, 1 ; stdout
    mov ecx, newline ; direccion del mensaje 
    mov edx, 1 ; longitud del mensaje 
    int 0x80

    ; salir del programa 
    mov eax, 1 ; syscall exit 
    mov ebx, 0 ; codigo de salida 0 
    int 0x80