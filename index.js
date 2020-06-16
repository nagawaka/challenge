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

const lastId = () => {
  const sorted = list.sort((a, b) => a.ID < b.ID);
  return sorted[0].ID + 1;
}

document.querySelector("#add").addEventListener('click', (evt) => {
  evt.preventDefault();
  list.push({
    "ID": list.length > 0 ? lastId(list) : 1,
    "description": "Importação de arquivos de fundos",
    "date_end": "2019-11-10 12:00:00",
    "estimate": 2,
  });
  render();
})

const render = () => {
  const updateValue = (evt) => {
    const [job, id, key] = evt.target.name.split("-");
    list[id][key] = evt.target.value;
  }

  const generateElement = (job, labelText, key, index) => {
    const holder = document.createElement("div");

    const field = document.createElement("input");
    field.value = job[key];
    field.name = `job-${index}-${key}`;
    field.id = `job-${index}-${key}`;
    field.addEventListener('change', updateValue);
    const label = document.createElement("label");
    label.innerText = labelText;

    holder.appendChild(label);
    holder.appendChild(field);

    return holder;
  }

  const generateCloseButton = (index) => {
    const button = document.createElement("button");
    button.innerText = "Remover";
    button.className="remove"
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      list = list.filter((item) => {
        return item.ID != index;
      })
      render();
    });
    return button;
  }

  document.querySelector("#fields").innerHTML = "";
  const fieldsParent = document.querySelector("#fields");

  list.map((job, index) => {
    const closeButton = generateCloseButton(job.ID);
    fieldsParent.appendChild(closeButton);

    Object.keys(labels).map((key) => {
      const input = generateElement(job, labels[key], key, index);
      fieldsParent.appendChild(input);
    })
    if (index < list.length-1) document.querySelector("#fields").appendChild(document.createElement("hr"))
  })
}

const filterList = (list) => {
  const from = new Date(document.querySelector("#date_from").value);
  const to = new Date(document.querySelector("#date_to").value);

  let count = 0;
  let index = 0;
  
  const queues = [];

  const sumEstimates = (item) => {
    // sum estimates
    count += Number(item.estimate);
    if (queues[index] == undefined) queues[index] = [];
    queues[index].push(item.ID);
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
  document.querySelector("#debug").innerHTML = `<p>${JSON.stringify(result)}</p>`;
})

render();
// console.log(filterList(list));


// document.querySelector("#debug").innerHTML = "output";