'use client';

import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import GaugeChart from 'react-gauge-chart';
import { CSVLink } from "react-csv";


// Definizione dell'interfaccia per i dati storici
interface HistoricalDataPoint {
    date: string;
    humidity: number;
}

// Definizione dell'interfaccia per le props del componente
interface PlantHumidityWidgetProps {
    plantName: string;
    currentHumidity: number;
    historicalData: HistoricalDataPoint[];
}

const PlantHumidityWidget: React.FC<PlantHumidityWidgetProps> = ({ plantName, currentHumidity, historicalData }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    return (
        <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">{plantName}</h2>
            <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Umidità Attuale</h3>
                <GaugeChart
                    id={`humidity-gauge-${plantName}`}
                    nrOfLevels={3}
                    percent={currentHumidity / 100}
                    textColor="#000000"
                />
            </div>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Dati Storici</AccordionTrigger>
                    <AccordionContent>
                        <div className="mb-4">
                            <label htmlFor="rows-select" className="mr-2">Righe per pagina:</label>
                            <select
                                id="rows-select"
                                value={rowsPerPage}
                                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                                className="border rounded p-1"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr>
                                    <th className="border p-2">Data</th>
                                    <th className="border p-2">Umidità</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historicalData.slice(0, rowsPerPage).map((row, index) => (
                                    <tr key={index}>
                                        <td className="border p-2">{row.date}</td>
                                        <td className="border p-2">{row.humidity}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-4">
                            <CSVLink
                                data={historicalData}
                                filename={`${plantName}_humidity_data.csv`}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Esporta CSV
                            </CSVLink>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default PlantHumidityWidget;