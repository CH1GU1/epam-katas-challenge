# Tests: DictionaryChallenge

## Archivo destino
`src/components/challenges/DictionaryChallenge.test.tsx`

## Setup necesario
- Wrappear con QueryClientProvider en cada test
- MSW ya está configurado en src/test/mocks/server.ts

## Helper requerido
Crear un wrapper:
```typescript
const wrapper = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
)
```

## Tests a implementar (mínimo 5)

1. Renderiza los inputs y botones correctamente
   - Debe existir input de palabra, input de definición, botón "Agregar"
   - Debe existir input de búsqueda, botón "Buscar"

2. Agregar una palabra exitosamente
   - Llenar ambos inputs
   - Click en "Agregar"
   - Esperar feedback de éxito visible en pantalla

3. Buscar una palabra que existe
   - Escribir "Apple" en el input de búsqueda
   - Click en "Buscar"
   - Verificar que aparece la definición y badge verde (found: true)

4. Buscar una palabra que NO existe
   - Escribir "Banana" en el input de búsqueda
   - Click en "Buscar"
   - Verificar badge rojo o mensaje de "No encontrado"

5. Botón "Agregar" deshabilitado con inputs vacíos
   - Sin llenar inputs, el botón debe estar disabled