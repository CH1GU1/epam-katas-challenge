# Tests: NthLetterChallenge

## Archivo destino
`src/components/challenges/NthLetterChallenge.test.tsx`

## Tests a implementar (mínimo 5)

1. Renderiza las palabras por defecto
   - Los inputs deben tener: "yoda", "best", "has"

2. Descifrar con palabras por defecto
   - Click en "Descifrar"
   - Esperar que aparezca "yes" como resultado

3. Muestra el breakdown correctamente
   - Tras descifrar, verificar que aparece "y", "e", "s" en el DOM

4. Añadir una nueva palabra
   - Click en botón "+"
   - Debe aparecer un nuevo input vacío

5. No se puede eliminar si solo hay una palabra
   - Eliminar hasta dejar una sola palabra
   - El botón "×" debe estar disabled o no existir

6. Resultado se limpia al editar las palabras
   - Descifrar primero
   - Editar cualquier input
   - El resultado debe desaparecer