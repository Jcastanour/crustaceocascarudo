export const esPlankton = (texto: string): boolean => {
  if (!texto) return false;

  //  Convertimos a minúsculas y eliminamos caracteres extraños
  const normalizado = texto.toLowerCase().replace(/[^a-z0-9]/g, ""); // Elimina caracteres especiales

  // No puede poner algo como plaaaankton
  const regex = /(p+|p.*)l+a*n+k+t+o*n+/;

  // 🔹 Lista de variantes sospechosas
  const variantes = [
    "plankton",
    "plancton",
    "planton",
    "pl4nkton",
    "pl4ncton",
    "p1ankton",
    "p1ancton",
    "p1ant0n",
    "pl4nk7on",
    "pl4nkt0n",
    "p1@nkton",
    "pl4nkt0n",
    "p1@nk7on",
    "p!ankton",
    "pl4nkt0n",
    "p!ancton",
    "pl4nkt0n",
    "p!ant0n",
    "pl4nkt0n",
    "p!ank7on",
    "pl4nkt0n",
    "p1@nkton",
    "pl4nkt0n",
    "p1@ncton",
    "pl4nkt0n",
    "plank",
  ];

  // Revisamos si el texto normalizado contiene alguna variante
  return (
    variantes.some((v) => normalizado.includes(v)) || regex.test(normalizado)
  );
};
