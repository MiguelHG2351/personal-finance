## Features

Transactions: La lista de transacciones, no puede ser cero, puede ser negativo (Solo si es pago recurrente)

- Checkbox, porque no todos son pago recurrente
- Iconos -> data.json del zip
- Las transacciones no registran pots
- Cada transacción tiene categoría
- La transacción solo puede estar en un budget
- Hay que seleccionar un budget en la transacción

Budget: Grupo de transacciones

- Relación con las transacciones
- No conectados a los Pots
- Registran pagos recuerrents y no recurrents
- Cada Budget se le puede asignar una categoría de una colección categorías

---

Pots: Similar a una feature de ahorros, permite crear un grupo -> se puede agregar o retirar

- Withdraw: Puedes retirar dinero 
- Add money: puedes agregar pero es una update, no un registro

Recurring bills: Es un simple filtro, obtiene las transacciones de todos los budgets y los muestra en una tabla simple

- Transacciones con fechas de recurrencia aparecen en Recurring Bills
- Solo las transacciones con fecha > al dia actual aparecen


## Base de datos

