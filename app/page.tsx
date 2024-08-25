import PlantHumidityWidget from "@/components/PlantUHumidityWidget";
import Image from "next/image";

// Se stai usando TypeScript, puoi definire il tipo dei dati delle piante
type PlantData = {
  plantName: string;
  currentHumidity: number;
  historicalData: { date: string; humidity: number }[];
};

export default function Home() {
  const plantsData: PlantData[] = [
    {
      plantName: 'Rosa',
      currentHumidity: 65,
      historicalData: [
        { date: '2024-08-22', humidity: 63 },
        { date: '2024-08-23', humidity: 65 },
        { date: '2024-08-24', humidity: 64 },
      ]
    },
    {
      plantName: 'Girasole',
      currentHumidity: 55,
      historicalData: [
        { date: '2024-08-22', humidity: 54 },
        { date: '2024-08-23', humidity: 55 },
        { date: '2024-08-24', humidity: 56 },
      ]
    },
    // Puoi aggiungere altre piante qui
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4">
        <h1 className="title border rounded-lg text-3xl font-bold mb-10">Dashboard Umidità Piante</h1>
        {plantsData.map((plant, index) => (
          <div data-key={plant.plantName} className="dashboard-row border rounded-lg  mb-6">
            <div className="container plant-section">
              <img className="plant-picture" src="https://imgix.be.green/63871a909af0d340974905.jpg"></img>
              <div>
              <h1>Lorem ipum pianta piantina secca no</h1>

              </div>
            </div>
            <div className="container gauges-margin">
              <PlantHumidityWidget
                key={index}
                plantName={plant.plantName}
                currentHumidity={plant.currentHumidity}
                historicalData={plant.historicalData}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
