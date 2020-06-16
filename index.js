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
  // filters date_end inbetween two dates
  const date_end = new Date(item.date_end);
  return (date_end > from && date_end <= to) ? true : false;
}

const sort = (a, b) => new Date(a.date_end) > new Date(b.date_end);
const sumEstimates = (item) => {
  // sum estimates
  count += item.estimate;
  if (queues[index] == undefined) queues[index] = [];
  queues[index].push(item.ID);
  if (count >= 8) index++;
}

let count = 0;
let index = 0;

const queues = [];

list.filter(filter)
  .sort(sort)
  .map(sumEstimates);

console.log("result");
console.log(queues);

document.querySelector("#debug").innerHTML = "output";