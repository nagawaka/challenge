const list = [
  {
  "ID": 1,
    "description": "Importação de arquivos de fundos",
    "date_end": "2019-11-10 12:00:00",
    "estimate": 2,
  }, {
    "ID": 2,
    "description": "Importação de dados da Base Legada",
    "date_end": "2019-11-11 12:00:00",
    "estimate": 4,
  }, {
    "ID": 3,
    "description": "Importação de dados de integração",
    "date_end": "2019-11-11 08:00:00",
    "estimate": 6,
  },
]

const from = new Date("2019-11-10 09:00:00");
const to = new Date("2019-11-11 12:00:00");

const filter = (item) => {
  return (item.date_end > from && item.date_end <= to) ? true : false;
}

const result = list.map((job) => {
  return {
    ...job,
    date_end: new Date(job.date_end)
  }
}).filter(filter);
console.log(result);

document.querySelector("#debug").innerHTML = "output";