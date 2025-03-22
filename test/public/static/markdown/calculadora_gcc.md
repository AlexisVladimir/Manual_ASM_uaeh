# Memoria Técnica del Código calculadora ASM Y GCC

## 1. Información General

| Campo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Nombre del programa | `calculadora.asm`                                                   |
| Propósito           | Solicitar dos números y una operación (+, -, *, /), realizarla y mostrar el resultado usando funciones de C. |
| Arquitectura        | x86 (32 bits)                                                              |
| Sistema Operativo   | Linux                                                                      |
| Funciones externas  | `printf`, `scanf` (enlazadas con `libc` mediante `gcc`)                    |
| Punto de entrada    | `main` (compatible con `gcc`)                                              |

## 2. Secciones del Código

| Sección | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `.data` | Contiene mensajes y formatos inicializados para entrada/salida.             |
| `.bss`  | Reserva espacio para variables no inicializadas (números, operación y resultado). |
| `.text` | Contiene el código ejecutable del programa.                                 |

## 3. Variables y Constantes

| Nombre       | Tipo  | Valor                              | Descripción                                      |
|--------------|-------|------------------------------------|--------------------------------------------------|
| `prompt1`    | `db`  | "Ingrese el primer numero: ", 0    | Mensaje para solicitar el primer número.         |
| `prompt2`    | `db`  | "Ingrese el segundo numero: ", 0   | Mensaje para solicitar el segundo número.        |
| `prompt3`    | `db`  | "Ingrese la operacion (+, -, *, /): ", 0 | Mensaje para solicitar la operación.       |
| `fmt_in_num` | `db`  | "%d", 0                            | Formato de entrada para un número entero (`scanf`). |
| `fmt_in_char`| `db`  | " %c", 0                           | Formato de entrada para un carácter (`scanf`).   |
| `fmt_out`    | `db`  | "Resultado: %d", 10, 0             | Formato de salida para el resultado (`printf`).  |
| `error_msg`  | `db`  | "Error: Division por cero", 10, 0  | Mensaje de error para división por cero.         |
| `num1`       | `resd`| 1                                  | Espacio para almacenar el primer número (4 bytes). |
| `num2`       | `resd`| 1                                  | Espacio para almacenar el segundo número (4 bytes). |
| `oper`       | `resb`| 1                                  | Espacio para almacenar la operación (+, -, *, /). |
| `result`     | `resd`| 1                                  | Espacio para almacenar el resultado (4 bytes).   |

## 4. Registros Utilizados

| Registro | Uso                                                                 |
|----------|---------------------------------------------------------------------|
| `eax`    | Almacena el primer número, resultado de operaciones o valor de retorno. |
| `ebx`    | Almacena el segundo número o divisor/multiplicador.                 |
| `ecx`    | Almacena la operación ingresada (`cl`).                             |
| `edx`    | Usado para extender el signo en división (`cdq`).                   |
| `esp`    | Puntero de pila para pasar argumentos a `printf` y `scanf`.         |

## 5. Funciones Externas (libc)

| Función | Descripción                                                                 |
|---------|-----------------------------------------------------------------------------|
| `printf`| Imprime mensajes y resultados formateados en la salida estándar.            |
| `scanf` | Lee datos ingresados por el usuario desde la entrada estándar.              |

## 6. Flujo del Programa

