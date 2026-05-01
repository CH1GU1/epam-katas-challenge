# Tests: ShoppingChallenge

## Archivo destino
`src/components/challenges/ShoppingChallenge.test.tsx`

## Tests a implementar (mínimo 5)

1. Renderiza los ítems del catálogo
   - Deben aparecer checkboxes para: socks, shoes, sweater, hat, gloves

2. Botón "Calcular" deshabilitado sin ítems seleccionados
   - Al inicio ningún checkbox está marcado
   - El botón debe estar disabled

3. Seleccionar ítems y calcular
   - Marcar "socks" y "shoes"
   - Click en "Calcular total"
   - Esperar que aparezca el total: 70.85

4. Muestra subtotal, tax y total correctamente
   - Tras calcular, verificar que los 3 valores están en el DOM

5. Slider cambia el valor del tax
   - Interactuar con el slider
   - El label de tax debe actualizarse reflejando el nuevo valor