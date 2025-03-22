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
  ];
  
  export default asmCodes;