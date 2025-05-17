// utils/sendCommand.ts
export async function sendCommand(command: string) {
    const res = await fetch('http://192.168.8.103:5000/send-command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command }),
    });
  
    const data = await res.json();
    return data;
  }
  