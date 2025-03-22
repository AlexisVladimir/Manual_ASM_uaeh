# Memoria Técnica del Código Suma Y Bucle ASM

## 1. Información General

| Campo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Nombre del programa | `sumabucle.asm`                                                     |
| Propósito           | Solicitar dos números, sumarlos y mostrar "Hola" tantas veces como el resultado de la suma. |
| Arquitectura        | x86 (32 bits)                                                              |
| Sistema Operativo   | Linux                                                                      |
| Syscalls usadas     | `sys_write` (4), `sys_read` (3), `sys_exit` (1)                            |

## 2. Secciones del Código

| Sección | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `.bss`  | Reserva espacio para variables no inicializadas (buffers para números y resultado). |
| `.data` | Contiene mensajes y constantes inicializadas.                               |
| `.text` | Contiene el código ejecutable del programa.                                 |

## 3. Variables y Constantes

| Nombre       | Tipo  | Valor                   | Descripción                                      |
|--------------|-------|-------------------------|--------------------------------------------------|
| `num1`       | `resb`| 2                       | Buffer para almacenar el primer número ingresado.|
| `num2`       | `resb`| 2                       | Buffer para almacenar el segundo número ingresado.|
| `sum`        | `resb`| 5                       | Buffer para almacenar el resultado de la suma.   |
| `msg1`       | `db`  | "ingrese el primer numero: ", 0 | Mensaje para solicitar el primer número. |
| `msg2`       | `db`  | "ingrese el segundo numero: ", 0| Mensaje para solicitar el segundo número.|
| `msg3`       | `db`  | "Hola", 5               | Cadena "Hola" a imprimir en el bucle.            |
| `hello_len`  | `equ` | $ - msg3                | Longitud de la cadena `msg3` (5 bytes).          |
| `newline`    | `db`  | 10, 0                   | Salto de línea (`\n`).                           |

## 4. Registros Utilizados

| Registro | Uso                                                                 |
|----------|---------------------------------------------------------------------|
| `eax`    | Almacena el número de la syscall (`sys_write`, `sys_read`, o `sys_exit`) o resultado de la suma. |
| `ebx`    | Descriptor de archivo (`stdout` o `stdin`) o código de salida.      |
| `ecx`    | Dirección del mensaje o buffer, o contador del bucle.               |
| `edx`    | Longitud del mensaje o buffer.                                      |
| `al`     | Almacena el primer número y el resultado de la suma.                |
| `bl`     | Almacena el segundo número.                                         |

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
| 7    | `mov ecx, msg1`     | Carga la dirección del mensaje del primer número.     |
| 8    | `mov edx, 26`       | Establece la longitud del mensaje.                    |
| 9    | `int 0x80`          | Imprime "ingrese el primer numero: ".                 |
| 10   | `mov eax, 3`        | Prepara la syscall `sys_read`.                        |
| 11   | `mov ebx, 0`        | Establece el descriptor de archivo para `stdin`.      |
| 12   | `mov ecx, num1`     | Carga la dirección del buffer `num1`.                 |
| 13   | `mov edx, 10`       | Establece la longitud máxima de la entrada.           |
| 14   | `int 0x80`          | Lee el primer número ingresado por el usuario.        |
| 15   | `mov eax, 4`        | Prepara la syscall `sys_write`.                       |
| 16   | `mov ecx, newline`  | Carga la dirección del salto de línea.                |
| 17   | `int 0x80`          | Imprime un salto de línea.                            |
| 18   | `mov eax, 4`        | Prepara la syscall `sys_write`.                       |
| 19   | `mov ecx, msg2`     | Carga la dirección del mensaje del segundo número.    |
| 20   | `mov edx, 28`       | Establece la longitud del mensaje.                    |
| 21   | `int 0x80`          | Imprime "ingrese el segundo numero: ".                |
| 22   | `mov eax, 3`        | Prepara la syscall `sys_read`.                        |
| 23   | `mov ecx, num2`     | Carga la dirección del buffer `num2`.                 |
| 24   | `int 0x80`          | Lee el segundo número ingresado por el usuario.       |
| 25   | `mov al, [num1]`    | Carga el primer número en `al`.                       |
| 26   | `sub al, '0'`       | Convierte de ASCII a valor numérico.                  |
| 27   | `mov bl, [num2]`    | Carga el segundo número en `bl`.                      |
| 28   | `sub bl, '0'`       | Convierte de ASCII a valor numérico.                  |
| 29   | `add al, bl`        | Suma los dos números.                                 |
| 30   | `add al, '0'`       | Convierte el resultado a ASCII.                       |
| 31   | `mov [sum], al`     | Almacena el resultado en `sum`.                       |
| 32   | `sub al, '0'`       | Convierte el resultado de vuelta a valor numérico para usarlo como contador. |
| 33   | `mov ecx, sum`      | Carga el valor de `sum` en `ecx` como contador ( Nota: Esto debería ser `movzx ecx, byte [sum]` para evitar problemas). |
| 34   | `.loop:`            | Inicio del bucle.                                     |
| 35   | `push ecx`          | Guarda el valor de `ecx` en la pila.                  |
| 36   | `mov edx, hello_len`| Carga la longitud del mensaje "Hola" en `edx`.        |
| 37   | `mov ecx, msg3`     | Carga la dirección del mensaje "Hola" en `ecx`.       |
| 38   | `mov ebx, 1`        | Establece el descriptor de archivo para `stdout`.     |
| 39   | `mov eax, 4`        | Prepara la syscall `sys_write`.                       |
| 40   | `int 0x80`          | Imprime "Hola".                                       |
| 41   | `pop ecx`           | Restaura el valor de `ecx` desde la pila.             |
| 42   | `loop .loop`        | Decrementa `ecx` y salta a `.loop` si no es 0.        |
| 43   | `mov eax, 1`        | Prepara la syscall `sys_exit`.                        |
| 44   | `xor ebx, ebx`      | Establece el código de salida en 0 (éxito).           |
| 45   | `int 0x80`          | Finaliza el programa.                                 |