| Paso | Instrucción             | Descripción                                           |
|------|-------------------------|-------------------------------------------------------|
| 1    | `push prompt1`          | Empuja el mensaje "Ingrese el primer numero: " a la pila. |
| 2    | `call printf`           | Llama a `printf` para mostrar el mensaje.             |
| 3    | `add esp, 4`            | Limpia la pila (4 bytes).                             |
| 4    | `push num1`             | Empuja la dirección de `num1` a la pila.              |
| 5    | `push fmt_in_num`       | Empuja el formato "%d" a la pila.                     |
| 6    | `call scanf`            | Llama a `scanf` para leer el primer número.           |
| 7    | `add esp, 8`            | Limpia la pila (8 bytes).                             |
| 8    | `push prompt2`          | Empuja el mensaje "Ingrese el segundo numero: " a la pila. |
| 9    | `call printf`           | Llama a `printf` para mostrar el mensaje.             |
| 10   | `add esp, 4`            | Limpia la pila (4 bytes).                             |
| 11   | `push num2`             | Empuja la dirección de `num2` a la pila.              |
| 12   | `push fmt_in_num`       | Empuja el formato "%d" a la pila.                     |
| 13   | `call scanf`            | Llama a `scanf` para leer el segundo número.          |
| 14   | `add esp, 8`            | Limpia la pila (8 bytes).                             |
| 15   | `push prompt3`          | Empuja el mensaje "Ingrese la operacion: " a la pila. |
| 16   | `call printf`           | Llama a `printf` para mostrar el mensaje.             |
| 17   | `add esp, 4`            | Limpia la pila (4 bytes).                             |
| 18   | `push oper`             | Empuja la dirección de `oper` a la pila.              |
| 19   | `push fmt_in_char`      | Empuja el formato " %c" a la pila.                    |
| 20   | `call scanf`            | Llama a `scanf` para leer la operación (+, -, *, /).  |
| 21   | `add esp, 8`            | Limpia la pila (8 bytes).                             |
| 22   | `mov eax, [num1]`       | Carga el primer número en `eax`.                      |
| 23   | `mov ebx, [num2]`       | Carga el segundo número en `ebx`.                     |
| 24   | `mov cl, [oper]`        | Carga la operación en `cl`.                           |
| 25   | `cmp cl, '+'`           | Compara si la operación es '+'.                       |
| 26   | `je sumar`              | Salta a `sumar` si es igual.                          |
| 27   | `cmp cl, '-'`           | Compara si la operación es '-'.                       |
| 28   | `je restar`             | Salta a `restar` si es igual.                         |
| 29   | `cmp cl, '*'`           | Compara si la operación es '*'.                       |
| 30   | `je multiplicar`        | Salta a `multiplicar` si es igual.                    |
| 31   | `cmp cl, '/'`           | Compara si la operación es '/'.                       |
| 32   | `je dividir`            | Salta a `dividir` si es igual.                        |
| 33   | `jmp fin`               | Salta a `fin` si no hay operación válida.             |
| 34   | `sumar:`                | Etiqueta para la suma.                                |
| 35   | `add eax, ebx`          | Suma `ebx` a `eax`.                                   |
| 36   | `jmp guardar_resultado` | Salta a guardar el resultado.                         |
| 37   | `restar:`               | Etiqueta para la resta.                               |
| 38   | `sub eax, ebx`          | Resta `ebx` de `eax`.                                 |
| 39   | `jmp guardar_resultado` | Salta a guardar el resultado.                         |
| 40   | `multiplicar:`          | Etiqueta para la multiplicación.                      |
| 41   | `imul ebx`              | Multiplica `eax` por `ebx` (resultado en `eax`).      |
| 42   | `jmp guardar_resultado` | Salta a guardar el resultado.                         |
| 43   | `dividir:`              | Etiqueta para la división.                            |
| 44   | `cmp ebx, 0`            | Compara si el divisor (`ebx`) es 0.                   |
| 45   | `je error_division`     | Salta a `error_division` si es 0.                     |
| 46   | `cdq`                   | Extiende el signo de `eax` a `edx:eax` para división. |
| 47   | `idiv ebx`              | Divide `edx:eax` entre `ebx` (resultado en `eax`).    |
| 48   | `jmp guardar_resultado` | Salta a guardar el resultado.                         |
| 49   | `error_division:`       | Etiqueta para manejar división por cero.              |
| 50   | `push error_msg`        | Empuja el mensaje de error a la pila.                 |
| 51   | `call printf`           | Llama a `printf` para mostrar el mensaje de error.    |
| 52   | `add esp, 4`            | Limpia la pila (4 bytes).                             |
| 53   | `jmp fin`               | Salta al final del programa.                          |
| 54   | `guardar_resultado:`    | Etiqueta para guardar el resultado.                   |
| 55   | `mov [result], eax`     | Almacena el resultado en `result`.                    |
| 56   | `push dword [result]`   | Empuja el valor de `result` a la pila.                |
| 57   | `push fmt_out`          | Empuja el formato "Resultado: %d" a la pila.          |
| 58   | `call printf`           | Llama a `printf` para mostrar el resultado.           |
| 59   | `add esp, 8`            | Limpia la pila (8 bytes).                             |
| 60   | `fin:`                  | Etiqueta de finalización.                             |
| 61   | `xor eax, eax`          | Establece el valor de retorno en 0 (éxito).           |
| 62   | `ret`                   | Retorna al sistema (fin del programa).                |

