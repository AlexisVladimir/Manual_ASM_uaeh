# Memoria Técnica del Código Suma ASM Y GCC

## 1. Información General

| Campo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Nombre del programa | `suma.asm`                                                          |
| Propósito           | Sumar dos números predefinidos y mostrar el resultado usando `printf`.      |
| Arquitectura        | x86 (32 bits)                                                              |
| Sistema Operativo   | Linux                                                                      |
| Funciones externas  | `printf` (enlazada con `libc` mediante `gcc`)                              |
| Punto de entrada    | `main` (compatible con `gcc`)                                              |

## 2. Secciones del Código

| Sección | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `.data` | Contiene los números a sumar y el formato de salida inicializados.          |
| `.bss`  | Reserva espacio para el resultado de la suma.                               |
| `.text` | Contiene el código ejecutable del programa.                                 |

## 3. Variables y Constantes

| Nombre | Tipo  | Valor               | Descripción                                      |
|--------|-------|---------------------|--------------------------------------------------|
| `num1` | `dd`  | 500                 | Primer número predefinido a sumar (4 bytes).     |
| `num2` | `dd`  | 10                  | Segundo número predefinido a sumar (4 bytes).    |
| `fmt`  | `db`  | "Resultado: %d", 10, 0 | Formato de salida para mostrar el resultado (`printf`). |
| `res`  | `resb`| 4                   | Espacio para almacenar el resultado de la suma (4 bytes). |

## 4. Registros Utilizados

| Registro | Uso                                                                 |
|----------|---------------------------------------------------------------------|
| `eax`    | Almacena el primer número, el resultado de la suma y el valor de retorno. |
| `esp`    | Puntero de pila para pasar argumentos a `printf`.                   |

## 5. Funciones Externas (libc)

| Función | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `printf`| Imprime el resultado formateado en la salida estándar.                      |

## 6. Flujo del Programa

| Paso | Instrucción         | Descripción                                           |
|------|---------------------|-------------------------------------------------------|
| 1    | `mov eax, dword [num1]` | Carga el valor de `num1` (500) en `eax`.          |
| 2    | `add eax, dword [num2]` | Suma el valor de `num2` (10) a `eax`.             |
| 3    | `mov [res], eax`    | Almacena el resultado (510) en `res`.                 |
| 4    | `push dword [res]`  | Empuja el valor de `res` a la pila.                   |
| 5    | `push fmt`          | Empuja el formato "Resultado: %d" a la pila.          |
| 6    | `call printf`       | Llama a `printf` para mostrar el resultado.           |
| 7    | `add esp, 8`        | Limpia la pila (8 bytes: 4 + 4).                      |
| 8    | `xor eax, eax`      | Establece el valor de retorno en 0 (éxito).           |
| 9    | `ret`               | Retorna al sistema (fin del programa).                |

## 7. Compilación y Ejecución

| Paso | Comando                                      | Descripción                                          |
|------|----------------------------------------------|------------------------------------------------------|
| 1    | `sudo apt install gcc-multilib`              | Instala soporte para compilación de 32 bits en `gcc` (si es necesario). |
| 2    | `nasm -f elf32 suma.asm -o suma.o`           | Ensambla el código en un archivo objeto ELF (`suma.o`). |
| 3    | `gcc -m32 suma.o -o suma -no-pie`            | Enlaza el archivo objeto con `libc` para crear el ejecutable (`suma`). |
| 4    | `./suma`                                     | Ejecuta el programa.                                 |

*(Nota: Usa `-m32` para compatibilidad con 32 bits y `-no-pie` para evitar problemas con ejecutables PIE en algunos sistemas.)*

## 8. Salida
![Ejemplo de ejecución](/static/images/suma_gcc.png)
*(Nota: El resultado es la suma de 500 + 10 = 510. Si cambias `num1` o `num2`, el resultado variará.)*

## 9. Código

```asm
; nasm -f elf32 suma.asm -o suma.o
; gcc -m32 suma.o -o suma -no-pie
; ./suma

; sudo apt install gcc-multilib

section .data
    num1 dd 500
    num2 dd 10
    fmt db "Resultado: %d", 10, 0

section .bss
    res resb 4

section .text
    global main
    extern printf

main:
    mov eax, dword [num1]  ; Cargar num1 en eax
    add eax, dword [num2]  ; Sumar num2
    mov [res], eax         ; Guardar resultado

    push dword [res]       ; Pasar el resultado a printf
    push fmt
    call printf
    add esp, 8             ; Limpiar pila