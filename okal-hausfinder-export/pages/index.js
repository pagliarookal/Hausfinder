import { useState } from 'react';

const houses = [
  { name: "Stadtvilla 23", type: "Stadtvilla", area: 203.81, rooms: 6, roof: "Walmdach", einlieger: false },
  { name: "Design 16", type: "Designhaus", area: 167.48, rooms: 6, roof: "Satteldach", einlieger: false },
  { name: "Bungalow 4", type: "Bungalow", area: 168.22, rooms: 6, roof: "Flachdach", einlieger: true },
  { name: "Stadtvilla 16", type: "Stadtvilla", area: 186.54, rooms: 6, roof: "Walmdach", einlieger: false },
  { name: "Bungalow 2", type: "Bungalow", area: 118.24, rooms: 4, roof: "Walmdach", einlieger: false }
];

export default function Home() {
  const [text, setText] = useState('');
  const [matches, setMatches] = useState([]);

  function extractValues(text) {
    const wohnfläche = parseFloat(text.match(/Wohnfl.*?:\s*(\d+)/)?.[1] || 0);
    const zimmer = parseInt(text.match(/Zimmer.*?:\s*(\d+)/)?.[1] || 0);
    const einlieger = /Einliegerwohnung.*?([✓xX]|ja)/i.test(text);
    const haustyp = /Stadtvilla/.test(text)
      ? "Stadtvilla"
      : /Bungalow/.test(text)
      ? "Bungalow"
      : /Design|Einfamilienhaus/.test(text)
      ? "Designhaus"
      : "";
    const dachform = /Walmdach/.test(text)
      ? "Walmdach"
      : /Satteldach/.test(text)
      ? "Satteldach"
      : /Flachdach/.test(text)
      ? "Flachdach"
      : "";

    const gefiltert = houses.filter(
      (haus) =>
        haus.area >= wohnfläche &&
        haus.rooms >= zimmer &&
        (!einlieger || haus.einlieger === true) &&
        (!haustyp || haus.type === haustyp) &&
        (!dachform || haus.roof === dachform)
    );
    return gefiltert;
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    setMatches(extractValues(value));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>OKAL Hausfinder</h1>
      <textarea rows="10" cols="80" value={text} onChange={handleChange} placeholder="Text hier einfügen" />
      {matches.length > 0 && (
        <div>
          <h2>Passende Häuser:</h2>
          <ul>
            {matches.map((haus, i) => (
              <li key={i}>
                <strong>{haus.name}</strong> – {haus.type}, {haus.area} m², {haus.rooms} Zimmer, {haus.roof}, Einliegerwohnung: {haus.einlieger ? "Ja" : "Nein"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}