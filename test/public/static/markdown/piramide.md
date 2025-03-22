# Memoria Técnica del Código Piramide ASM Y GCC

## 1. Información General

| Campo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Nombre del programa | `piramide.asm`                                                      |
| Propósito           | Solicitar un número de filas y dibujar una pirámide de asteriscos usando `printf` y `scanf`. |
| Arquitectura        | x86 (32 bits)                                                              |
| Sistema Operativo   | Linux                                                                      |
| Funciones externas  | `printf`, `scanf` (enlazadas con `libc` mediante `gcc`)                    |
| Punto de entrada    | `main` (compatible con `gcc`)                                              |

## 2. Secciones del Código

| Sección | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `.data` | Contiene mensajes y caracteres inicializados para entrada/salida.           |
| `.bss`  | Reserva espacio para el número de filas ingresado por el usuario.           |
| `.text` | Contiene el código ejecutable del programa.                                 |

## 3. Variables y Constantes

| Nombre    | Tipo  | Valor                        | Descripción                                      |
|-----------|-------|------------------------------|--------------------------------------------------|
| `prompt`  | `db`  | "Ingrese el numero de filas: ", 0 | Mensaje para solicitar el número de filas. |
| `fmt_in`  | `db`  | "%d", 0                      | Formato de entrada para un número entero (`scanf`). |
| `fmt_out` | `db`  | "%c", 0                      | Formato de salida para un carácter (`printf`).   |
| `newline` | `db`  | 10, 0                        | Salto de línea (`\n`).                           |
| `space`   | `db`  | " ", 0                       | Espacio en blanco para alinear la pirámide.      |
| `asterisk`| `db`  | " * ", 0                     | Cadena de asterisco con espacios para la pirámide. |
| `filas`   | `resd`| 1                            | Espacio para almacenar el número de filas (4 bytes). |

## 4. Registros Utilizados

| Registro | Uso                                                                 |
|----------|---------------------------------------------------------------------|
| `eax`    | Almacena el número de filas temporalmente y el valor de retorno.    |
| `ebx`    | Contador para los espacios y asteriscos en cada fila.               |
| `ecx`    | Contador principal para el número de filas.                         |
| `edi`    | Contador para la cantidad de asteriscos por fila.                   |
| `esp`    | Puntero de pila para pasar argumentos a `printf` y `scanf`.         |

## 5. Funciones Externas (libc)

| Función | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `printf`| Imprime mensajes, espacios, asteriscos y saltos de línea en la salida estándar. |
| `scanf` | Lee el número de filas ingresado por el usuario desde la entrada estándar.  |

## 6. Flujo del Programa

