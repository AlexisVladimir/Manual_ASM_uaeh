# Memoria Técnica del Código Raiz ASM Y GCC

## 1. Información General

| Campo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Nombre del programa | `raiz.asm`                                                          |
| Propósito           | Calcular la raíz cuadrada de un número predefinido y mostrarla usando `printf`. |
| Arquitectura        | x86 (32 bits)                                                              |
| Sistema Operativo   | Linux                                                                      |
| Funciones externas  | `printf` (enlazada con `libc` mediante `gcc`)                              |
| Punto de entrada    | `main` (compatible con `gcc`)                                              |

## 2. Secciones del Código

| Sección | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `.data` | Contiene el número de entrada y el formato de salida inicializados.         |
| `.bss`  | Reserva espacio para el resultado en formato de punto flotante (double).    |
| `.text` | Contiene el código ejecutable del programa.                                 |

## 3. Variables y Constantes

| Nombre | Tipo  | Valor                    | Descripción                                      |
|--------|-------|--------------------------|--------------------------------------------------|
| `num`  | `dd`  | 25.0                     | Número predefinido en formato float (4 bytes).   |
| `fmt`  | `db`  | "Raíz cuadrada: %lf", 10, 0 | Formato de salida para un double (`printf`).  |
| `res`  | `resq`| 1                        | Espacio para el resultado en formato double (8 bytes). |

## 4. Registros Utilizados

| Registro | Uso                                                                 |
|----------|---------------------------------------------------------------------|
| `eax`    | Almacena el valor de retorno del programa.                          |
| `esp`    | Puntero de pila para pasar argumentos a `printf`.                   |
| FPU      | Utiliza la pila de la FPU para operaciones de punto flotante (`fld`, `fsqrt`, `fstp`). |

## 5. Funciones Externas (libc)

| Función | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `printf`| Imprime el resultado formateado en la salida estándar.                      |

## 6. Flujo del Programa

| Paso | Instrucción         | Descripción                                           |
|------|---------------------|-------------------------------------------------------|
| 1    | `finit`             | Inicializa la Unidad de Punto Flotante (FPU).         |
| 2    | `fld dword [num]`   | Carga el número (25.0) desde `num` a la pila de la FPU como float. |
| 3    | `fsqrt`             | Calcula la raíz cuadrada del valor en la cima de la pila de la FPU. |
| 4    | `fstp qword [res]`  | Extrae el resultado de la FPU y lo almacena en `res` como double (8 bytes). |
| 5    | `push dword [res+4]`| Empuja la parte alta del double (bytes 4-7) a la pila.|
| 6    | `push dword [res]`  | Empuja la parte baja del double (bytes 0-3) a la pila.|
| 7    | `push fmt`          | Empuja el formato "Raíz cuadrada: %lf" a la pila.     |
| 8    | `call printf`       | Llama a `printf` para mostrar el resultado.           |
| 9    | `add esp, 12`       | Limpia la pila (12 bytes: 4 + 4 + 4).                 |
| 10   | `xor eax, eax`      | Establece el valor de retorno en 0 (éxito).           |
| 11   | `ret`               | Retorna al sistema (fin del programa).                |

## 7. Compilación y Ejecución

| Paso | Comando                                      | Descripción                                          |
|------|----------------------------------------------|------------------------------------------------------|
| 1    | `nasm -f elf32 raiz.asm -o raiz.o`           | Ensambla el código en un archivo objeto ELF (`raiz.o`). |
| 2    | `gcc -m32 raiz.o -o raiz -no-pie`            | Enlaza el archivo objeto con `libc` para crear el ejecutable (`raiz`). |
| 3    | `./raiz`                                     | Ejecuta el programa.                                 |

*(Nota: Usa `-m32` para compatibilidad con 32 bits y `-no-pie` para evitar problemas con ejecutables PIE en algunos sistemas.)*

## 8. Salida
![Ejemplo de ejecución](/static/images/raiz_gcc.png)

*(Nota: El resultado es la raíz cuadrada de 25.0. Si cambias `num` a otro valor, como `num dd 16.0`, mostrará "Raíz cuadrada: 4.000000".)*

## 9. Código

```asm
; nasm -f elf32 raiz.asm -o raiz.o
; gcc -m32 raiz.o -o raiz -no-pie
; ./raiz

section .data
    num dd 25.0             ; Número de entrada
    fmt db "Raíz cuadrada: %lf", 10, 0  ; %lf para double

section .bss
    res resq 1              ; Espacio para un número de 8 bytes (double)

section .text
    global main
    extern printf

main:
    finit                   ; Inicializar la FPU
    fld dword [num]         ; Cargar el número en la FPU
    fsqrt                   ; Calcular la raíz cuadrada
    fstp qword [res]        ; Guardar el resultado en 64 bits

    push dword [res+4]      ; Parte alta del double
    push dword [res]        ; Parte baja del double
    push fmt
    call printf
    add esp, 12             ; Limpiar la pila

    xor eax, eax
    ret