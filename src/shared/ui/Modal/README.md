# Modal Component

Componente modal reutilizable con secciones de encabezado, contenido y pie de página.

## Características

- ✅ Secciones composables (Header, Content, Footer)
- ✅ Diferentes tamaños (sm, md, lg, xl)
- ✅ Cierre con ESC, backdrop o botón X
- ✅ Gestión automática de scroll del body
- ✅ Gestión de foco accesible
- ✅ Animaciones suaves
- ✅ Compatible con diseño del sistema

## Uso Básico

```tsx
import { Modal, ModalHeader, ModalContent, ModalFooter } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>
          <h2 className="text-xl font-bold text-[#201f24]">Título del Modal</h2>
        </ModalHeader>

        <ModalContent>
          <p className="text-[#696868]">
            Contenido del modal aquí...
          </p>
        </ModalContent>

        <ModalFooter>
          <Button variant="tertiary" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => handleSave()}>
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

## Props

### Modal

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controla si el modal está visible |
| `onClose` | `() => void` | - | Función llamada al cerrar el modal |
| `children` | `React.ReactNode` | - | Contenido del modal |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamaño del modal |
| `closeOnBackdrop` | `boolean` | `true` | Permite cerrar haciendo clic en el backdrop |
| `closeOnEsc` | `boolean` | `true` | Permite cerrar presionando ESC |
| `showCloseButton` | `boolean` | `true` | Muestra el botón X de cierre |

### ModalHeader, ModalContent, ModalFooter

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Contenido de la sección |
| `className` | `string` | `''` | Clases CSS adicionales |

## Ejemplos

### Modal de Confirmación

```tsx
<Modal isOpen={isOpen} onClose={onClose} size="sm">
  <ModalHeader>
    <h2 className="text-xl font-bold text-[#201f24]">¿Confirmar acción?</h2>
  </ModalHeader>

  <ModalContent>
    <p className="text-[#696868]">
      Esta acción no se puede deshacer.
    </p>
  </ModalContent>

  <ModalFooter>
    <Button variant="tertiary" onClick={onClose}>
      Cancelar
    </Button>
    <Button variant="destroy" onClick={handleConfirm}>
      Confirmar
    </Button>
  </ModalFooter>
</Modal>
```

### Modal sin Pie de Página

```tsx
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalHeader>
    <h2 className="text-xl font-bold text-[#201f24]">Información</h2>
  </ModalHeader>

  <ModalContent>
    <p className="text-[#696868]">
      Solo contenido informativo.
    </p>
  </ModalContent>
</Modal>
```

### Modal Complejo con Formulario

```tsx
<Modal 
  isOpen={isOpen} 
  onClose={onClose} 
  size="lg"
  closeOnBackdrop={false}
>
  <ModalHeader>
    <h2 className="text-xl font-bold text-[#201f24]">Agregar Transacción</h2>
    <p className="text-sm text-[#696868] mt-1">
      Completa todos los campos requeridos
    </p>
  </ModalHeader>

  <ModalContent>
    <form className="space-y-4">
      {/* Campos del formulario */}
    </form>
  </ModalContent>

  <ModalFooter>
    <Button variant="tertiary" onClick={onClose}>
      Cancelar
    </Button>
    <Button type="submit">
      Guardar Transacción
    </Button>
  </ModalFooter>
</Modal>
```

## Accesibilidad

- **Focus Trap**: El foco se mantiene dentro del modal mientras está abierto
- **Restauración de Foco**: Al cerrar, el foco regresa al elemento que abrió el modal
- **ESC Key**: Presionar ESC cierra el modal (configurable)
- **ARIA Attributes**: Usa `role="dialog"` y `aria-modal="true"`
- **Body Scroll**: Previene el scroll del body cuando el modal está abierto

## Colores del Sistema

- **Texto principal**: #201f24 (grey-900)
- **Texto secundario**: #696868 (grey-500)
- **Bordes**: #98908b (beige-500)
- **Fondo**: white
- **Backdrop**: black/50 con blur