## 7. Compilación y Ejecución

| Paso | Comando                                      | Descripción                                          |
|------|----------------------------------------------|------------------------------------------------------|
| 1    | `nasm -f elf calculadora.asm -o calculadora.o` | Ensambla el código en un archivo objeto ELF (`calculadora.o`). |
| 2    | `gcc -m32 calculadora.o -o calculadora`      | Enlaza el archivo objeto con `libc` para crear el ejecutable (`calculadora`). |
| 3    | `./calculadora`                              | Ejecuta el programa.                                 |

*(Nota: Usa `-m32` en `gcc` para asegurar compatibilidad con 32 bits.)*

## 8. Salida

## 9. Código

```asm
; nasm -f elf calculadora.asm -o calculadora.o 
; gcc -m32 calculadora.o -o calculadora 
; ./calculadora

section .data
    prompt1 db "Ingrese el primer numero: ", 0
    prompt2 db "Ingrese el segundo numero: ", 0
    prompt3 db "Ingrese la operacion (+, -, *, /): ", 0
    fmt_in_num db "%d", 0
    fmt_in_char db " %c", 0
    fmt_out db "Resultado: %d", 10, 0
    error_msg db "Error: Division por cero", 10, 0

section .bss
    num1 resd 1    ; Espacio para el primer numero (4 bytes)
    num2 resd 1    ; Espacio para el segundo numero (4 bytes)
    oper resb 1    ; Espacio para la operacion (1 byte)
    result resd 1  ; Espacio para el resultado (4 bytes)

section .text
    global main
    extern printf, scanf

main:
    ; Pedir primer número
    push prompt1
    call printf
    add esp, 4

    push num1
    push fmt_in_num
    call scanf
    add esp, 8

    ; Pedir segundo número
    push prompt2
    call printf
    add esp, 4

    push num2
    push fmt_in_num
    call scanf
    add esp, 8

    ; Pedir operación
    push prompt3
    call printf
    add esp, 4

    push oper
    push fmt_in_char
    call scanf
    add esp, 8

    ; Cargar operandos en registros
    mov eax, [num1]  ; Cargar primer número en EAX
    mov ebx, [num2]  ; Cargar segundo número en EBX

    ; Evaluar la operación ingresada
    mov cl, [oper]   
    cmp cl, '+'
    je sumar
    cmp cl, '-'
    je restar
    cmp cl, '*'
    je multiplicar
    cmp cl, '/'
    je dividir
    jmp fin          ; Si no es una operación válida, termina

sumar:
    add eax, ebx
    jmp guardar_resultado

restar:
    sub eax, ebx
    jmp guardar_resultado

multiplicar:
    imul ebx
    jmp guardar_resultado

dividir:
    cmp ebx, 0
    je error_division
    cdq            ; Extender signo en EDX:EAX para división
    idiv ebx
    jmp guardar_resultado

error_division:
    push error_msg
    call printf
    add esp, 4
    jmp fin

guardar_resultado:
    mov [result], eax

    ; Imprimir resultado
    push dword [result]
    push fmt_out
    call printf
    add esp, 8

fin:
    xor eax, eax
    ret