# Memoria Técnica del Código Calculadora ASM

## 1. Información General

| Campo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Nombre del programa | `calculadora.asm`                                                   |
| Propósito           | Solicitar dos números y una operación (suma, resta, división o multiplicación), realizarla y mostrar el resultado. |
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

| Nombre       | Tipo  | Valor                           | Descripción                                      |
|--------------|-------|---------------------------------|--------------------------------------------------|
| `num1`       | `resb`| 2                               | Buffer para almacenar el primer número ingresado.|
| `num2`       | `resb`| 2                               | Buffer para almacenar el segundo número ingresado.|
| `sum`        | `resb`| 5                               | Buffer para almacenar el resultado de la operación. |
| `num3`       | `resb`| 2                               | Buffer para almacenar la opción de operación (1-4). |
| `msg1`       | `db`  | "ingrese el primer numero: ", 0 | Mensaje para solicitar el primer número.         |
| `msg2`       | `db`  | "ingrese el segundo numero: ", 0| Mensaje para solicitar el segundo número.        |
| `msg3`       | `db`  | "1) Suma", 0                    | Opción de suma en el menú.                       |
| `msg4`       | `db`  | "2) resta", 0                   | Opción de resta en el menú.                      |
| `msg5`       | `db`  | "3) divicion", 0                | Opción de división en el menú.                   |
| `msg6`       | `db`  | "4) multiplicacion", 0          | Opción de multiplicación en el menú.             |
| `newline`    | `db`  | 10, 0                           | Salto de línea (`\n`).                           |

## 4. Registros Utilizados

| Registro | Uso                                                                 |
|----------|---------------------------------------------------------------------|
| `eax`    | Almacena el número de la syscall (`sys_write`, `sys_read`, o `sys_exit`) o resultado de operaciones. |
| `ebx`    | Descriptor de archivo (`stdout` o `stdin`) o código de salida.      |
| `ecx`    | Dirección del mensaje o buffer de entrada/salida, o opción de operación. |
| `edx`    | Longitud del mensaje o buffer.                                      |
| `al`     | Almacena el primer número y el resultado de las operaciones.        |
| `bl`     | Almacena el segundo número o divisor/multiplicador.                 |
| `ah`     | Usado para limpiar antes de la división.                            |

## 5. Syscalls Utilizadas

| Syscall    | Número | Parámetros                                                                 | Descripción                              |
|------------|--------|---------------------------------------------------------------------------|------------------------------------------|
| `sys_write`| 4      | `ebx = 1` (`stdout`), `ecx` = dirección del mensaje, `edx` = longitud del mensaje | Escribe datos en la salida estándar.     |
| `sys_read` | 3      | `ebx = 0` (`stdin`), `ecx` = dirección del buffer, `edx` = longitud máxima | Lee datos desde la entrada estándar.     |
| `sys_exit` | 1      | `ebx` = código de salida                                                  | Termina la ejecución del programa.       |

## 6. Flujo del Programa

