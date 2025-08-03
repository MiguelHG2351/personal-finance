# TransactionTable Component

Un componente de tabla reutilizable para mostrar transacciones financieras con funcionalidades de búsqueda, filtrado, ordenamiento y paginación.

## Características

- ✅ **Búsqueda**: Buscar transacciones por cualquier campo
- ✅ **Filtros**: Filtrar por categoría y otros campos personalizables
- ✅ **Ordenamiento**: Ordenar por fecha, monto, categoría, etc.
- ✅ **Paginación**: Navegación por páginas con controles intuitivos
- ✅ **Responsive**: Diseño adaptable a diferentes tamaños de pantalla
- ✅ **Accesible**: Componente accesible con soporte para lectores de pantalla
- ✅ **Personalizable**: Fácil de personalizar y extender

## Uso Básico

```tsx
import { TransactionTable, Transaction } from '@/widgets/TransactionTable';

const transactions: Transaction[] = [
  {
    id: '1',
    recipient: 'Emma Richardson',
    avatar: 'https://example.com/avatar.jpg',
    category: 'General',
    date: '19 Aug 2024',
    amount: 75.50,
    type: 'income',
  },
  // ... más transacciones
];

function MyComponent() {
  const handleTransactionClick = (transaction: Transaction) => {
    console.log('Transacción seleccionada:', transaction);
  };

  return (
    <TransactionTable
      transactions={transactions}
      onTransactionClick={handleTransactionClick}
    />
  );
}
```

## Props

### TransactionTable

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `transactions` | `Transaction[]` | ✅ | Array de transacciones a mostrar |
| `className` | `string` | ❌ | Clases CSS adicionales |
| `onTransactionClick` | `(transaction: Transaction) => void` | ❌ | Callback cuando se hace clic en una transacción |

### Transaction Interface

```tsx
interface Transaction {
  id: string;
  recipient: string;    // Nombre del destinatario/remitente
  avatar: string;       // URL del avatar
  category: string;     // Categoría de la transacción
  date: string;         // Fecha en formato legible
  amount: number;       // Monto de la transacción
  type: 'income' | 'expense'; // Tipo de transacción
}
```

## Componente Base Table

El `TransactionTable` está construido sobre un componente `Table` más genérico que puedes usar para otras tablas:

```tsx
import { Table, TableColumn } from '@/shared/ui/Table';

const columns: TableColumn<MyDataType>[] = [
  {
    key: 'name',
    header: 'Nombre',
    sortable: true,
  },
  {
    key: 'email',
    header: 'Email',
    render: (value) => <a href={`mailto:${value}`}>{value}</a>,
  },
];

<Table
  data={myData}
  columns={columns}
  searchable={true}
  pagination={true}
  itemsPerPage={10}
/>
```

## Personalización

### Estilos

El componente usa Tailwind CSS con los colores del sistema de diseño:

- `#201f24` - Texto principal (grey-900)
- `#696868` - Texto secundario (grey-500)
- `#98908b` - Texto terciario y bordes (beige-500)
- `#277c78` - Verde para ingresos
- `#f8f4f0` - Fondo beige (beige-100)
- `#ffffff` - Fondo blanco

### Categorías

Las categorías disponibles por defecto son:
- General
- Dining Out
- Groceries
- Entertainment

Puedes personalizar las categorías modificando el array `filters` en el componente.

## Arquitectura

El componente sigue la arquitectura Feature Sliced Design (FSD):

```
src/
├── shared/ui/Table/           # Componente base reutilizable
│   ├── Table.tsx
│   └── index.ts
└── widgets/TransactionTable/  # Widget específico para transacciones
    ├── ui/
    │   ├── TransactionTable.tsx
    │   ├── TransactionTableExample.tsx
    │   └── README.md
    └── index.ts
```

## Ejemplo Completo

Consulta `TransactionTableExample.tsx` para ver un ejemplo completo con datos de muestra que replica exactamente el diseño de Figma.

## Integración

Para integrar el componente en tu aplicación:

1. Importa el componente:
```tsx
import { TransactionTable } from '@/widgets/TransactionTable';
```

2. Prepara tus datos en el formato `Transaction[]`

3. Usa el componente con tus datos

4. Opcionalmente, maneja el evento `onTransactionClick` para navegación o acciones adicionales
