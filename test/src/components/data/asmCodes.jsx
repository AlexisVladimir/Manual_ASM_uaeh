const asmCodes = [
  {
    id: 1,
    title: "Escritura consola",
    code: `section .data
      mensaje db "Hola mundo", 0xA ; mensaje con salto de línea.
      len equ $- mensaje ; longitud del mensaje. $ representa la posición actual en memoria.
                        ; len tendrá la cantidad total de bytes, incluyendo el 0xA.

      section .text
          global _start

      _start: ; Punto de entrada del programa.

          ; Llamada al sistema write (syscall número 4 en Linux).
          mov eax, 4 ; syscall número 4 -> sys_write.
          mov ebx, 1 ; file descriptor 1 -> stdout (salida estándar).
          mov ecx, mensaje ; dirección del mensaje.
          mov edx, len ; longitud del mensaje.
          int 0x80 ; Llamada a la interrupción del kernel de Linux.

          ; Llamada al sistema exit (syscall número 1 en Linux).
          mov eax, 1 ; syscall número 1 -> sys_exit.
          xor ebx, ebx ; Código de salida 0 (éxito).
          int 0x80 ; Llamada a la interrupción del kernel de Linux.

          ;nasm -f elf32 HOLA.asm -o hola.o

      ;nasm -f elf32 HOLA.asm -o hola.o
      ;ld  -m elf_i386 -s -o hola hola.o 
      ;./hola `,
    description: "Código ASM para imprimir en pantalla Hola mundo.",
  },
  {
    id: 2,
    title: "Bucle",
    code: `; nasm -f elf32 bucle.asm -o bucle.o 
;ld -m elf_i386 bucle.o -o bucle 
; ./bucle

section .data
  hello db "hola malosoo", 11
  hello_len equ $ - hello
  n equ 11;numero de repeticiones

section .text
  global _start

_start:
  mov ecx,n ;usamos ecx como contador

.loop: 
  push ecx; guardamos el valor del contador
  mov edx, hello_len; longuitud del mensaje 
  mov ecx, hello ;direccion del mensaje 
  mov ebx, 1 ;descriptor de archivo stdout
  mov eax,4 ;syscall: sys_write
  int 0x80 ; llamada del sistema 
  pop ecx ; restauramos contador
  loop .loop  ;decrementa ecx y salta si no es 0

  mov eax, 1 ; syscall: sys_exit
  xor ebx, ebx ; codigo de salida 0
  int 0x80  `,
    description: "Codigo para realizar un bucle.",
  },
  {
    id: 3,
    title: "Leer consola",
    code: `; nasm -f elf32 leer.asm -o leer.o 
;ld -m elf_i386 leer.o -o leer 
; ./leer

section .bss
  buffer resb 10 ; buffer para almacenar el numero ingresado 

section .data 
  msg db "ingrese el dijito: ", 0 
  msg_result db "Numero ingresado: ",0 
  newline db 10,0 ;salto de linea

section .text
  global _start 

_start:  
  ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80
  
; mostrar mensaje 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, msg ; direccion del mensaje 
  mov edx, 18; longitud del mensaje 
  int 0x80; llamado del sistema

; leer numero desde la entrada estandar 
  mov eax, 3  ; syscall red
  mov ebx, 0  ; stdint 
  mov ecx, buffer ; direccion donde se guarda el numero 
  mov edx, 10 ; longitud maxima 
  int 0x80 ; llamado del sistema 

  ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80

; mostrar mensaje del resultado 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, msg_result ; direccion del mensaje 
  mov edx, 18; longitud del mensaje 
  int 0x80

; mostrar numero ingresado 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, buffer ; direccion del mensaje 
  mov edx, 10 ; longitud del mensaje 
  int 0x80

  ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80

  ; salir del programa 
  mov eax, 1 ;  syscal exit 
  mov ebx, ebx  ;codigo de salida 0 
  int 0x80
 `,
    description: "Codigo para leer un numero desde la consola.",
  },
  {
    id: 4,
    title: "Sumar dos números",
    code: `; nasm -f elf32 sumar.asm -o sumar.o 
;ld -m elf_i386 sumar.o -o sumar 
; ./sumar

section .bss
  ;resb reserva espacio en unidades byte
  num1 resb 2 ; buffer para almacenar el numero ingresado 
  num2 resb 2
  sum resb 5

section .data 
  msg1 db "ingrese el primer numero: ", 0 
  msg2 db "ingrese el segundo numero: ", 0 
  msg3 db "la suma es: ", 0 
  newline db 10,0 ;salto de linea

section .text
  global _start 

_start:  
  ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80
  
; mostrar mensaje 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, msg1 ; direccion del mensaje 
  mov edx, 26; longitud del mensaje 
  int 0x80; llamado del sistema

; leer numero desde la entrada estandar 
  mov eax, 3  ; syscall red
  mov ebx, 0  ; stdint 
  mov ecx, num1 ; direccion donde se guarda el numero 
  mov edx, 10 ; longitud maxima 
  int 0x80 ; llamado del sistema 

  ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80

; mostrar mensaje del resultado 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, msg2 ; direccion del mensaje 
  mov edx, 28; longitud del mensaje 
  int 0x80

; leer numero desde la entrada estandar 
  mov eax, 3  ; syscall red
  mov ebx, 0  ; stdint 
  mov ecx, num2 ; direccion donde se guarda el numero 
  mov edx, 10 ; longitud maxima 
  int 0x80 ; llamado del sistema 

; comvertir ASCII a numeros
  mov al,[num1]
  sub al, '0'; convierte de ASCII  a valor numerico 
  mov bl,[num2]
  sub bl, '0'; convierte de ASCII  a valor numerico 

; 
  add al,bl 
  add al,'0'  ; comvertir resultado a ascii
  mov [sum], al

; mostrar mensaje del resultado 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, msg3 ; direccion del mensaje 
  mov edx, 12; longitud del mensaje 
  int 0x80

; mostrar numero ingresado 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, sum ; direccion del mensaje 
  mov edx, 10 ; longitud del mensaje 
  int 0x80

  ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80

  ; salir del programa 
  mov eax, 1 ;  syscal exit 
  mov ebx, ebx  ;codigo de salida 0 
  int 0x80`,
    description: "Codigo para sumar dos numeros.",
  },
  {
    id: 5,
    title: "Calculadora",
    code: `    ; nasm -f elf32 calculadora.asm -o calculadora.o 
;ld -m elf_i386 calculadora.o -o calculadora 
; ./calculadora

section .bss
  ;resb reserva espacio en unidades byte
  num1 resb 2 ; buffer para almacenar el numero ingresado 
  num2 resb 2
  sum resb 5
  num3 resb 2

section .data 
  msg1 db "ingrese el primer numero: ", 0 
  msg2 db "ingrese el segundo numero: ", 0 
  msg3 db "1) Suma", 0 
  msg4 db "2) resta", 0 
  msg5 db "3) divicion", 0 
  msg6 db "4) multiplicacion", 0 
  newline db 10,0 ;salto de linea

section .text
  global _start 

_start:  
  ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80
  
; mostrar mensaje 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, msg1 ; direccion del mensaje 
  mov edx, 26; longitud del mensaje 
  int 0x80; llamado del sistema

; leer numero desde la entrada estandar 
  mov eax, 3  ; syscall red
  mov ebx, 0  ; stdint 
  mov ecx, num1 ; direccion donde se guarda el numero 
  mov edx, 10 ; longitud maxima 
  int 0x80 ; llamado del sistema 

  ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80

; mostrar mensaje del resultado 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, msg2 ; direccion del mensaje 
  mov edx, 28; longitud del mensaje 
  int 0x80

; leer numero desde la entrada estandar 
  mov eax, 3  ; syscall red
  mov ebx, 0  ; stdint 
  mov ecx, num2 ; direccion donde se guarda el numero 
  mov edx, 10 ; longitud maxima 
  int 0x80 ; llamado del sistema 




; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80

  ; mostrar mensaje 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, msg3 ; direccion del mensaje 
  mov edx, 6; longitud del mensaje 
  int 0x80; llamado del sistema
   ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80

; mostrar mensaje 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, msg4 ; direccion del mensaje 
  mov edx, 7; longitud del mensaje 
  int 0x80; llamado del sistema
   ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80

; mostrar mensaje 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, msg5 ; direccion del mensaje 
  mov edx, 11; longitud del mensaje 
  int 0x80; llamado del sistema

 ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80

; mostrar mensaje 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, msg6 ; direccion del mensaje 
  mov edx, 16; longitud del mensaje 
  int 0x80; llamado del sistema

   ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80

  ; leer numero desde la entrada estandar 
  mov eax, 3  ; syscall red
  mov ebx, 0  ; stdint 
  mov ecx, num3 ; direccion donde se guarda el numero 
  mov edx, 1 ; longitud maxima 
  int 0x80 ; llamado del sistema 
   ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80


  mov al, [num1]
  sub al, '0'
  mov bl, [num2]
  sub bl, '0'

  mov cl, [num3]
  cmp cl, '1'
  je hacer_suma
  cmp cl, '2'
  je hacer_resta
  cmp cl, '3'
  je hacer_division
  cmp cl, '4'
  je hacer_multiplicacion


  CMP AX, SI     
  JE hacer_suma   

  CMP BX, SI      
  JE hacer_resta  

  CMP CX, SI      
  JE hacer_division   

  CMP DX, SI      
  JE hacer_multiplicacion   





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
  mov ecx, sum    ; Dirección del resultado
  mov edx, 1      ; Longitud del resultado
  int 0x80        ; Llamada al sistema

  ; Salir del programa
  mov eax, 1      ; syscall exit
  xor ebx, ebx    ; Código de salida 0
  int 0x80        ; Llamada al sistema`,
    description: "Codigo para realizar operaciones matematicas.",
  },
  {
    id: 6,
    title: "Sumar y bucle",
    code: `; nasm -f elf32 sumabucle.asm -o sumar.o 
;ld -m elf_i386 sumabucle.o -o sumabucle 
; ./sumabucle

section .bss
  ;resb reserva espacio en unidades byte
  num1 resb 2 ; buffer para almacenar el numero ingresado 
  num2 resb 2
  sum resb 5

section .data 
  msg1 db "ingrese el primer numero: ", 0 
  msg2 db "ingrese el segundo numero: ", 0 
  msg3 db "Hola", 5
  hello_len equ $ - msg3 
  newline db 10,0 ;salto de linea

section .text
  global _start 

_start:  
  ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80
  
; mostrar mensaje 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, msg1 ; direccion del mensaje 
  mov edx, 26; longitud del mensaje 
  int 0x80; llamado del sistema

; leer numero desde la entrada estandar 
  mov eax, 3  ; syscall read
  mov ebx, 0  ; stdint 
  mov ecx, num1 ; direccion donde se guarda el numero 
  mov edx, 10 ; longitud maxima 
  int 0x80 ; llamado del sistema 

  ; imprimir salto de liena 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, newline ; direccion del mensaje 
  mov edx, 1; longitud del mensaje 
  int 0x80

; mostrar mensaje del resultado 
  mov eax, 4  ; syscall write
  mov ebx, 1  ; stdout
  mov ecx, msg2 ; direccion del mensaje 
  mov edx, 28; longitud del mensaje 
  int 0x80

; leer numero desde la entrada estandar 
  mov eax, 3  ; syscall read
  mov ebx, 0  ; stdint 
  mov ecx, num2 ; direccion donde se guarda el numero 
  mov edx, 10 ; longitud maxima 
  int 0x80 ; llamado del sistema 

; comvertir ASCII a numeros
  mov al,[num1]
  sub al, '0'; convierte de ASCII  a valor numerico 
  mov bl,[num2]
  sub bl, '0'; convierte de ASCII  a valor numerico 

; 
  add al,bl 
  add al,'0'  ; comvertir resultado a ascii
  mov [sum], al

  sub al, '0' ; convertir de ASCII a número
  mov ecx,sum ;usamos ecx como contador

  .loop: 
  push ecx; guardamos el valor del contador
  mov edx, hello_len; longuitud del mensaje 
  mov ecx, msg3 ;direccion del mensaje 
  mov ebx, 1 ;descriptor de archivo stdout
  mov eax,4 ;syscall: sys_write
  int 0x80 ; llamada del sistema 
  pop ecx ; restauramos contador
  loop .loop  ;decrementa ecx y salta si no es 0

  mov eax, 1 ; syscall: sys_exit
  xor ebx, ebx ; codigo de salida 0
  int 0x80 
`,
    description: "Codigo para realizar operaciones matematicas y mostrar un mensaje.",
  },
  {
    id: 7,
    title: "Escritura consola",
    code: `section .data
      mensaje db "Hola mundo", 0xA ; mensaje con salto de línea.
      len equ $- mensaje ; longitud del mensaje. $ representa la posición actual en memoria.
                        ; len tendrá la cantidad total de bytes, incluyendo el 0xA.

      section .text
          global _start

      _start: ; Punto de entrada del programa.

          ; Llamada al sistema write (syscall número 4 en Linux).
          mov eax, 4 ; syscall número 4 -> sys_write.
          mov ebx, 1 ; file descriptor 1 -> stdout (salida estándar).
          mov ecx, mensaje ; dirección del mensaje.
          mov edx, len ; longitud del mensaje.
          int 0x80 ; Llamada a la interrupción del kernel de Linux.

          ; Llamada al sistema exit (syscall número 1 en Linux).
          mov eax, 1 ; syscall número 1 -> sys_exit.
          xor ebx, ebx ; Código de salida 0 (éxito).
          int 0x80 ; Llamada a la interrupción del kernel de Linux.

          ;nasm -f elf32 HOLA.asm -o hola.o

      ;nasm -f elf32 HOLA.asm -o hola.o
      ;ld  -m elf_i386 -s -o hola hola.o 
      ;./hola `,
    description: "Código ASM para imprimir en pantalla Hola mundo.",
  },
  {
    id: 8,
    title: "Escritura consola",
    code: `section .data
      mensaje db "Hola mundo", 0xA ; mensaje con salto de línea.
      len equ $- mensaje ; longitud del mensaje. $ representa la posición actual en memoria.
                        ; len tendrá la cantidad total de bytes, incluyendo el 0xA.

      section .text
          global _start

      _start: ; Punto de entrada del programa.

          ; Llamada al sistema write (syscall número 4 en Linux).
          mov eax, 4 ; syscall número 4 -> sys_write.
          mov ebx, 1 ; file descriptor 1 -> stdout (salida estándar).
          mov ecx, mensaje ; dirección del mensaje.
          mov edx, len ; longitud del mensaje.
          int 0x80 ; Llamada a la interrupción del kernel de Linux.

          ; Llamada al sistema exit (syscall número 1 en Linux).
          mov eax, 1 ; syscall número 1 -> sys_exit.
          xor ebx, ebx ; Código de salida 0 (éxito).
          int 0x80 ; Llamada a la interrupción del kernel de Linux.

          ;nasm -f elf32 HOLA.asm -o hola.o

      ;nasm -f elf32 HOLA.asm -o hola.o
      ;ld  -m elf_i386 -s -o hola hola.o 
      ;./hola `,
    description: "Código ASM para imprimir en pantalla Hola mundo.",
  },
  {
    id: 9,
    title: "Escritura consola",
    code: `section .data
      mensaje db "Hola mundo", 0xA ; mensaje con salto de línea.
      len equ $- mensaje ; longitud del mensaje. $ representa la posición actual en memoria.
                        ; len tendrá la cantidad total de bytes, incluyendo el 0xA.

      section .text
          global _start

      _start: ; Punto de entrada del programa.

          ; Llamada al sistema write (syscall número 4 en Linux).
          mov eax, 4 ; syscall número 4 -> sys_write.
          mov ebx, 1 ; file descriptor 1 -> stdout (salida estándar).
          mov ecx, mensaje ; dirección del mensaje.
          mov edx, len ; longitud del mensaje.
          int 0x80 ; Llamada a la interrupción del kernel de Linux.

          ; Llamada al sistema exit (syscall número 1 en Linux).
          mov eax, 1 ; syscall número 1 -> sys_exit.
          xor ebx, ebx ; Código de salida 0 (éxito).
          int 0x80 ; Llamada a la interrupción del kernel de Linux.

          ;nasm -f elf32 HOLA.asm -o hola.o

      ;nasm -f elf32 HOLA.asm -o hola.o
      ;ld  -m elf_i386 -s -o hola hola.o 
      ;./hola `,
    description: "Código ASM para imprimir en pantalla Hola mundo.",
  },
  {
    id: 10,
    title: "Escritura consola",
    code: `section .data
      mensaje db "Hola mundo", 0xA ; mensaje con salto de línea.
      len equ $- mensaje ; longitud del mensaje. $ representa la posición actual en memoria.
                        ; len tendrá la cantidad total de bytes, incluyendo el 0xA.

      section .text
          global _start

      _start: ; Punto de entrada del programa.

          ; Llamada al sistema write (syscall número 4 en Linux).
          mov eax, 4 ; syscall número 4 -> sys_write.
          mov ebx, 1 ; file descriptor 1 -> stdout (salida estándar).
          mov ecx, mensaje ; dirección del mensaje.
          mov edx, len ; longitud del mensaje.
          int 0x80 ; Llamada a la interrupción del kernel de Linux.

          ; Llamada al sistema exit (syscall número 1 en Linux).
          mov eax, 1 ; syscall número 1 -> sys_exit.
          xor ebx, ebx ; Código de salida 0 (éxito).
          int 0x80 ; Llamada a la interrupción del kernel de Linux.

          ;nasm -f elf32 HOLA.asm -o hola.o

      ;nasm -f elf32 HOLA.asm -o hola.o
      ;ld  -m elf_i386 -s -o hola hola.o 
      ;./hola `,
    description: "Código ASM para imprimir en pantalla Hola mundo.",
  },
];

export default asmCodes;