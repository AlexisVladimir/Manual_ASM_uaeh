# Memoria Técnica del Código Factorial ASM Y GCC

## 1. Información General

| Campo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Nombre del programa | `factorial.asm`                                                     |
| Propósito           | Calcular el factorial de un número predefinido y mostrarlo usando `printf`. |
| Arquitectura        | x86 (32 bits)                                                              |
| Sistema Operativo   | Linux                                                                      |
| Funciones externas  | `printf` (enlazada con `libc` mediante `gcc`)                              |
| Punto de entrada    | `main` (compatible con `gcc`)                                              |

## 2. Secciones del Código

| Sección | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `.data` | Contiene el número inicial y el formato de salida inicializados.            |
| `.bss`  | Reserva espacio para el resultado del factorial.                            |
| `.text` | Contiene el código ejecutable del programa.                                 |

## 3. Variables y Constantes

| Nombre | Tipo  | Valor               | Descripción                                      |
|--------|-------|---------------------|--------------------------------------------------|
| `num`  | `dd`  | 5                   | Número predefinido para calcular su factorial (4 bytes). |
| `fmt`  | `db`  | "Factorial: %d", 10, 0 | Formato de salida para mostrar el resultado (`printf`). |
| `res`  | `resb`| 4                   | Espacio para almacenar el resultado del factorial (4 bytes). |

## 4. Registros Utilizados

| Registro | Uso                                                                 |
|----------|---------------------------------------------------------------------|
| `eax`    | Almacena el resultado acumulado del factorial y el valor de retorno.|
| `ecx`    | Contador para el bucle del factorial.                               |
| `esp`    | Puntero de pila para pasar argumentos a `printf`.                   |

## 5. Funciones Externas (libc)

| Función | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `printf`| Imprime el resultado formateado en la salida estándar.                      |

## 6. Flujo del Programa

| Paso | Instrucción         | Descripción                                           |
|------|---------------------|-------------------------------------------------------|
| 1    | `mov eax, 1`        | Inicializa `eax` en 1 (resultado inicial del factorial). |
| 2    | `mov ecx, dword [num]` | Carga el valor de `num` (5) en `ecx` como contador. |
| 3    | `factorial_loop:`   | Etiqueta de inicio del bucle.                         |
| 4    | `cmp ecx, 1`        | Compara `ecx` con 1.                                  |
| 5    | `jle end_loop`      | Salta a `end_loop` si `ecx` es menor o igual a 1.     |
| 6    | `imul eax, ecx`     | Multiplica `eax` por `ecx` (acumula el factorial).    |
| 7    | `dec ecx`           | Decrementa el contador `ecx`.                         |
| 8    | `jmp factorial_loop`| Salta al inicio del bucle para continuar.             |
| 9    | `end_loop:`         | Etiqueta de fin del bucle.                            |
| 10   | `mov [res], eax`    | Almacena el resultado final en `res`.                 |
| 11   | `push dword [res]`  | Empuja el valor de `res` a la pila.                   |
| 12   | `push fmt`          | Empuja el formato "Factorial: %d" a la pila.          |
| 13   | `call printf`       | Llama a `printf` para mostrar el resultado.           |
| 14   | `add esp, 8`        | Limpia la pila (8 bytes).                             |
| 15   | `xor eax, eax`      | Establece el valor de retorno en 0 (éxito).           |
| 16   | `ret`               | Retorna al sistema (fin del programa).                |

## 7. Compilación y Ejecución

| Paso | Comando                                      | Descripción                                          |
|------|----------------------------------------------|------------------------------------------------------|
| 1    | `nasm -f elf32 factorial.asm -o factorial.o` | Ensambla el código en un archivo objeto ELF (`factorial.o`). |
| 2    | `gcc -m32 factorial.o -o factorial -no-pie`  | Enlaza el archivo objeto con `libc` para crear el ejecutable (`factorial`). |
| 3    | `./factorial`                                | Ejecuta el programa.                                 |

*(Nota: Usa `-m32` para compatibilidad con 32 bits y `-no-pie` para evitar problemas con ejecutables PIE en algunos sistemas.)*

## 8. Salida
![Ejemplo de ejecución](/static/images/factorial_gcc.png)
*(Nota: El resultado es el factorial de 5 (5! = 5 × 4 × 3 × 2 × 1 = 120). Si cambias `num` a otro valor, como 3, mostrará "Factorial: 6".)*

## 9. Código

```asm
; nasm -f elf32 factorial.asm -o factorial.o
; gcc -m32 factorial.o -o factorial -no-pie
; ./factorial

section .data
    num dd 5
    fmt db "Factorial: %d", 10, 0

section .bss
    res resb 4

section .text
    global main
    extern printf

main:
    mov eax, 1       ; Inicializar resultado en 1
    mov ecx, dword [num]  ; Cargar número

factorial_loop:
    cmp ecx, 1       ; Si ecx <= 1, termina
    jle end_loop
    imul eax, ecx    ; Multiplicar eax * ecx
    dec ecx          ; Decrementar contador
    jmp factorial_loop

end_loop:
    mov [res], eax   ; Guardar resultado

    push dword [res]
    push fmt
    call printf
    add esp, 8

    xor eax, eax
    ret