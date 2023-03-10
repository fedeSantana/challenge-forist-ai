# En este diario iré poniendo los retos y desafíos que enfrento cada día

La idea es que puedan entender la forma en la que trabajo, si sólo ven el resultado final e inicial es una caja negra que se completa con la entrevista, pero este jugoso diario ira escribiendo no sólo para ustedes, sino para mí, los retos que tuve que afrontar día a día y mi forma de confrontar un challenge así. ¡empecemos!

# Comienzo

Llegó el mail y leí atentamente el challenge, me pareció sumamente divertido y cómo era algo un poco infantil y de una serie animada, decidí tomarme la libertad de hacer cosas cómo este diario para afrontar el problema de explicar todo lo que hago, sí, me gustaron especialmente 3 puntos del challenge:

1. Es un juego, soy retrogamer y me encanta todo lo que es game design.
2. Tiene varias oportunidades de mejorar el diseño (no tiene versión mobile por ejemplo), cosa que siempre me parece divertida de hacer
3. Es de Rick & Morty.
4. Es un juego que bien hecho, pueden jugar usuarios de lectores de pantalla (aunque es un reto grande hacer la app accesible)

Dado todo eso, me pongo en la fase uno, research de juegos similares.

## Research

![image](https://user-images.githubusercontent.com/54949334/222897763-9d522863-786d-4545-b316-1fc72c0d2e9a.png)
![image](https://user-images.githubusercontent.com/54949334/222897772-5c48a8d3-4712-47a9-8432-9ec331c8f2c8.png)
![image](https://user-images.githubusercontent.com/54949334/222897805-e023f3dd-f729-4599-90d4-8ebf9dc8adc6.png)

Datos que saque del research:

1. Algunas apps mezclan las cartas frente a vos, eso me parece algo interesante y lindo, tanto por el reto a nivel programación de hacerlo realmente como que se ve bien.
2. Todos tienen efectos 3D que en general dejan mucho que desear y parecen hechos con la idea de verse muy copados.
3. En general, no se necesitan instrucciones.
4. Un sonido cada vez que encontras un par y cada vez que no lo encontras dando feedback
5. Casi nadie tiene feedback de cuantas cartas vas.
6. Casi siempre la carta desaparece mágicamente, lo cual esta bien, pero barajo la idea de que vaya a un maso de cartas logradas.

## Scope y cosas que se podrían agregar

1. Niveles
2. que las cartas se barajen
3. que las cartas terminen en un maso
4. Que la partida se guarde, junto al score, por si das F5.
5. Colores de fondo de las cartas muy reconocibles para que no sea sólo el personaje y ayude a los niños más pequeños
6. Pantalla de inicio

## Research de diseño

Con todos los juegos que busqué más buscando ideas en dribble, voy a proponer unas mejoras del diseño que permitan mejorar la experiencia del juego, la UI|UX o personalizar un poco el estilo de la app, los resultados que encontre de otros juegos y diseños en general no terminaban de convencerme o aportarme algo nuevo, así que decidí buscar en un área que tiene mucha más experiencia y es más amplia en este sentido: videojuegos de cartas.

Ahí encontre ideas muy interesantes respecto a los estilos posibles, especialmente de la UI, videojuegos realmente hermosos con propuestas muy interesantes.

Y videojuegos con la misma jugabilidad pero con un apartado artístico que deja bastante que desear como:

https://store.steampowered.com/app/1766180/Cards_Matching_Memory_Game/
https://store.steampowered.com/app/1600280/Cute_Animals_Memory_Card_Game/
https://store.steampowered.com/app/2073750/memory__El_juego_original_de_parejas_de_Ravensburger/

Pueden ver el research del diseño acá: https://www.figma.com/file/NmJ7gd1zD71mzgHr0zbVP4/Rick%26Morty-Challenge?node-id=0%3A1&t=hDLkR8G2lmy4agid-1

## Diseño

Me gusta crear diseños. Siempre digo que no sólo sé manejar figma, me gusta diseñar, con la inmensidad que esa palabra abarca, siendo así y terminado el research, queria empezar esa tarea. Pero lámentablemente, sólo tuve uno/dos días para resolver el challenge así que tuve que esforzarme en el código

## Código

A partir de acá, lo primero que hago es conseguir hacer un pedido con GraphQL y typescript, la primera vez es bastante difícil que funcione, pero una vez anda una vez pasa a ser todo muy cómodo y sencillo, me descargo los 6 primeros personajes para poder empezar a jugar con el juego y hago los estilos básicos, siendo el cuadro amarillo un _children_ de una vista padre con el logo del juego y el fondo azul.

Un detalle de esta parte es que decidí que los params de la card usen directamente la interfaz importada de graphQL, para que si algún día cambia la api se rompa de forma conjunta y facilitar hacer el cambio, para eso utilice Pick de TS:

![image](https://user-images.githubusercontent.com/54949334/223509186-9bfb617e-71b1-42a3-9da3-f7606b7d4030.png)

Utilicé React-Query lo cual fue, en principio, un poco innecesario o overscope porque toda la sección de guardar en caché no es necesaria en este juego, pero aún así es una libreria con la que empatizo y me es cómoda para manejar las llamadas. 

Utilicé una función Shuffle y deje un any, en parte porque _esta bien puesto_ y no es un error (infiere el tipo automaticamente del array que le pasas), pero por otro lado a modo de broma porque en la entrevista mencione que iba a dejar un any oculto en alguna parte del código, pensé, de dejar algo así, mejor dejarlo en un lugar donde este _bien_

![image](https://user-images.githubusercontent.com/54949334/224317070-56d89ef5-3e8b-4547-9bb2-2baa6ef68d37.png)

De todas las funciones que copie ajenas como esta puse la fuente para que se pueda consultar con Jsdocs para que si algún día hay un problema se entienda de dónde salió. 

Lámentablemente no llegue con los estados de cargando a mostrar algo más lindo que un cartel:

![image](https://user-images.githubusercontent.com/54949334/224317262-61c1da3e-515c-4af5-9659-b1950a873440.png)


En general hago skeletons dedicados para estos casos, pero el tiempo apremia.

La vista de celular deja mucho que desear, de nuevo, porque el tiempo apremiaba y sólo logre terminar las funcionalidades:

![image](https://user-images.githubusercontent.com/54949334/224317413-8df96a41-dd8d-4f76-91c8-2f40dadd8a1a.png)

## Reto de código, el juego controla la carta o la carta controla el juego?

A la hora de manejar estado en React tenemos que tener muy en claro qué queremos hacer. Es mejor tener tiempo, planificar y revisar. En este caso las condiciones del juego tienen cosas interesantes y complicadas, entre ellas:
1. Las mutaciones del estado tienen un delay de 1 segundo, es decir, entre que das vuelta dos cartas y se ocultan pasa 1 segundo, ya sea para que matcheen como para que no.
2. No se puede modificar el estado cuando una jugada esta siendo realizada, es decir hay que poner en frozen de alguna forma el resto de las cartas.

Para eso yo decidí que el juego controla las cartas y las cartas sólo se controlan si se quieren 'mostrar' por si mismas. 
Un useEffect, complicado, verá si esta sucediendo una jugada (dos cartas dadas vuelta) y frezará todas las demás cartas y actualizará el estado, desvaneciendolas o ocultandolas nuevamente de acuerdo a si el usuario atinó o no.

## Cosas a mejorar

Si tengo más tiempo me encargaré de:
1. Hacer test con Cypress
2. Mejorar el CSS para que ande en celular
3. Simplificar el código, sobretodo el useEffect
4. Que los botones se vean bien

Luego extras si sobra el tiempo:
5. Algunas animaciones
6. Añadir niveles
7. Añadir dificultad y que se pueda jugar con más cartas
8. Podes escoger personajes
9. Hacer cartas especiales que desordenen las cartas o creen nuevas


