const asmCodes = [
    {
      id: 1,
      category: "operaciones-basicas",
      title: "Suma de dos números",
      code: `section .data
      num1 db 5
      num2 db 3
      result db 0
  
  section .text
      global _start
  
  _start:
      mov al, [num1]
      add al, [num2]
      mov [result], al
      int 0x80`,
      description: "Código ASM para sumar dos números y almacenar el resultado.",
    },
    {
      id: 2,
      category: "manipulacion-registros",
      title: "Intercambio de registros",
      code: `section .text
      global _start
  
  _start:
      mov eax, 10
      mov ebx, 20
      xchg eax, ebx`,
      description: "Código ASM para intercambiar los valores de dos registros.",
    },
  ];
  
  export default asmCodes;