| Paso | Instrucción             | Descripción                                           |
|------|-------------------------|-------------------------------------------------------|
| 1    | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 2    | `mov ebx, 1`            | Establece el descriptor de archivo para `stdout`.     |
| 3    | `mov ecx, newline`      | Carga la dirección del salto de línea.                |
| 4    | `mov edx, 1`            | Establece la longitud del salto de línea.             |
| 5    | `int 0x80`              | Imprime un salto de línea.                            |
| 6    | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 7    | `mov ecx, msg1`         | Carga la dirección del mensaje del primer número.     |
| 8    | `mov edx, 26`           | Establece la longitud del mensaje.                    |
| 9    | `int 0x80`              | Imprime "ingrese el primer numero: ".                 |
| 10   | `mov eax, 3`            | Prepara la syscall `sys_read`.                        |
| 11   | `mov ebx, 0`            | Establece el descriptor de archivo para `stdin`.      |
| 12   | `mov ecx, num1`         | Carga la dirección del buffer `num1`.                 |
| 13   | `mov edx, 10`           | Establece la longitud máxima de la entrada.           |
| 14   | `int 0x80`              | Lee el primer número ingresado por el usuario.        |
| 15   | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 16   | `mov ecx, newline`      | Carga la dirección del salto de línea.                |
| 17   | `mov edx, 1`            | Establece la longitud del salto de línea.             |
| 18   | `int 0x80`              | Imprime un salto de línea.                            |
| 19   | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 20   | `mov ecx, msg2`         | Carga la dirección del mensaje del segundo número.    |
| 21   | `mov edx, 28`           | Establece la longitud del mensaje.                    |
| 22   | `int 0x80`              | Imprime "ingrese el segundo numero: ".                |
| 23   | `mov eax, 3`            | Prepara la syscall `sys_read`.                        |
| 24   | `mov ecx, num2`         | Carga la dirección del buffer `num2`.                 |
| 25   | `int 0x80`              | Lee el segundo número ingresado por el usuario.       |
| 26   | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 27   | `mov ecx, newline`      | Carga la dirección del salto de línea.                |
| 28   | `int 0x80`              | Imprime un salto de línea.                            |
| 29   | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 30   | `mov ecx, msg3`         | Carga la dirección del mensaje "1) Suma".             |
| 31   | `mov edx, 6`            | Establece la longitud del mensaje.                    |
| 32   | `int 0x80`              | Imprime "1) Suma".                                    |
| 33   | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 34   | `mov ecx, newline`      | Carga la dirección del salto de línea.                |
| 35   | `int 0x80`              | Imprime un salto de línea.                            |
| 36   | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 37   | `mov ecx, msg4`         | Carga la dirección del mensaje "2) resta".            |
| 38   | `mov edx, 7`            | Establece la longitud del mensaje.                    |
| 39   | `int 0x80`              | Imprime "2) resta".                                   |
| 40   | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 41   | `mov ecx, newline`      | Carga la dirección del salto de línea.                |
| 42   | `int 0x80`              | Imprime un salto de línea.                            |
| 43   | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 44   | `mov ecx, msg5`         | Carga la dirección del mensaje "3) divicion".         |
| 45   | `mov edx, 11`           | Establece la longitud del mensaje.                    |
| 46   | `int 0x80`              | Imprime "3) divicion".                                |
| 47   | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 48   | `mov ecx, newline`      | Carga la dirección del salto de línea.                |
| 49   | `int 0x80`              | Imprime un salto de línea.                            |
| 50   | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 51   | `mov ecx, msg6`         | Carga la dirección del mensaje "4) multiplicacion".   |
| 52   | `mov edx, 16`           | Establece la longitud del mensaje.                    |
| 53   | `int 0x80`              | Imprime "4) multiplicacion".                          |
| 54   | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 55   | `mov ecx, newline`      | Carga la dirección del salto de línea.                |
| 56   | `int 0x80`              | Imprime un salto de línea.                            |
| 57   | `mov eax, 3`            | Prepara la syscall `sys_read`.                        |
| 58   | `mov ecx, num3`         | Carga la dirección del buffer `num3`.                 |
| 59   | `mov edx, 1`            | Establece la longitud máxima de la entrada (1 dígito).|
| 60   | `int 0x80`              | Lee la opción de operación (1-4).                     |
| 61   | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 62   | `mov ecx, newline`      | Carga la dirección del salto de línea.                |
| 63   | `int 0x80`              | Imprime un salto de línea.                            |
| 64   | `mov al, [num1]`        | Carga el primer número en `al`.                       |
| 65   | `sub al, '0'`           | Convierte de ASCII a valor numérico.                  |
| 66   | `mov bl, [num2]`        | Carga el segundo número en `bl`.                      |
| 67   | `sub bl, '0'`           | Convierte de ASCII a valor numérico.                  |
| 68   | `mov cl, [num3]`        | Carga la opción de operación en `cl`.                 |
| 69   | `cmp cl, '1'`           | Compara si la opción es '1' (suma).                   |
| 70   | `je hacer_suma`         | Salta a `hacer_suma` si es igual.                     |
| 71   | `cmp cl, '2'`           | Compara si la opción es '2' (resta).                  |
| 72   | `je hacer_resta`        | Salta a `hacer_resta` si es igual.                    |
| 73   | `cmp cl, '3'`           | Compara si la opción es '3' (división).               |
| 74   | `je hacer_division`     | Salta a `hacer_division` si es igual.                 |
| 75   | `cmp cl, '4'`           | Compara si la opción es '4' (multiplicación).         |
| 76   | `je hacer_multiplicacion`| Salta a `hacer_multiplicacion` si es igual.          |
| 77   | `hacer_suma:`           | Etiqueta para la suma.                                |
| 78   | `add al, bl`            | Suma los dos números.                                 |
| 79   | `add al, '0'`           | Convierte el resultado a ASCII.                       |
| 80   | `mov [sum], al`         | Almacena el resultado en `sum`.                       |
| 81   | `jmp mostrar_resultado` | Salta a mostrar el resultado.                         |
| 82   | `hacer_resta:`          | Etiqueta para la resta.                               |
| 83   | `sub al, bl`            | Resta el segundo número del primero.                  |
| 84   | `add al, '0'`           | Convierte el resultado a ASCII.                       |
| 85   | `mov [sum], al`         | Almacena el resultado en `sum`.                       |
| 86   | `jmp mostrar_resultado` | Salta a mostrar el resultado.                         |
| 87   | `hacer_division:`       | Etiqueta para la división.                            |
| 88   | `xor ah, ah`            | Limpia `ah` para la división.                         |
| 89   | `div bl`                | Divide `ax` entre `bl` (resultado en `al`).           |
| 90   | `add al, '0'`           | Convierte el resultado a ASCII.                       |
| 91   | `mov [sum], al`         | Almacena el resultado en `sum`.                       |
| 92   | `jmp mostrar_resultado` | Salta a mostrar el resultado.                         |
| 93   | `hacer_multiplicacion:` | Etiqueta para la multiplicación.                      |
| 94   | `mul bl`                | Multiplica `al` por `bl` (resultado en `ax`).         |
| 95   | `add al, '0'`           | Convierte el resultado a ASCII.                       |
| 96   | `mov [sum], al`         | Almacena el resultado en `sum`.                       |
| 97   | `jmp mostrar_resultado` | Salta a mostrar el resultado.                         |
| 98   | `mostrar_resultado:`    | Etiqueta para mostrar el resultado.                   |
| 99   | `mov eax, 4`            | Prepara la syscall `sys_write`.                       |
| 100  | `mov ecx, sum`          | Carga la dirección del resultado.                     |
| 101  | `mov edx, 1`            | Establece la longitud del resultado (1 byte).         |
| 102  | `int 0x80`              | Imprime el resultado.                                 |
| 103  | `mov eax, 1`            | Prepara la syscall `sys_exit`.                        |
| 104  | `xor ebx, ebx`          | Establece el código de salida en 0 (éxito).           |
| 105  | `int 0x80`              | Finaliza el programa.                                 |

