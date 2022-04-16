import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import './App.css';
import { MdDownload, MdUpload } from "react-icons/md";
import { LeftSideBar } from './components/LeftSideBar';
import { downloadDatabases, setupGlobalDatabases, uploadDatabases, DictionaryEntry } from './util/db';
import CircularButton from './components/CircularButton';

export const SelectedWordContext: React.Context<any> = createContext(undefined);

const mostUsedWords = `als Ik zijn dat hij was voor op zijn met ze zijn bij een hebben deze van door heet woord maar wat sommige is het u of had de van aan en een in we kan uit andere waren die doen hun tijd indien zal hoe zei een elk vertellen doet set drie willen lucht goed ook spelen klein end zetten thuis lezen de hand poort grote spell toevoegen zelfs land hier moet grote hoog dergelijke volgen act waarom vragen mannen verandering ging licht soort uitgeschakeld nodig hebben huis afbeelding proberen ons weer dier punt moeder wereld dichtbij bouwen zelf aarde vader een
nieuwe werk deel nemen krijgen plaats gemaakt wonen waar na terug weinig alleen ronde man jaar kwam Show elke goed mij geven onze onder naam zeer door gewoon vorm zin grote denken zeggen helpen laag lijn verschillen beurt oorzaak veel betekenen voor verhuizing rechts jongen oude ook hetzelfde ze alle er wanneer omhoog gebruiken uw manier over veel dan hen schrijven zou zoals dus deze haar lang maken ding zien hem twee heeft kijken meer dag kon gaan komen deed aantal klinken geen meest mensen mijn meer dan weten water dan roep eerste die kan naar beneden kant geweest nu vinden hoofd staan
eigen pagina moeten land gevonden antwoord de school groeien studie nog leren planten afdekking voedsel zon vier tussen staat houden oog nooit laatste laten gedachte stad boom oversteken boerderij hard begin zou verhaal zaag ver zee tekenen links laat lopen niet terwijl pers dicht nacht echt leven weinig noorden boek dragen nam wetenschap eet kamer vriend begon idee vis berg stop eenmaal base hear paard gesneden zeker kijken kleur gezicht hout belangrijkste geopend lijken samen volgende wit kinderen beginnen kreeg lopen voorbeeld gemak papier groep altijd muziek die beide mark vaak brief tot mijl rivier auto voeten zorg tweede genoeg vlakte meisje
gebruikelijke jonge klaar boven ooit rood lijst hoewel voelen Overleg vogel spoedig lichaam hond familie rechtstreeks pose vertrekken lied meten deur artikel zwart korte cijfer klasse wind vraag gebeuren compleet schip gebied helft rots orde brand zuiden probleem stuk vertelde wist passeren sinds boven geheel king straat inch vermenigvuldigen niets cursus blijven wiel volledige kracht blauw object beslissen oppervlak diepe maan eiland voet systeem drukke toets opnemen boot gemeenschappelijke goud mogelijk vliegtuig plaats droge afvragen lachen duizend geleden ran controleren spel vorm gelijk heet miss bracht warmte sneeuw band brengen ja verre vullen oosten schilderen taal onder eenheid kracht stad fijne
bepaalde vliegen vallen leiden huilen donker apparaat noot wachten plannen figuur ster doos zelfstandig naamwoord veld rest juist in staat pond gedaan schoonheid rijden stond bevatten voorzijde leren week finale gaf groen oh snel ontwikkelen oceaan warme gratis minuut sterke speciaal geest achter duidelijk staart produceren feit ruimte gehoord best uur beter ware tijdens honderd vijf onthouden stap vroeg houden west grond rente bereiken snel werkwoord zingen luisteren zes tafel reizen minder ochtend tien eenvoudig verscheidene klinker in de richting van oorlog leggen tegen patroon langzaam centrum liefde persoon geld dienen verschijnen weg kaart regen regel regeren trek koude kennisgeving stem energie hunt waarschijnlijk bedden broer
ei rit cel geloven misschien pick plotseling tellen square reden lengte vertegenwoordigen kunst onderwerp regio grootte variëren vestigen spreken gewicht algemeen ijs aangelegenheid cirkel paar omvatten kloof lettergreep vilt grand bal nog wave laten vallen hart ben aanwezig zwaar dans motor positie arm breed zeil materiaal fractie bos zitten ras venster winkel zomer trein slaap bewijzen eenzame been oefening muur vangst berg wensen hemel boord vreugde de winter zat geschreven wild instrument gehouden glas gras koe werk edge teken bezoek verleden zachte lol heldere gas weer maand miljoen dragen afwerking happy hopen bloem kleden vreemd weg handel melodie reis kantoor ontvangen rij mond
exacte symbool sterven minste problemen schreeuw behalve schreef zaad toon toetreden tot suggereren schoon break dame yard stijgen slecht klap olie bloed aanraken groeide procent mengen team draad kosten verloren bruin dragen tuin gelijk verzonden kiezen viel passen stromen eerlijk bank verzamelen besparen controle decimaal oor anders heel brak geval midden doden zoon meer momenteel schaal luid voorjaar waarnemen kind straight medeklinker natie woordenboek melk snelheid methode orgel betalen leeftijd sectie kleding wolk verrassing rustig steen minuscuul klimmen koele ontwerp slechte veel experiment onderzijde sleutel ijzer enkelvoudige stok flat twintig huid glimlach vouw gat springen kindje acht dorp ontmoeten wortel kopen verhogen
op te lossen metalen of duw zeven paragraaf derde zal gehouden haar beschrijven kok vloer ofwel resultaat verbranden hill veilig kat eeuw overwegen soort wet beetje kust kopie zinsnede stil hoog zand bodem rol temperatuur vinger industrie waarde strijd leugen verslaan excite natuurlijke view sense hoofdstad zal niet stoel gevaar fruit rijk dikke soldaat proces werken praktijk apart moeilijk arts aub beschermen middag gewas moderne onderdeel hit leerling hoek partij levering wiens lokaliseren kookplaten karakter insecten gevangen periode geven radio In sprak atoom menselijk geschiedenis werking elektrische verwachten bot spoor stel bieden instemmen dus zachte vrouw kapitein denk noodzakelijk scherpe vleugel creëren buurman wassen vleermuis
eerder menigte maïs vergelijken gedicht koord bell afhangen vlees wrijven buis beroemde deas stroom angst zicht dun driehoek planeet haast chief kolonie klok de mijne stropdas voeren grote vers zoeken sturen geel pistool toelaten afdrukken dood plek woestijn pak huidige lift gestegen aankomen meester spoor ouder oever divisie blad stof gunst aansluiten post besteden akkoord vet blij origineel aandeel station dad brood rekenen behoorlijk bar aanbod segmenten slaaf eend onmiddellijke markt graad bevolken kuiken lieve vijand antwoorden drankje voorkomen ondersteuning spraak natuur reeks stoom beweging pad vloeistof aanmelden betekende quotiënt tanden schelp nek zuurstof suiker dood vrij vaardigheid vrouwen seizoen oplossing magneet
zilver dank tak wedstrijd achtervoegsel vooral vijg bang reusachtig zus staal bespreken vooruit gelijkaardige begeleiden ervaring partituur appel gekocht geleid toonhoogte coat massa kaart band touw slip win dromen avond voorwaarde voer gereedschap totaal elementaire geur dal noch dubbel zitje blijven blokkeren grafiek hoed verkopen succes bedrijf aftrekken evenement bijzonder deal zwemmen termijn tegengesteld vrouw schoen schouder spreiding regelen kamp uitvinden katoen geboren bepalen quart negen vrachtwagen geluidsoverlast niveau kans verzamelen winkel rekken gooien glans pand column molecuul selecteren mis grijs herhaal vereisen brede bereiden zout neus meervoud woede vordering werelddeel
`
export default function App() {
  const [text, _] = useState(mostUsedWords)
  const [selectedWord, setSelectedWord] = useState()

  useEffect(() => {
    setupGlobalDatabases()
  }, [])

  return (
    <SelectedWordContext.Provider value={[selectedWord, setSelectedWord]}>
      <Header />
      <div className="flex flex-row w-4/5">
        <Reader text={text} />
        <LeftSideBar />
      </div>
    </SelectedWordContext.Provider>
  );
}

