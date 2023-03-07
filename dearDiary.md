# En este diario iré poniendo los retos  y desafíos que enfrento cada día

La idea es que puedan entender la forma en la que trabajo, si sólo ven el resultado final e inicial es una caja negra que se completa con la entrevista, pero este jugoso diario ira escribiendo no sólo para ustedes, sino para mí, los retos que tuve que afrontar día a día y mi forma de confrontar un challenge así. ¡empecemos!

# Día 0 

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

![image](https://user-images.githubusercontent.com/54949334/223269735-f8d7067f-0828-4377-9522-c8393bdaef39.png)

Y videojuegos con la misma jugabilidad pero con un apartado artístico que deja bastante que desear como:

https://store.steampowered.com/app/1766180/Cards_Matching_Memory_Game/
https://store.steampowered.com/app/1600280/Cute_Animals_Memory_Card_Game/
https://store.steampowered.com/app/2073750/memory__El_juego_original_de_parejas_de_Ravensburger/

Pueden ver el research del diseño acá: https://www.figma.com/file/NmJ7gd1zD71mzgHr0zbVP4/Rick%26Morty-Challenge?node-id=0%3A1&t=hDLkR8G2lmy4agid-1

## Diseño

Me gusta crear diseños. Siempre digo que no sólo sé manejar figma, me gusta diseñar, con la inmensidad que esa palabra abarca, siendo así y terminado el research, empiezo a poner en ideas lo que quiero. 

1. Menu que te permite jugar, escoger la dificultad (cantidad de cartas), activar o desactivar el apartado musical. 

## Código

A partir de acá, lo primero que hago es conseguir hacer un pedido con GraphQL y typescript, la primera vez es bastante difícil que funcione, pero una vez anda una vez pasa a ser todo muy cómodo y sencillo, me descargo los 6 primeros personajes para poder empezar a jugar con el juego y hago los estilos básicos, siendo el cuadro amarillo un _children_ de una vista padre con el logo del juego y el fondo azul.

Un detalle de esta parte es que decidí que los params de la card usen directamente la interfaz importada de graphQL, para que si algún día cambia la api se rompa de forma conjunta y facilitar hacer el cambio, para eso utilice Pick de TS:

![image](https://user-images.githubusercontent.com/54949334/223509186-9bfb617e-71b1-42a3-9da3-f7606b7d4030.png)

