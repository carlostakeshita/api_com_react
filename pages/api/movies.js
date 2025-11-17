

const movies = [
  {
    id: '1',
    title: 'Cidade de Deus',
    year: 2002,
    director: 'Fernando Meirelles, Kátia Lund',
    description: 'Retrata a expansão do crime organizado na Cidade de Deus, bairro do Rio de Janeiro, entre o final dos anos 1960 e início dos anos 1980.'
  },
  {
    id: '2',
    title: 'O Auto da Compadecida',
    year: 2000,
    director: 'Guel Arraes',
    description: 'A saga bem-humorada de dois amigos nordestinos que se envolvem em confusões para sobreviver.'
  },
  {
    id: '3',
    title: 'Central do Brasil',
    year: 1998,
    director: 'Walter Salles',
    description: 'Uma professora aposentada que escreve cartas para pessoas analfabetas e a jornada que vive com um menino em busca do pai.'
  }
];

export default function handler(req, res) {

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json(movies);
}
