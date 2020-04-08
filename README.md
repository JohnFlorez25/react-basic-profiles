## Hooks

Las funciones no tienen un estado propio que manejar como ciclos de vida a los que deben suscribirse, mientras tanto las clases sí cuentan con ello.

React tiene un feature llamado Hooks que permite que las funciones también tengan features que solamente tienen las clases.

Hooks: Permiten a los componentes funcionales tener características que solo las clases tienen:

useState: Para manejo de estado.
useEffect: Para suscribir el componente a su ciclo de vida.
useReducer: Ejecutar un efecto basado en una acción.
Custom Hooks: Usamos los hooks fundamentales para crear nuevos hooks custom. Estos hooks irán en su propia función y su nombre comenzará con la palabra use. Otra de sus características es que no pueden ser ejecutados condicionalmente (if).

useState regresa un arreglo de dos argumentos.