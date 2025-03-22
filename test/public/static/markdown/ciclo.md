# Memoria Técnica del Código Bucle ASM

## 1. Información General

| Campo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Nombre del programa | `bucle.asm`                                                                 |
| Propósito           | Imprimir el mensaje "hola malosoo" 11 veces en la consola y luego finalizar.|
| Arquitectura        | x86 (32 bits)                                                              |
| Sistema Operativo   | Linux                                                                      |
| Syscalls usadas     | `sys_write` (4), `sys_exit` (1)                                            |

## 2. Secciones del Código

| Sección | Descripción                                 |
|---------|---------------------------------------------|
| `.data` | Contiene las variables y constantes inicializadas. |
| `.text` | Contiene el código ejecutable del programa. |

## 3. Variables y Constantes

| Nombre      | Tipo  | Valor                | Descripción                         |
|-------------|-------|----------------------|-------------------------------------|
| `hello`     | `db`  | "hola malosoo", 11   | Cadena de caracteres a imprimir.    |
| `hello_len` | `equ` | $ - hello            | Longitud de la cadena `hello`.      |
| `n`         | `equ` | 11                   | Número de repeticiones del mensaje. |

## 4. Registros Utilizados

| Registro | Uso                                                         |
|----------|-------------------------------------------------------------|
| `eax`    | Almacena el número de la syscall (`sys_write` o `sys_exit`).|
| `ebx`    | Descriptor de archivo (`stdout`) o código de salida.        |
| `ecx`    | Contador del bucle y dirección del mensaje.                 |
| `edx`    | Longitud del mensaje a imprimir.                            |

## 5. Syscalls Utilizadas

| Syscall    | Número | Parámetros                                              | Descripción                              |
|------------|--------|--------------------------------------------------------|------------------------------------------|
| `sys_write`| 4      | `ebx = 1` (`stdout`), `ecx` = dirección del mensaje, `edx` = longitud del mensaje | Escribe datos en la salida estándar.     |
| `sys_exit` | 1      | `ebx` = código de salida                               | Termina la ejecución del programa.       |

## 6. Flujo del Programa

| Paso | Instrucción         | Descripción                                           |
|------|---------------------|-------------------------------------------------------|
| 1    | `mov ecx, n`        | Inicializa el contador `ecx` con el valor de `n` (11).|
| 2    | `.loop:`            | Inicio del bucle.                                     |
| 3    | `push ecx`          | Guarda el valor de `ecx` en la pila.                  |
| 4    | `mov edx, hello_len`| Carga la longitud del mensaje en `edx`.               |
| 5    | `mov ecx, hello`    | Carga la dirección del mensaje en `ecx`.              |
| 6    | `mov ebx, 1`        | Establece el descriptor de archivo para `stdout`.     |
| 7    | `mov eax, 4`        | Prepara la syscall `sys_write`.                       |
| 8    | `int 0x80`          | Invoca la syscall para imprimir el mensaje.           |
| 9    | `pop ecx`           | Restaura el valor de `ecx` desde la pila.             |
| 10   | `loop .loop`        | Decrementa `ecx` y salta a `.loop` si `ecx` no es cero.|
| 11   | `mov eax, 1`        | Prepara la syscall `sys_exit`.                        |
| 12   | `xor ebx, ebx`      | Establece el código de salida en 0 (éxito).           |
| 13   | `int 0x80`          | Invoca la syscall para finalizar el programa.         |

## 7. Compilación y Ejecución

| Paso | Comando                              | Descripción                                          |
|------|--------------------------------------|------------------------------------------------------|
| 1    | `nasm -f elf32 bucle.asm -o bucle.o` | Ensambla el código en un archivo objeto (`bucle.o`). |
| 2    | `ld -m elf_i386 bucle.o -o bucle`    | Enlaza el archivo objeto para crear el ejecutable (`bucle`). |
| 3    | `./bucle`                            | Ejecuta el programa.                                 |

## 8. Salida
![Ejemplo de ejecución](/static/images/bucle.png)
## 9. Código

```asm
; nasm -f elf32 sumar.asm -o sumar.o 
; ld -m elf_i386 sumar.o -o sumar 
; ./sumar

section .data
    hello db "hola malosoo", 11
    hello_len equ $ - hello
    n equ 11 ; número de repeticiones

section .text
    global _start

_start:
    mov ecx, n ; usamos ecx como contador

.loop: 
    push ecx ; guardamos el valor del contador
    mov edx, hello_len ; longitud del mensaje 
    mov ecx, hello ; dirección del mensaje 
    mov ebx, 1 ; descriptor de archivo stdout
    mov eax, 4 ; syscall: sys_write
    int 0x80 ; llamada del sistema 
    pop ecx ; restauramos contador
    loop .loop ; decrementa ecx y salta si no es 0

    mov eax, 1 ; syscall: sys_exit
    xor ebx, ebx ; código de salida 0
    int 0x80