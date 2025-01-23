import { createClient } from '@supabase/supabase-js';

// Configurar cliente de Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export async function saveWakaTimeData(wakaData) {
  const { error } = await supabase.from('wakatime_history').insert(wakaData);
  if (error) {
    console.error('Error al insertar datos en Supabase:', error);
    throw error;
  }
  console.log('Datos insertados correctamente en Supabase');
}