| Paso | Instrucción             | Descripción                                           |
|------|-------------------------|-------------------------------------------------------|
| 1    | `push prompt`           | Empuja el mensaje "Ingrese el numero de filas: " a la pila. |
| 2    | `call printf`           | Llama a `printf` para mostrar el mensaje.             |
| 3    | `add esp, 4`            | Limpia la pila (4 bytes).                             |
| 4    | `push filas`            | Empuja la dirección de `filas` a la pila.             |
| 5    | `push fmt_in`           | Empuja el formato "%d" a la pila.                     |
| 6    | `call scanf`            | Llama a `scanf` para leer el número de filas.         |
| 7    | `add esp, 8`            | Limpia la pila (8 bytes).                             |
| 8    | `mov ecx, [filas]`      | Carga el número de filas en `ecx` como contador principal. |
| 9    | `mov edi, 1`            | Inicializa `edi` en 1 (número inicial de asteriscos por fila). |
| 10   | `fila_loop:`            | Etiqueta de inicio del bucle de filas.                |
| 11   | `push ecx`              | Guarda `ecx` (contador de filas) en la pila.          |
| 12   | `mov eax, [filas]`      | Carga el número total de filas en `eax`.              |
| 13   | `sub eax, edi`          | Calcula los espacios necesarios antes de los asteriscos (`filas - edi`). |
| 14   | `mov ebx, eax`          | Copia la cantidad de espacios a `ebx` como contador.  |
| 15   | `espacio_loop:`         | Etiqueta de inicio del bucle de espacios.             |
| 16   | `cmp ebx, 0`            | Compara si quedan espacios por imprimir.              |
| 17   | `je imprimir_asteriscos`| Salta a imprimir asteriscos si no hay más espacios.   |
| 18   | `push space`            | Empuja el carácter de espacio a la pila.              |
| 19   | `call printf`           | Llama a `printf` para imprimir un espacio.            |
| 20   | `add esp, 4`            | Limpia la pila (4 bytes).                             |
| 21   | `dec ebx`               | Decrementa el contador de espacios.                   |
| 22   | `jmp espacio_loop`      | Repite el bucle de espacios.                          |
| 23   | `imprimir_asteriscos:`  | Etiqueta para imprimir asteriscos.                    |
| 24   | `mov ebx, edi`          | Copia la cantidad de asteriscos (`edi`) a `ebx`.      |
| 25   | `asterisco_loop:`       | Etiqueta de inicio del bucle de asteriscos.           |
| 26   | `cmp ebx, 0`            | Compara si quedan asteriscos por imprimir.            |
| 27   | `je nueva_linea`        | Salta a nueva línea si no hay más asteriscos.         |
| 28   | `push asterisk`         | Empuja la cadena " * " a la pila.                     |
| 29   | `call printf`           | Llama a `printf` para imprimir un asterisco con espacios. |
| 30   | `add esp, 4`            | Limpia la pila (4 bytes).                             |
| 31   | `dec ebx`               | Decrementa el contador de asteriscos.                 |
| 32   | `jmp asterisco_loop`    | Repite el bucle de asteriscos.                        |
| 33   | `nueva_linea:`          | Etiqueta para imprimir un salto de línea.             |
| 34   | `push newline`          | Empuja el salto de línea a la pila.                   |
| 35   | `call printf`           | Llama a `printf` para imprimir un salto de línea.     |
| 36   | `add esp, 4`            | Limpia la pila (4 bytes).                             |
| 37   | `pop ecx`               | Restaura `ecx` (contador de filas) desde la pila.     |
| 38   | `inc edi`               | Incrementa `edi` (más asteriscos en la siguiente fila). |
| 39   | `loop fila_loop`        | Decrementa `ecx` y repite el bucle si no es 0.        |
| 40   | `xor eax, eax`          | Establece el valor de retorno en 0 (éxito).           |
| 41   | `ret`                   | Retorna al sistema (fin del programa).                |

## 7. Compilación y Ejecución

| Paso | Comando                                      | Descripción                                          |
|------|----------------------------------------------|------------------------------------------------------|
| 1    | `nasm -f elf32 piramide.asm -o piramide.o`   | Ensambla el código en un archivo objeto ELF (`piramide.o`). |
| 2    | `gcc -m32 piramide.o -o piramide -no-pie`    | Enlaza el archivo objeto con `libc` para crear el ejecutable (`piramide`). |
| 3    | `./piramide`                                 | Ejecuta el programa.                                 |

*(Nota: Usa `-m32` para compatibilidad con 32 bits y `-no-pie` para evitar problemas con ejecutables PIE en algunos sistemas.)*

## 8. Salida

*(Nota: La salida muestra una pirámide centrada con el número de filas ingresado. El ejemplo usa 4 filas.)*

## 9. Código

```asm
; nasm -f elf32 piramide.asm -o piramide.o
; gcc -m32 piramide.o -o piramide -no-pie
; ./piramide

section .data
    prompt db "Ingrese el numero de filas: ", 0
    fmt_in db "%d", 0
    fmt_out db "%c", 0
    newline db 10, 0
    space db " ", 0
    asterisk db " * ", 0

section .bss
    filas resd 1

section .text
    global main
    extern printf, scanf

main:
    ; Pedir el número de filas
    push prompt
    call printf
    add esp, 4

    push filas
    push fmt_in
    call scanf
    add esp, 8

    ; Cargar el número de filas en ECX
    mov ecx, [filas]
    mov edi, 1   ; Controla la cantidad de asteriscos por fila

fila_loop:
    push ecx  ; Guardar ECX en la pila

    ; Imprimir espacios antes de los asteriscos
    mov eax, [filas]
    sub eax, edi  ; Calcular los espacios a imprimir
    mov ebx, eax

espacio_loop:
    cmp ebx, 0
    je imprimir_asteriscos
    push space
    call printf
    add esp, 4
    dec ebx
    jmp espacio_loop

imprimir_asteriscos:
    mov ebx, edi  ; EBX controla la cantidad de asteriscos en la fila

asterisco_loop:
    cmp ebx, 0
    je nueva_linea
    push asterisk
    call printf
    add esp, 4
    dec ebx
    jmp asterisco_loop

nueva_linea:
    push newline
    call printf
    add esp, 4

    pop ecx   ; Restaurar ECX
    inc edi   ; Aumentar la cantidad de asteriscos en la siguiente fila
    loop fila_loop  ; Repetir hasta completar todas las filas