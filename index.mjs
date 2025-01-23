require('dotenv').config();
import { get } from 'axios';
import { MongoClient } from 'mongodb';

// Configura las variables
const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = 'wakatime';
const COLLECTION_NAME = 'dailyStats';

// Función para obtener datos de WakaTime
async function fetchWakaTimeData() {
  const response = await fetch('https://wakatime.com/api/v1/users/current/summaries?range=last_7_days', {
    headers: { Authorization: `Bearer ${process.env.WAKATIME_API_KEY}` },
  });
  if (!response.ok) {
    throw new Error(`Error al obtener datos de WakaTime: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data.map((day) => ({
    date: day.range.date,
    coding_time: day.grand_total.total_seconds / 3600, // Convertir segundos a horas
    languages: day.languages,
    projects: day.projects,
  }));
}

// Script principal
(async () => {
  try {
    const wakaData = await fetchWakaTimeData();
    await saveWakaTimeData(wakaData);
  } catch (error) {
    console.error('Error en el script:', error);
  }
})();