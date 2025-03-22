# Memoria Técnica del Código Es_Par ASM Y GCC

## 1. Información General

| Campo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Nombre del programa | `es_par.asm`                                                        |
| Propósito           | Verificar si un número predefinido es par o impar y mostrar un mensaje usando `printf`. |
| Arquitectura        | x86 (32 bits)                                                              |
| Sistema Operativo   | Linux                                                                      |
| Funciones externas  | `printf` (enlazada con `libc` mediante `gcc`)                              |
| Punto de entrada    | `main` (compatible con `gcc`)                                              |

## 2. Secciones del Código

| Sección | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `.data` | Contiene el número a verificar y mensajes inicializados para salida.        |
| `.text` | Contiene el código ejecutable del programa.                                 |

## 3. Variables y Constantes

| Nombre  | Tipo | Valor                    | Descripción                                      |
|---------|------|--------------------------|--------------------------------------------------|
| `num`   | `dd` | 10                       | Número predefinido a verificar (4 bytes).        |
| `par`   | `db` | "El número es par", 10, 0| Mensaje para números pares, con salto de línea.  |
| `inpar` | `db` | "El número es impar", 10, 0 | Mensaje para números impares, con salto de línea. |

## 4. Registros Utilizados

| Registro | Uso                                                                 |
|----------|---------------------------------------------------------------------|
| `eax`    | Almacena el número a verificar y el valor de retorno del programa.  |
| `esp`    | Puntero de pila para pasar argumentos a `printf`.                   |

## 5. Funciones Externas (libc)

| Función | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `printf`| Imprime mensajes formateados en la salida estándar.                         |

## 6. Flujo del Programa

| Paso | Instrucción         | Descripción                                           |
|------|---------------------|-------------------------------------------------------|
| 1    | `mov eax, dword [num]` | Carga el valor de `num` (10) en `eax`.             |
| 2    | `test eax, 1`       | Realiza una operación AND entre `eax` y 1 para comprobar el bit menos significativo. |
| 3    | `jz print_par`      | Salta a `print_par` si el resultado es cero (número par). |
| 4    | `push inpar`        | Empuja el mensaje "El número es impar" a la pila.     |
| 5    | `call printf`       | Llama a `printf` para mostrar el mensaje de impar.    |
| 6    | `add esp, 4`        | Limpia la pila (4 bytes).                             |
| 7    | `jmp end_programa`  | Salta al final del programa.                          |
| 8    | `print_par:`        | Etiqueta para manejar números pares.                  |
| 9    | `push par`          | Empuja el mensaje "El número es par" a la pila.       |
| 10   | `call printf`       | Llama a `printf` para mostrar el mensaje de par.      |
| 11   | `add esp, 4`        | Limpia la pila (4 bytes).                             |
| 12   | `end_programa:`     | Etiqueta de finalización.                             |
| 13   | `xor eax, eax`      | Establece el valor de retorno en 0 (éxito).           |
| 14   | `ret`               | Retorna al sistema (fin del programa).                |

## 7. Compilación y Ejecución

| Paso | Comando                                      | Descripción                                          |
|------|----------------------------------------------|------------------------------------------------------|
| 1    | `nasm -f elf32 es_par.asm -o es_par.o`       | Ensambla el código en un archivo objeto ELF (`es_par.o`). |
| 2    | `gcc -m32 es_par.o -o es_par -no-pie`        | Enlaza el archivo objeto con `libc` para crear el ejecutable (`es_par`). |
| 3    | `./es_par`                                   | Ejecuta el programa.                                 |

*(Nota: Usa `-m32` para compatibilidad con 32 bits y `-no-pie` para evitar problemas con ejecutables PIE en algunos sistemas.)*

## 8. Salida
![Ejemplo de ejecución](/static/images/es_par_gcc.png)
## 9. Código

```asm
; nasm -f elf32 es_par.asm -o es_par.o
; gcc -m32 es_par.o -o es_par -no-pie
; ./es_par

section .data
    num dd 10
    par db "El número es par", 10, 0
    inpar db "El número es impar", 10, 0

section .text
    global main
    extern printf

main:
    mov eax, dword [num]
    test eax, 1         ; Comprobar si el bit menos significativo es 1
    jz print_par       ; Saltar si es cero (par)
    push inpar
    call printf
    add esp, 4
    jmp end_programa

print_par:
    push par
    call printf
    add esp, 4

end_programa:
    xor eax, eax
    ret