## 7. Compilación y Ejecución

| Paso | Comando                                      | Descripción                                          |
|------|----------------------------------------------|------------------------------------------------------|
| 1    | `nasm -f elf32 calculadora.asm -o calculadora.o` | Ensambla el código en un archivo objeto (`calculadora.o`). |
| 2    | `ld -m elf_i386 calculadora.o -o calculadora`    | Enlaza el archivo objeto para crear el ejecutable (`calculadora`). |
| 3    | `./calculadora`                              | Ejecuta el programa.                                 |

## 8. Salida

![Ejemplo de ejecución](/static/images/calculadora.png)

## 9. Código

```asm
; nasm -f elf32 calculadora.asm -o calculadora.o
; ld -m elf_i386 calculadora.o -o calculadora
; ./calculadora

section .bss
    num1 resb 2 ; buffer para almacenar el primer número ingresado
    num2 resb 2 ; buffer para almacenar el segundo número ingresado
    sum resb 5  ; buffer para almacenar el resultado
    num3 resb 2 ; buffer para almacenar la opción seleccionada

section .data
    msg1 db "Ingrese el primer numero: ", 0
    msg2 db "Ingrese el segundo numero: ", 0
    msg3 db "1) Suma", 0
    msg4 db "2) Resta", 0
    msg5 db "3) Division", 0
    msg6 db "4) Multiplicacion", 0
    newline db 10, 0 ; salto de linea

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

    ; Mostrar las opciones de operación
    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, msg3 ; dirección del mensaje
    mov edx, 7  ; longitud del mensaje
    int 0x80    ; llamado del sistema

    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, newline ; salto de línea
    mov edx, 1  ; longitud del mensaje
    int 0x80    ; llamado del sistema

    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, msg4 ; dirección del mensaje
    mov edx, 9  ; longitud del mensaje
    int 0x80    ; llamado del sistema

    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, newline ; salto de línea
    mov edx, 1  ; longitud del mensaje
    int 0x80    ; llamado del sistema

    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, msg5 ; dirección del mensaje
    mov edx, 12 ; longitud del mensaje
    int 0x80    ; llamado del sistema

    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, newline ; salto de línea
    mov edx, 1  ; longitud del mensaje
    int 0x80    ; llamado del sistema

    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, msg6 ; dirección del mensaje
    mov edx, 18 ; longitud del mensaje
    int 0x80    ; llamado del sistema

    mov eax, 4  ; syscall write
    mov ebx, 1  ; stdout
    mov ecx, newline ; salto de línea
    mov edx, 1  ; longitud del mensaje
    int 0x80    ; llamado del sistema

    ; Leer la opción seleccionada desde la entrada estándar
    mov eax, 3  ; syscall read
    mov ebx, 0  ; stdin
    mov ecx, num3 ; dirección donde se guarda la opción
    mov edx, 2  ; longitud máxima
    int 0x80    ; llamado del sistema

    ; Convertir los números de ASCII a enteros
    mov al, [num1]
    sub al, '0'
    mov bl, [num2]
    sub bl, '0'

    ; Realizar la operación seleccionada
    mov cl, [num3]
    cmp cl, '1'
    je hacer_suma
    cmp cl, '2'
    je hacer_resta
    cmp cl, '3'
    je hacer_division
    cmp cl, '4'
    je hacer_multiplicacion

    ; Si no se selecciona una opción válida, salir
    jmp salir

hacer_suma:
    add al, bl
    add al, '0'
    mov [sum], al
    jmp mostrar_resultado

hacer_resta:
    sub al, bl
    add al, '0'
    mov [sum], al
    jmp mostrar_resultado

hacer_division:
    xor ah, ah      ; Limpiar AH para la división
    div bl          ; AL = AX / BL
    add al, '0'
    mov [sum], al
    jmp mostrar_resultado

hacer_multiplicacion:
    mul bl          ; AX = AL * BL
    add al, '0'
    mov [sum], al
    jmp mostrar_resultado

mostrar_resultado:
    ; Mostrar el resultado
    mov eax, 4      ; syscall write
    mov ebx, 1      ; stdout
    mov ecx, sum    ; dirección del resultado
    mov edx, 1      ; longitud del resultado
    int 0x80        ; llamado del sistema

    ; Salto de línea
    mov eax, 4      ; syscall write
    mov ebx, 1      ; stdout
    mov ecx, newline ; salto de línea
    mov edx, 1      ; longitud del mensaje
    int 0x80        ; llamado del sistema

salir:
    ; Salir del programa
    mov eax, 1      ; syscall exit
    xor ebx, ebx    ; código de salida 0
    int 0x80        ; llamado del sistema