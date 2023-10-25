# STRIVE BLOGS - A backend project

## NOTE PROGETTO:
Sei responsabile della creazione di una WebAPI per l'applicazione Strive Blogs. Ti occuperai di creare e visualizzare gli autori e i post dei blog usando MongoDB.

### AUTORI
#### Struttura
<p>_id //generato da mongo,</p>
<p>nome //stringa,</p>
<p>cognome //stringa,</p>
<p>email //stringa,</p>
<p>data di nascita //stringa,</p>
<p>avatar //stringa</p>

#### Rotte
<p>GET /authors/ => ritorna la lista di autori</p>
<p>GET /authors/123 => ritorna il singolo autore</p>
<p>POST /authors => crea un nuovo autore</p>
<p>PUT /authors/123 => modifica l'autore con l'id associato</p>
<p>DELETE /authors/123 => cancella l'autore con l'id associato</p>


### BLOGPOSTS
#### Struttura
<p>_id //generato dal server,</p>
<p>category //catergoria del post,</p>
<p>title //titolo del post,</p>
<p>cover //link dell'immagine,</p>
<p>readTime : {</p>
    <p>     value //numero,</p>
    <p>     unit //unita di misura,</p>
<p>},</p>
<p>author: {</p>
    <p>     name //nome dell'autore,</p>
    <p>     avatar //immagine dell'autore,</p>
<p>},</p>
<p>content: //HTML dell'articolo</p>

#### Rotte
<p>GET /posts => ritorna una lista di blogposts</p>
<p>GET /posts/123 => ritorna un singolo blogpost</p>
<p>POST /posts => crea un nuovo blogpost</p>
<p>PUT /posts/123 => modifica il blogpost con l'id associato</p>
<p>DELETE /posts/123 => elimina il blogpost con l'id associato</p>


## TASKS:
- [✅]Creare le rotte (implementare GET, POST, PUT, DELETE per gli autori)
- [✅]Connettere il Front-end al Back-end (installando cors e importandolo con un import statement)
- [✅]Sviluppa le operazioni CRUD per i blog post. [✅] La persistenza dei dati dev'essere garantita dall'uso di MongoDB. Le query e i body dovranno essere validati.
- [✅]Fare la POST di un articolo dal form di aggiunta articolo
- [✅]Fare la fetch degli articoli presenti nel database e visualizzarli nella homepage
- [✅]GET /authors/:id/posts/ => ricevi tutti i blog post di uno specifico autore dal corrispondente ID
- [✅]GET /posts?title=whatever => filtra i blog post e ricevi l'unico che corrisponda alla condizione di ricerca (es.: titolo contiene "whatever")
- [✅]Aggiungi la funzionalità di ricerca dei post nel frontend
- [✅]ENDPOINTS:
    - [✅]GET /posts/:id/comments => ritorna tutti i commenti di uno specifico post
    - [✅]GET /posts/:id/comments/:commentdId => ritorna un commento specifico di un post specifico
    - [✅]POST /posts/:id => aggiungi un nuovo commento ad un post specifico
    - [✅]DELETE /posts/:id/comment/:commentdId => elimina un commento specifico da un post specifico
    - []PUT /posts/:id/comment/:commentdId => cambia un commento di un post specifico
- []UPLOAD DI IMMAGINI, il backend dovrebbe includere queste nuove routes:
    - []PATCH /authors/:authorId/avatar, carica un immagine per l'autore specificato e salva l'URL creata da cloudinary nei database
    - []PATCH /posts/:blogPostId/cover, carica un'immagine per il post specificato dall'id. Salva l'URL creato da cloudinary nel post corrispondente
    - []Invia un email all'autore quando pubblica un nuovo blog post e quando un nuovo autore si registra sulla piattaforma 
- []GESTIONE DEGLI ACCESSI:
    - []Aggiungi la Token Based Authentication al tuo progetto precedente
    - []Tutti gli endpoint (tranne /login) devono essere accessibili solo tramite token
    - []Collega il tuo API al frontend
        - []Crea le pagine di registrazione e login per il progetto
          ]  - []Dopo un login effettuato con successo, memorizza il token di accesso nel localStorage e redireziona l'utente alla homepage
            - []Usa il token ovunque sia necessario
    - []Inserisci i seguenti endpoint:
        - []GET /login => restituisce token di accesso
        - []GET /me => restituisce l'utente collegato al token di accesso
        - []modifica POST /authors => deve creare un nuovo utente valido
    - []Aggiungi OAuth al progetto. Usa la giusta Passport strategy per connettere google al tuo backend.
    - []Abilita il login con google nella tua applicazione, creando gli endpoint necessari.
    - []Integra ovunque lo standard JWT
    - []Aggiungi il pulsante per il login con Google nell'applicazione