## 7. Compilación y Ejecución

| Paso | Comando                                      | Descripción                                          |
|------|----------------------------------------------|------------------------------------------------------|
| 1    | `nasm -f elf32 sumabucle.asm -o sumabucle.o` | Ensambla el código en un archivo objeto (`sumabucle.o`). |
| 2    | `ld -m elf_i386 sumabucle.o -o sumabucle`    | Enlaza el archivo objeto para crear el ejecutable (`sumabucle`). |
| 3    | `./sumabucle`                                | Ejecuta el programa.                                 |

## 8. Salida

![Ejemplo de ejecución](/static/images/sumabucle.png)

## 9. Código

```asm
; nasm -f elf32 sumabucle.asm -o sumabucle.o
; ld -m elf_i386 sumabucle.o -o sumabucle
; ./sumabucle

section .bss
    num1 resb 2 ; buffer para almacenar el primer número ingresado
    num2 resb 2 ; buffer para almacenar el segundo número ingresado
    sum resb 5  ; buffer para almacenar el resultado

section .data
    msg1 db "Ingrese el primer numero: ", 0
    msg2 db "Ingrese el segundo numero: ", 0
    msg3 db "Hola", 0
    hello_len equ $ - msg3 ; longitud del mensaje "Hola"
    newline db 10, 0 ; salto de línea

section .text
    global _start

_start:
    ; Mostrar mensaje para ingresar el primer número
    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, msg1 ; dirección del mensaje
    mov edx, 26 ; longitud del mensaje
    int 0x80    ; llamado del sistema

    ; Leer el primer número desde la entrada estándar
    mov eax, 3  ; syscall read
    mov ebx, 0  ; stdin
    mov ecx, num1 ; dirección donde se guarda el número
    mov edx, 2  ; longitud máxima
    int 0x80    ; llamado del sistema

    ; Imprimir salto de línea
    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, newline ; salto de línea
    mov edx, 1  ; longitud del mensaje
    int 0x80    ; llamado del sistema

    ; Mostrar mensaje para ingresar el segundo número
    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, msg2 ; dirección del mensaje
    mov edx, 28 ; longitud del mensaje
    int 0x80    ; llamado del sistema

    ; Leer el segundo número desde la entrada estándar
    mov eax, 3  ; syscall read
    mov ebx, 0  ; stdin
    mov ecx, num2 ; dirección donde se guarda el número
    mov edx, 2  ; longitud máxima
    int 0x80    ; llamado del sistema

    ; Convertir ASCII a números
    mov al, [num1]
    sub al, '0' ; convierte de ASCII a valor numérico
    mov bl, [num2]
    sub bl, '0' ; convierte de ASCII a valor numérico

    ; Sumar los números
    add al, bl
    add al, '0' ; convertir resultado a ASCII
    mov [sum], al

    ; Convertir el resultado de ASCII a número para usarlo como contador
    sub al, '0'
    mov ecx, eax ; usamos ecx como contador

    ; Bucle para imprimir "Hola" varias veces
    .loop:
        push ecx ; guardamos el valor del contador

        ; Imprimir "Hola"
        mov eax, 4 ; syscall write
        mov ebx, 1 ; stdout
        mov ecx, msg3 ; dirección del mensaje
        mov edx, hello_len ; longitud del mensaje
        int 0x80 ; llamado del sistema

        ; Imprimir salto de línea
        mov eax, 4 ; syscall write
        mov ebx, 1 ; stdout
        mov ecx, newline ; salto de línea
        mov edx, 1 ; longitud del mensaje
        int 0x80 ; llamado del sistema

        pop ecx ; restauramos el contador
        loop .loop ; decrementa ecx y salta si no es 0

    ; Salir del programa
    mov eax, 1 ; syscall exit
    xor ebx, ebx ; código de salida 0
    int 0x80    