type TranslationEntryState = DictionaryEntry | undefined
type TranslationEntrySetter = (e: TranslationEntryState) => TranslationEntryState
type SetSelectedTE = ((tes: TranslationEntrySetter) => void)

function Reader({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="flex flex-col gap-y-2 mx-auto max-w-lg text-xl">
      {lines.map((line, i) => <ReaderLine key={i} line={line} />)}
    </div>
  );
}

function ReaderLine({ line }: { line: string }) {
  const words = line.split(" ").filter(x => x !== "")
  return (
    <div className="flex flex-row flex-wrap gap-x-1">
      {words.map((word, i) => (
        <div key={i}> <ReaderWord word={word} /> </div>
      ))}
    </div>
  );
}

function ReaderWord({ word }: { word: string }) {
  const [selectedWord, setSelectedWord] = useContext(SelectedWordContext)
  return (
    <div className="bg-green-200 rounded border-2 border-transparent hover:border-green-400 hover:cursor-pointer"
      onClick={() => {
        setSelectedWord(() => word)
      }}
    >
      {word}
    </div>
  );
}

function DownloadDatabase() {
  return (
    <CircularButton onClick={() => {
      downloadDatabases()
    }}>
      <MdDownload />
    </CircularButton>
  )
}

function UploadDatabase() {
  return (
    <>
      <CircularButton onClick={() => {
      }}>
        <MdUpload />
      </CircularButton>
      <form>
        <input type="file" onChange={(e: any) => {
          const file = e.target.files[0]
          const reader = new FileReader();
          reader.onload = ({ target }: any) => {
            uploadDatabases(target.result)
          }
          reader.readAsText(file)
        }} />
      </form>
    </>
  )
}

function Header() {
  const [key, setKey] = useState(localStorage.getItem("apikey-lexicala") ?? "")
  const keyInputRef = useRef(null)
  useEffect(() => {
    localStorage.setItem("apikey-lexicala", key)
  }, [key])
  return (
    <div className="flex gap-5 items-center p-5 mb-4 h-16 bg-white shadow-lg w-100">
      <input className="border-2"
        ref={keyInputRef}
        placeholder="Api Key"
        defaultValue={key}
        onChange={(event) => {
          localStorage.setItem("apikey-lexicala", event.currentTarget.value)
        }}
      />
      <DownloadDatabase />
      <UploadDatabase />
    </div>
  )
}
