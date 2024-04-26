import Link from "next/link";

const TermCondiction = () => {
  return (
    <div className="terms-container ">
      <h1>Termini e Condizioni</h1>
      <nav className="terms-nav">
        <ul>
          <li>
            <Link className="text-primary" href="#introduction">
              Introduzione
            </Link>
          </li>
          <li>
            <Link className="text-primary" href="#serviceDescription">
              Descrizione del Servizio
            </Link>
          </li>
          <li>
            <Link className="text-primary" href="#intellectualProperty">
              Proprietà Intellettuale
            </Link>
          </li>
          <li>
            <Link className="text-primary" href="#privacy">
              Privacy e Dati Personali
            </Link>
          </li>
          <li>
            <Link className="text-primary" href="#serviceUse">
              Utilizzo del Servizio
            </Link>
          </li>
          <li>
            <Link className="text-primary" href="#liability">
              Limitazione di Responsabilità
            </Link>
          </li>
          <li>
            <Link className="text-primary" href="#changes">
              Modifiche ai Termini
            </Link>
          </li>
          <li>
            <Link className="text-primary" href="#law">
              Legge Applicabile
            </Link>
          </li>
          <li>
            <Link className="text-primary" href="#contact">
              Contatti
            </Link>
          </li>
        </ul>
      </nav>
      <section id="introduction">
        <h2>1. Introduzione</h2>
        <p>
          Benvenuti a Dorida Solution e DoridaSolution Music, offerti da Davide
          Marchica, Dorin Ciofalo e Rino Ciofalo. Questi Termini e Condizioni
          regolano l'accesso e l'utilizzo dei nostri servizi disponibili
          attraverso il sito web www.doridasolution.com.
        </p>
      </section>
      <section id="serviceDescription">
        <h2>2. Accettazione dei Termini</h2>
        <p>
          Utilizzando i nostri servizi, l'utente accetta di essere vincolato da
          questi Termini e Condizioni, comprese tutte le politiche aggiuntive e
          le future modifiche che possono essere pubblicate sul sito o
          comunicate agli utenti.
        </p>
      </section>
      <section id="intellectualProperty">
        <h2>3. Descrizione del Servizio</h2>
        <p>
          Dorida Solution offre servizi di marketing digitale, mentre
          DoridaSolution Music permette agli utenti di caricare e condividere
          contenuti musicali. Gli utenti sono responsabili per il rispetto dei
          diritti di proprietà intellettuale e delle leggi relative ai diritti
          d'autore.
        </p>
      </section>
      <section id="privacy">
        <h2>4. Proprietà Intellettuale</h2>
        <p>
          Il codice, il design e gli elementi grafici di Dorida Solution e
          DoridaSolution Music sono protetti dalle leggi sul diritto d'autore e
          altre leggi sulla proprietà intellettuale. Davide Marchica detiene i
          diritti d'autore sul codice originale del sito web. Tutti i diritti
          non espressamente concessi in questi termini sono riservati. Gli
          utenti possono caricare contenuti musicali di cui detengono i diritti
          o per i quali hanno ottenuto il permesso necessario. Tali contenuti
          rimangono di proprietà degli utenti, ma caricandoli, gli utenti
          concedono a Dorida Solution una licenza non esclusiva, trasferibile,
          sottolicenziabile, senza royalties, valida a livello globale, per
          utilizzare, riprodurre, distribuire, preparare opere derivate,
          visualizzare ed eseguire tali contenuti in relazione all'operato di
          Dorida Solution e DoridaSolution Music.
        </p>
      </section>
      <section id="serviceUse">
        <h2>5. Privacy e Protezione dei Dati Personali</h2>
        <p>
          In conformità con il Regolamento Generale sulla Protezione dei Dati
          (GDPR) dell'Unione Europea, la nostra Politica sulla Privacy descrive
          come raccogliamo, conserviamo e proteggiamo le informazioni personali
          degli utenti.
        </p>
      </section>
      <section id="liability">
        <h2>6. Utilizzo del Servizio</h2>
        <p>
          Gli utenti si impegnano a non utilizzare i servizi per scopi illegali
          o per violare i diritti di terze parti. L'utente accetta di non
          distribuire virus o altri codici malevoli e di non tentare di accedere
          in modo non autorizzato al sistema o ai dati altrui.
        </p>
      </section>
      <section id="changes">
        <h2>7. Limitazione di Responsabilità</h2>
        <p>
          Dorida Solution non sarà responsabile per danni diretti o indiretti
          derivanti dall'uso dei servizi, inclusi, ma non limitati a, perdite
          economiche, perdita di dati o interruzioni dell'attività. Questa
          limitazione di responsabilità si applica nella misura massima
          consentita dalla legge.
        </p>
      </section>
      <section id="law">
        <h2>8. Modifiche ai Termini</h2>
        <p>
          Dorida Solution si riserva il diritto di modificare questi termini in
          qualsiasi momento. È responsabilità dell'utente rivedere regolarmente
          i termini per eventuali modifiche. L'uso continuato dei servizi dopo
          tali modifiche costituirà accettazione dei nuovi termini.
        </p>
      </section>
      <section id="contact">
        <h2>9. Legislazione Applicabile e Foro Competente</h2>
        <p>
          Questi termini saranno regolati e interpretati secondo le leggi
          italiane. Qualsiasi controversia legale che potrebbe sorgere sarà
          trattata esclusivamente nei tribunali italiani.
        </p>
      </section>
      <section id="contact">
        <h2>10. Contatti</h2>
        <p>
          Per qualsiasi domanda relativa a questi Termini e Condizioni, si prega
          di contattare{" "}
          <Link className="text-black" href={"/About"}>
            Dorida Solution
          </Link>
        </p>
      </section>
      <footer>
        <p>Ultimo aggiornamento: 26/04/2024</p>
      </footer>
    </div>
  );
};
export default TermCondiction;
