# Memoria Técnica del Código Leer ASM Y GCC

## 1. Información General

| Campo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Nombre del programa | `leer.asm`                                                          |
| Propósito           | Solicitar un número al usuario y mostrar el valor ingresado usando `printf` y `scanf`. |
| Arquitectura        | x86 (32 bits)                                                              |
| Sistema Operativo   | Linux                                                                      |
| Funciones externas  | `printf`, `scanf` (enlazadas con `libc` mediante `gcc`)                    |
| Punto de entrada    | `main` (compatible con `gcc`)                                              |

## 2. Secciones del Código

| Sección | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `.data` | Contiene mensajes y formatos inicializados para entrada/salida.             |
| `.bss`  | Reserva espacio para el número ingresado por el usuario.                    |
| `.text` | Contiene el código ejecutable del programa.                                 |

## 3. Variables y Constantes

| Nombre  | Tipo  | Valor                    | Descripción                                      |
|---------|-------|--------------------------|--------------------------------------------------|
| `prompt`| `db`  | "Ingrese un valor: ", 0  | Mensaje para solicitar un número al usuario.     |
| `fmt_in`| `db`  | "%d", 0                  | Formato de entrada para un número entero (`scanf`). |
| `fmt_out`| `db` | "Valor ingresado: %d", 10, 0 | Formato de salida para mostrar el número (`printf`). |
| `num`   | `resd`| 1                        | Espacio para almacenar el número ingresado (4 bytes). |

## 4. Registros Utilizados

| Registro | Uso                                                                 |
|----------|---------------------------------------------------------------------|
| `eax`    | Almacena el valor de retorno del programa.                          |
| `esp`    | Puntero de pila para pasar argumentos a `printf` y `scanf`.         |

## 5. Funciones Externas (libc)

| Función | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `printf`| Imprime mensajes y valores formateados en la salida estándar.               |
| `scanf` | Lee datos ingresados por el usuario desde la entrada estándar.              |

## 6. Flujo del Programa

| Paso | Instrucción         | Descripción                                           |
|------|---------------------|-------------------------------------------------------|
| 1    | `push prompt`       | Empuja el mensaje "Ingrese un valor: " a la pila.     |
| 2    | `call printf`       | Llama a `printf` para mostrar el mensaje.             |
| 3    | `add esp, 4`        | Limpia la pila (4 bytes).                             |
| 4    | `push num`          | Empuja la dirección de `num` a la pila.               |
| 5    | `push fmt_in`       | Empuja el formato "%d" a la pila.                     |
| 6    | `call scanf`        | Llama a `scanf` para leer el número ingresado.        |
| 7    | `add esp, 8`        | Limpia la pila (8 bytes).                             |
| 8    | `push dword [num]`  | Empuja el valor de `num` a la pila.                   |
| 9    | `push fmt_out`      | Empuja el formato "Valor ingresado: %d" a la pila.    |
| 10   | `call printf`       | Llama a `printf` para mostrar el número ingresado.    |
| 11   | `add esp, 8`        | Limpia la pila (8 bytes).                             |
| 12   | `xor eax, eax`      | Establece el valor de retorno en 0 (éxito).           |
| 13   | `ret`               | Retorna al sistema (fin del programa).                |

## 7. Compilación y Ejecución

| Paso | Comando                                      | Descripción                                          |
|------|----------------------------------------------|------------------------------------------------------|
| 1    | `nasm -f elf32 leer.asm -o leer.o`           | Ensambla el código en un archivo objeto ELF (`leer.o`). |
| 2    | `gcc -m32 leer.o -o leer -no-pie`            | Enlaza el archivo objeto con `libc` para crear el ejecutable (`leer`). |
| 3    | `./leer`                                     | Ejecuta el programa.                                 |

*(Nota: Usa `-m32` para compatibilidad con 32 bits y `-no-pie` para evitar problemas con ejecutables PIE en algunos sistemas.)*

## 8. Salida
![Ejemplo de ejecución](/static/images/leer_gcc.png)
*(Nota: La salida depende del valor ingresado por el usuario. El ejemplo muestra "42" como entrada.)*

## 9. Código

```asm
; nasm -f elf32 leer.asm -o leer.o
; gcc -m32 leer.o -o leer -no-pie
; ./leer

section .data
    prompt db "Ingrese un valor: ", 0
    fmt_in db "%d", 0
    fmt_out db "Valor ingresado: %d", 10, 0

section .bss
    num resd 1  ; Espacio para almacenar el número ingresado

section .text
    global main
    extern printf, scanf

main:
    ; Mostrar mensaje de entrada
    push prompt
    call printf
    add esp, 4

    ; Leer el valor desde la consola
    push num
    push fmt_in
    call scanf
    add esp, 8

    ; Imprimir el valor ingresado
    push dword [num]
    push fmt_out
    call printf
    add esp, 8

    ; Terminar el programa
    xor eax, eax
    ret