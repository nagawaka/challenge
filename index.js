let list = [
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

const labels = {
  'ID': 'ID',
  'description': "Descrição",
  'date_end': "Data máxima de conclusão",
  'estimate': "Tempo estimado"
}

const render = () => {
  const updateValue = (evt) => {
    const [job, id, key] = evt.target.name.split("-");
    list[id][key] = evt.target.value;
  }

  const generateElement = (job, labelText, key, index) => {
    const field = document.createElement("input");
    field.value = job[key];
    field.name = `job-${index}-${key}`;
    field.id = `job-${index}-${key}`;
    field.addEventListener('change', updateValue);
    const label = document.createElement("label");
    label.innerText = labelText;

    return {field, label}
  }
  document.querySelector("#fields").innerHTML = "";
  list.map((job, index) => {
    Object.keys(labels).map((key) => {
      const { field, label } = generateElement(job, labels[key], key, index);
      document.querySelector("#fields").appendChild(label)
      document.querySelector("#fields").appendChild(field)
    })
    if (index < list.length-1) document.querySelector("#fields").appendChild(document.createElement("hr"))
  })
}

const from = new Date("2019-11-10 09:00:00");
const to = new Date("2019-11-11 12:00:00");

const filterList = (list) => {
  let count = 0;
  let index = 0;
  
  const queues = [];

  const sumEstimates = (item) => {
    // sum estimates
    count += Number(item.estimate);
    if (queues[index] == undefined) queues[index] = [];
    queues[index].push(item);
    if (count >= 8) index++;
  }

  const filter = (item) => {
    // filters date_end inbetween two dates
    const date_end = new Date(item.date_end);
    return (date_end > from && date_end <= to) ? true : false;
  }
  
  const sort = (a, b) => new Date(a.date_end) > new Date(b.date_end);
  
  list.filter(filter)
    .sort(sort)
    .map(sumEstimates);
  
  return queues;
}

document.querySelector("#button").addEventListener("click", (evt) => {
  evt.preventDefault();
  const result = filterList(list);
  console.log(result);
  list = [];
  render();
})

render();
// console.log(filterList(list));


// document.querySelector("#debug").innerHTML = "output";